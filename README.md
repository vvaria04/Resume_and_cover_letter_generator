# 🤖 AI Resume & Cover Letter Generator

A powerful, AI-powered application that generates professional resumes and cover letters using the Gemini API. Features a beautiful, modern interface with multiple export options.

## ✨ Features

### 🎯 **Core Functionality**
- **AI-Powered Generation**: Uses Google's Gemini API for intelligent content creation
- **Resume Generator**: Create tailored resumes based on job requirements
- **Cover Letter Generator**: Generate compelling cover letters for specific positions
- **Multiple Templates**: Choose from Modern, Classic, and Creative styles

### 📄 **Export Options**
- **PDF Export**: High-quality PDF documents with professional formatting
- **Word Document**: Editable .docx files for further customization
- **HTML Copy**: Copy generated content as HTML for web use

### 🎨 **User Experience**
- **Beautiful Interface**: Modern, responsive design with smooth animations
- **Form Validation**: Real-time validation with helpful error messages
- **Auto-Save**: Form data is automatically saved to localStorage
- **Keyboard Shortcuts**: Quick access with Ctrl/Cmd + Enter to generate
- **Loading States**: Professional loading animations during generation

### 📱 **Responsive Design**
- **Mobile-Friendly**: Works perfectly on all device sizes
- **Touch-Optimized**: Optimized for touch interactions
- **Cross-Browser**: Compatible with all modern browsers

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Gemini API key from Google AI Studio

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-resume-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Your Gemini API key (required) | - |
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment mode | development |

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env` file

## 📖 Usage Guide

### Generating a Resume

1. **Fill in Personal Information**
   - Full name, email, phone, location
   - LinkedIn profile (optional)

2. **Add Professional Details**
   - Professional summary
   - Education information
   - Skills and expertise
   - Work experience
   - Projects and achievements (optional)

3. **Specify Job Requirements**
   - Paste the job description
   - Include specific requirements

4. **Choose Template Style**
   - **Modern**: Clean and professional
   - **Classic**: Traditional format
   - **Creative**: Stand out design

5. **Generate and Export**
   - Click "Generate Resume"
   - Export as PDF, Word, or copy HTML

### Generating a Cover Letter

1. **Enter Personal Information**
   - Your contact details

2. **Add Company Information**
   - Company name
   - Hiring manager (optional)
   - Company details

3. **Specify Job Requirements**
   - Paste the job description

4. **Highlight Your Experience**
   - Relevant skills and experience

5. **Choose Template Style**
   - **Professional**: Formal and polished
   - **Enthusiastic**: Passionate and engaging
   - **Concise**: Brief and to the point

## 🛠️ Development

### Project Structure
```
ai-resume-generator/
├── public/
│   ├── index.html          # Main application interface
│   ├── styles.css          # Styling and animations
│   └── script.js           # Frontend functionality
├── server.js               # Express server and API routes
├── package.json            # Dependencies and scripts
├── env.example             # Environment variables template
└── README.md              # This file
```

### Available Scripts

```bash
npm start          # Start the production server
npm run dev        # Start development server with nodemon
npm run build      # Install dependencies
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Serve the main application |
| `/api/generate-resume` | POST | Generate resume using AI |
| `/api/generate-cover-letter` | POST | Generate cover letter using AI |
| `/api/export-pdf` | POST | Export content as PDF |
| `/api/export-docx` | POST | Export content as Word document |
| `/download/:filename` | GET | Download generated files |

## 🎨 Customization

### Adding New Templates

1. **Modify the HTML** in `public/index.html`
2. **Update the CSS** in `public/styles.css`
3. **Add template logic** in `server.js`

### Styling Changes

The application uses CSS custom properties for easy theming:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --text-color: #333;
  --background-color: #fafbfc;
}
```

## 🔒 Security Considerations

- **API Key Protection**: Never commit your `.env` file
- **Input Validation**: All user inputs are validated
- **Error Handling**: Comprehensive error handling throughout
- **Rate Limiting**: Consider implementing rate limiting for production

## 🚀 Deployment

### Heroku Deployment

1. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**
   ```bash
   heroku config:set GEMINI_API_KEY=your_api_key
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini API** for AI-powered content generation
- **Font Awesome** for beautiful icons
- **Inter Font** for typography
- **Express.js** for the backend framework
- **Puppeteer** for PDF generation

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include your Node.js version and operating system

---

**Made with ❤️ using AI and modern web technologies** 