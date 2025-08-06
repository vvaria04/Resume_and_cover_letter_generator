# 🚀 Quick Start Guide

## Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

## Step 2: Configure the Application

1. Open the `.env` file in your project directory
2. Replace `your_gemini_api_key_here` with your actual API key:

```env
GEMINI_API_KEY=AIzaSyC...your_actual_key_here...
PORT=3000
NODE_ENV=development
```

## Step 3: Start the Application

```bash
npm start
```

## Step 4: Use the Application

1. Open your browser and go to `http://localhost:3000`
2. Choose between "Resume Generator" or "Cover Letter Generator"
3. Fill in your information
4. Paste the job description/requirements
5. Choose your preferred template style
6. Click "Generate" and wait for the AI to create your document
7. Export as PDF, Word document, or copy the HTML

## 🎯 Features You Can Try

### Resume Generator
- **Personal Information**: Name, email, phone, location, LinkedIn
- **Professional Summary**: Brief overview of your background
- **Education**: Degrees, universities, graduation years
- **Skills**: Technical and soft skills
- **Work Experience**: Job titles, companies, achievements
- **Projects & Achievements**: Notable projects, awards, certifications
- **Job Requirements**: Paste the job description to tailor your resume

### Cover Letter Generator
- **Personal Information**: Your contact details
- **Company Information**: Company name, hiring manager, company details
- **Job Requirements**: Paste the job description
- **Your Experience**: Highlight relevant skills and experience
- **Template Styles**: Professional, Enthusiastic, or Concise

### Export Options
- **PDF**: High-quality, print-ready documents
- **Word Document**: Editable .docx files
- **HTML**: Copy the generated HTML for web use

## 🎨 Template Styles

### Resume Templates
- **Modern**: Clean and professional design
- **Classic**: Traditional format
- **Creative**: Stand out design

### Cover Letter Templates
- **Professional**: Formal and polished
- **Enthusiastic**: Passionate and engaging
- **Concise**: Brief and to the point

## ⌨️ Keyboard Shortcuts

- **Ctrl/Cmd + Enter**: Generate document
- **Escape**: Hide loading overlay

## 🔧 Troubleshooting

### Common Issues

1. **"Failed to generate resume"**
   - Check your Gemini API key in the `.env` file
   - Ensure you have an active internet connection
   - Verify all required fields are filled

2. **"Port 3000 is already in use"**
   - Change the PORT in your `.env` file to 3001 or another port
   - Or stop the process using port 3000

3. **PDF export not working**
   - Ensure Puppeteer dependencies are installed
   - Check that you have sufficient disk space

### Getting Help

- Check the browser console for error messages
- Verify your API key is correct
- Ensure all required fields are completed

## 🎉 You're Ready!

Your AI Resume Generator is now set up and ready to create professional resumes and cover letters. The AI will analyze job requirements and tailor your documents to match the position perfectly.

Happy job hunting! 🎯 