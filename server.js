const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const multer = require('multer');
const fs = require('fs-extra');
const puppeteer = require('puppeteer');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Ensure directories exist
fs.ensureDirSync('uploads');
fs.ensureDirSync('generated');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Generate Resume
app.post('/api/generate-resume', async (req, res) => {
    try {
        const { personalInfo, jobRequirements, template } = req.body;
        
        // Validate API key
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
            return res.status(500).json({ 
                success: false, 
                error: 'Gemini API key not configured. Please add your API key to the .env file.' 
            });
        }
        
        const prompt = `
        Create a professional resume based on the following information:
        
        Personal Information:
        ${JSON.stringify(personalInfo, null, 2)}
        
        Job Requirements:
        ${jobRequirements}
        
        Template Style: ${template}
        
        Generate a well-structured, professional resume that:
        1. Highlights relevant skills and experience
        2. Uses action verbs and quantifiable achievements
        3. Is tailored to the job requirements
        4. Follows modern resume best practices
        5. Is concise and impactful
        
        Format the response as clean HTML that can be styled with CSS.
        `;

        console.log('Generating resume with prompt length:', prompt.length);
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const resumeContent = response.text();

        console.log('Resume generated successfully, content length:', resumeContent.length);

        res.json({ 
            success: true, 
            content: resumeContent,
            message: 'Resume generated successfully!' 
        });
    } catch (error) {
        console.error('Error generating resume:', error);
        
        // Provide more specific error messages
        let errorMessage = 'Failed to generate resume';
        if (error.message.includes('API key')) {
            errorMessage = 'Invalid API key. Please check your Gemini API key.';
        } else if (error.message.includes('model')) {
            errorMessage = 'AI model error. Please try again.';
        } else if (error.message.includes('quota')) {
            errorMessage = 'API quota exceeded. Please try again later.';
        }
        
        res.status(500).json({ 
            success: false, 
            error: errorMessage,
            details: error.message 
        });
    }
});

// Generate Cover Letter
app.post('/api/generate-cover-letter', async (req, res) => {
    try {
        const { personalInfo, jobRequirements, companyInfo, template } = req.body;
        
        // Validate API key
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
            return res.status(500).json({ 
                success: false, 
                error: 'Gemini API key not configured. Please add your API key to the .env file.' 
            });
        }
        
        const prompt = `
        Create a compelling cover letter based on the following information:
        
        Personal Information:
        ${JSON.stringify(personalInfo, null, 2)}
        
        Job Requirements:
        ${jobRequirements}
        
        Company Information:
        ${companyInfo}
        
        Template Style: ${template}
        
        Generate a professional cover letter that:
        1. Shows enthusiasm for the position
        2. Connects personal experience to job requirements
        3. Demonstrates understanding of the company
        4. Includes a clear call to action
        5. Is personalized and authentic
        
        Format the response as clean HTML that can be styled with CSS.
        `;

        console.log('Generating cover letter with prompt length:', prompt.length);
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const coverLetterContent = response.text();

        console.log('Cover letter generated successfully, content length:', coverLetterContent.length);

        res.json({ 
            success: true, 
            content: coverLetterContent,
            message: 'Cover letter generated successfully!' 
        });
    } catch (error) {
        console.error('Error generating cover letter:', error);
        
        // Provide more specific error messages
        let errorMessage = 'Failed to generate cover letter';
        if (error.message.includes('API key')) {
            errorMessage = 'Invalid API key. Please check your Gemini API key.';
        } else if (error.message.includes('model')) {
            errorMessage = 'AI model error. Please try again.';
        } else if (error.message.includes('quota')) {
            errorMessage = 'API quota exceeded. Please try again later.';
        }
        
        res.status(500).json({ 
            success: false, 
            error: errorMessage,
            details: error.message 
        });
    }
});

// Export to PDF
app.post('/api/export-pdf', async (req, res) => {
    try {
        const { content, filename } = req.body;
        
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        await page.setContent(content);
        await page.waitForTimeout(1000);
        
        const pdf = await page.pdf({ 
            format: 'A4',
            printBackground: true,
            margin: { top: '1in', right: '1in', bottom: '1in', left: '1in' }
        });
        
        await browser.close();
        
        const filePath = `generated/${filename}.pdf`;
        await fs.writeFile(filePath, pdf);
        
        res.json({ 
            success: true, 
            filePath: filePath,
            message: 'PDF exported successfully!' 
        });
    } catch (error) {
        console.error('Error exporting PDF:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to export PDF' 
        });
    }
});

// Export to Word Document
app.post('/api/export-docx', async (req, res) => {
    try {
        const { content, filename } = req.body;
        
        // Convert HTML content to Word document
        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Generated Document",
                                size: 32,
                                bold: true
                            })
                        ],
                        heading: HeadingLevel.HEADING_1
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: content.replace(/<[^>]*>/g, ''), // Remove HTML tags
                                size: 24
                            })
                        ]
                    })
                ]
            }]
        });
        
        const buffer = await Packer.toBuffer(doc);
        const filePath = `generated/${filename}.docx`;
        await fs.writeFile(filePath, buffer);
        
        res.json({ 
            success: true, 
            filePath: filePath,
            message: 'Word document exported successfully!' 
        });
    } catch (error) {
        console.error('Error exporting Word document:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to export Word document' 
        });
    }
});

// Download file
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'generated', filename);
    
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).json({ error: 'File not found' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 AI Resume Generator server running on http://localhost:${PORT}`);
    console.log(`📝 Generate professional resumes and cover letters with AI!`);
}); 