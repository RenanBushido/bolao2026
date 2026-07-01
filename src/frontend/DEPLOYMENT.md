# Deployment Guide

This guide covers deploying the Bolão 2026 frontend to various platforms.

## Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Backend API URL set correctly
- [ ] Build succeeds: `npm run build`
- [ ] No console errors
- [ ] All pages tested in development
- [ ] Mobile responsive design verified

## Vercel (Recommended)

### Setup

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Configure Environment Variables**:
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_API_TIMEOUT`

### Production URL

After deployment, your app will be available at `https://[project-name].vercel.app`

## Docker

### Build Docker Image

```bash
# Create Dockerfile (if not exists)
docker build -t bolao-2026-frontend:latest .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://backend:5000 \
  bolao-2026-frontend:latest
```

### Dockerfile Example

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app

RUN npm install -g next

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
ENV NODE_ENV production

CMD ["npm", "start"]
```

### Build and Push to Registry

```bash
# Build
docker build -t yourusername/bolao-frontend:latest .

# Push to Docker Hub
docker login
docker push yourusername/bolao-frontend:latest

# Push to AWS ECR, GCP, or Azure ACR
# (Follow registry-specific instructions)
```

## AWS (Amplify or EC2)

### AWS Amplify

1. **Connect GitHub Repository**:
   - Go to AWS Amplify Console
   - Connect your GitHub repo

2. **Build Settings**:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```

3. **Environment Variables**:
   - Set `NEXT_PUBLIC_API_URL` in Amplify Console

### AWS EC2

1. **Launch EC2 Instance** (t3.micro free tier):
   - Ubuntu 22.04 LTS
   - Allow port 80, 443, 3000

2. **SSH into Instance**:
   ```bash
   ssh -i "key.pem" ubuntu@ec2-instance-ip
   ```

3. **Install Dependencies**:
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs

   # Install PM2 (process manager)
   sudo npm install -g pm2
   ```

4. **Deploy Application**:
   ```bash
   # Clone repo
   git clone <your-repo-url>
   cd bolao2026/src/frontend

   # Install dependencies
   npm ci

   # Build
   npm run build

   # Start with PM2
   pm2 start npm --name "bolao-frontend" -- start
   pm2 startup
   pm2 save
   ```

5. **Setup Reverse Proxy (Nginx)**:
   ```bash
   sudo apt install nginx -y

   # Create nginx config
   sudo nano /etc/nginx/sites-available/default
   ```

   Add:
   ```nginx
   server {
     listen 80 default_server;
     listen [::]:80 default_server;
     server_name _;

     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

   ```bash
   sudo systemctl restart nginx
   ```

## Google Cloud Platform (Cloud Run)

### Using Cloud Run

1. **Setup**:
   ```bash
   # Install Google Cloud CLI
   curl https://sdk.cloud.google.com | bash

   # Login
   gcloud auth login
   gcloud config set project PROJECT_ID
   ```

2. **Deploy**:
   ```bash
   # Build and push Docker image
   gcloud run deploy bolao-frontend \
     --source . \
     --platform managed \
     --region us-central1 \
     --set-env-vars NEXT_PUBLIC_API_URL=https://api.example.com
   ```

3. **Access**:
   Your app will be available at `https://bolao-frontend-xxxxx.run.app`

## Azure (App Service)

### Deploy with Azure CLI

```bash
# Login
az login

# Create resource group
az group create --name bolao-rg --location eastus

# Create App Service plan
az appservice plan create \
  --name bolao-plan \
  --resource-group bolao-rg \
  --sku B1 \
  --is-linux

# Create App Service
az webapp create \
  --resource-group bolao-rg \
  --plan bolao-plan \
  --name bolao-frontend \
  --runtime "NODE:18-lts"

# Set environment variables
az webapp config appsettings set \
  --resource-group bolao-rg \
  --name bolao-frontend \
  --settings NEXT_PUBLIC_API_URL=https://api.example.com
```

## Netlify

### Deploy with Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=.next
```

Or connect GitHub repo in Netlify Dashboard.

## Environment-Specific Configuration

### Development
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_API_TIMEOUT=5000
```

### Staging
```
NEXT_PUBLIC_API_URL=https://api-staging.bolao2026.com
NEXT_PUBLIC_API_TIMEOUT=5000
```

### Production
```
NEXT_PUBLIC_API_URL=https://api.bolao2026.com
NEXT_PUBLIC_API_TIMEOUT=5000
```

## Performance Optimization

### Next.js Optimization

- Built-in Image Optimization
- Automatic Code Splitting
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)

### CDN Configuration

Deploy to a CDN for faster global delivery:
- **Vercel**: Automatic CDN
- **AWS**: CloudFront
- **Azure**: Azure CDN
- **Cloudflare**: Free CDN

### Monitoring

Set up monitoring for:
- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics, Datadog)
- Uptime monitoring (Uptime Robot)

## Continuous Deployment (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Rollback Procedure

### Vercel
```bash
# Rollback to previous deployment
vercel rollback
```

### Docker
```bash
# Rollback to previous image
docker run -p 3000:3000 bolao-2026-frontend:previous-tag
```

### AWS Amplify
- Go to Amplify Console
- Click "Deployments" tab
- Select previous deployment and click "Redeploy"

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm ci
npm run build
```

### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running and accessible
- Verify CORS headers on backend

### High Memory Usage
- Reduce deployment instance size
- Enable caching
- Optimize images

### Slow Performance
- Enable gzip compression
- Cache static assets
- Monitor database queries
- Use CDN for assets

## Post-Deployment Checklist

- [ ] Site loads on custom domain
- [ ] API calls work correctly
- [ ] Images load properly
- [ ] Responsive design works
- [ ] Mobile layout correct
- [ ] No console errors
- [ ] SEO meta tags present
- [ ] Analytics configured
- [ ] SSL certificate valid
- [ ] Backups configured

## Support

For deployment issues, check:
- Platform-specific documentation
- Backend API logs
- Frontend console errors
- Network tab in browser dev tools
