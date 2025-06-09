
#!/bin/bash

# Deployment script for Sentivision Pro
set -e

echo "🚀 Starting Sentivision Pro deployment..."

# Check if environment variables are set
if [ -z "$VITE_SUPABASE_URL" ] || [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
    echo "❌ Error: Environment variables not set"
    echo "Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run tests
echo "🧪 Running tests..."
npm run test

# Build the application
echo "🔨 Building application..."
npm run build

# Deploy based on platform
if [ "$1" == "docker" ]; then
    echo "🐳 Building Docker image..."
    docker build -t sentivision-pro .
    echo "✅ Docker image built successfully"
    
elif [ "$1" == "vercel" ]; then
    echo "▲ Deploying to Vercel..."
    npx vercel --prod
    echo "✅ Deployed to Vercel successfully"
    
else
    echo "📁 Build completed. Deploy the 'dist' folder to your hosting provider."
    echo "Available deployment options:"
    echo "  ./deploy.sh docker   - Build Docker image"
    echo "  ./deploy.sh vercel   - Deploy to Vercel"
fi

echo "🎉 Deployment process completed!"
