
# 🚀 Deployment Guide

This guide covers multiple deployment options for Sentivision Pro.

## 📋 Prerequisites

1. **Environment Variables**: Copy `.env.example` to `.env.local` and fill in your values
2. **Dependencies**: Ensure Node.js 18+ is installed
3. **Build Success**: Run `npm run build` locally to verify the build works

## 🐳 Docker Deployment

### Quick Start

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t sentivision-pro .
docker run -p 3000:80 sentivision-pro
```

### Production Docker Setup

```bash
# Set environment variables
export VITE_SUPABASE_URL="your-supabase-url"
export VITE_SUPABASE_ANON_KEY="your-supabase-key"

# Run deployment script
chmod +x deploy.sh
./deploy.sh docker
```

## ▲ Vercel Deployment

### Automatic Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
./deploy.sh vercel
```

## 🌐 Netlify Deployment

### Build Settings

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18

### Environment Variables

Set in Netlify dashboard:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key
```

## ☁️ AWS S3 + CloudFront

### S3 Setup

```bash
# Build the app
npm run build

# Upload to S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Configure S3 for static website hosting
aws s3 website s3://your-bucket-name --index-document index.html --error-document index.html
```

### CloudFront Configuration

1. Create CloudFront distribution
2. Set origin to S3 bucket
3. Configure custom error pages:
   - Error code: 403, 404
   - Response page path: `/index.html`
   - Response code: 200

## 🔧 Environment Configuration

### Required Variables

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Optional Variables

```env
VITE_ALPHA_VANTAGE_API_KEY=for-real-time-data
VITE_ANALYTICS_ID=google-analytics-id
VITE_SENTRY_DSN=error-tracking
```

## 🏥 Health Checks

The application includes health check endpoints:

- **Docker**: Built-in health check via curl
- **Application**: Available at `/health` (if implemented)

## 📊 Monitoring

### Performance Monitoring

- Use Web Vitals for performance tracking
- Monitor bundle size with `npm run analyze`
- Set up error tracking with Sentry

### Application Monitoring

```bash
# Check application status
curl -f http://your-domain.com/

# Monitor Docker container
docker ps
docker logs sentivision-app
```

## 🔄 CI/CD Pipeline

The GitHub Actions workflow automatically:

1. ✅ Runs tests
2. 🔨 Builds the application  
3. 🧪 Runs linting and type checks
4. 📦 Creates deployment artifacts

### Custom Deployment Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run test
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🛡️ Security Considerations

### Content Security Policy

The nginx configuration includes security headers. For additional security:

```nginx
# Additional CSP header
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.supabase.co;";
```

### Environment Variable Security

- Never commit `.env` files
- Use secret management for production
- Rotate API keys regularly

## 🔍 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and rebuild
   rm -rf node_modules dist
   npm install
   npm run build
   ```

2. **Environment Variables Not Loading**
   - Ensure variables start with `VITE_`
   - Check variable names in deployment platform
   - Verify build process includes environment variables

3. **Routing Issues**
   - Ensure server is configured for SPA routing
   - Check nginx configuration for `try_files`
   - Verify index.html fallback is set up

### Performance Optimization

```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Optimize images
npm install -g imagemin-cli
imagemin src/assets/* --out-dir=src/assets/optimized
```

## 📈 Scaling Considerations

### Load Balancing

For high-traffic deployments:

1. Use multiple container instances
2. Configure load balancer (ALB, CloudFlare)
3. Implement CDN for static assets
4. Consider edge computing for global users

### Database Scaling

- Monitor Supabase usage and upgrade plan as needed
- Implement read replicas for analytics queries
- Consider database connection pooling

---

**Need help?** Check our [troubleshooting guide] or [create an issue].
