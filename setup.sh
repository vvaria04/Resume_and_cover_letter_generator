#!/bin/bash

echo "🚀 Setting up AI Resume Generator..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Server Configuration
PORT=3000
NODE_ENV=development
EOF
    echo "✅ .env file created!"
else
    echo "✅ .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p generated
mkdir -p uploads

echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env file and add your Gemini API key"
echo "2. Run 'npm start' to start the server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "🔑 Get your Gemini API key from: https://makersuite.google.com/app/apikey" 