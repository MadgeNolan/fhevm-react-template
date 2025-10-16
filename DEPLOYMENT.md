# Deployment Guide

This guide covers deploying the FHEVM SDK examples to production.

## Prerequisites

- Node.js 18+ installed
- Git repository set up
- Domain name (optional)
- Ethereum wallet with Sepolia ETH

## Build the SDK

Before deploying examples, build the SDK:

```bash
# From repository root
npm install
npm run build:sdk
```

## Deploy Next.js Example

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from Next.js directory:**
   ```bash
   cd examples/nextjs
   vercel
   ```

3. **Configure environment:**
   - Add environment variables in Vercel dashboard
   - Set `NEXT_PUBLIC_CONTRACT_ADDRESS`
   - Set `NEXT_PUBLIC_CHAIN_ID=11155111`

4. **Production deployment:**
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

1. **Build the application:**
   ```bash
   cd examples/nextjs
   npm run build
   ```

2. **Deploy to Netlify:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=.next
   ```

### Option 3: Self-Hosted

1. **Build for production:**
   ```bash
   cd examples/nextjs
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

3. **Configure reverse proxy (nginx example):**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

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

## Deploy Research Data Sharing Example

### Option 1: Vercel

1. **Navigate to example:**
   ```bash
   cd examples/research-data-sharing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build:**
   ```bash
   npm run build
   ```

4. **Deploy:**
   ```bash
   vercel --prod
   ```

### Option 2: Static Hosting

The research example is a static site that can be hosted anywhere:

1. **Build:**
   ```bash
   cd examples/research-data-sharing
   npm run build
   ```

2. **Deploy `dist/` folder to:**
   - GitHub Pages
   - Netlify
   - AWS S3 + CloudFront
   - Any static hosting service

#### GitHub Pages

```bash
# Add to package.json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}

# Install gh-pages
npm install -g gh-pages

# Deploy
npm run deploy
```

## Environment Variables

### Next.js Example

Create `.env.local`:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x13782134cE8cA22C432bb636B401884806799AD2
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
```

### Research Platform

Contract address is hardcoded in `main.js`:

```javascript
const CONTRACT_ADDRESS = '0x13782134cE8cA22C432bb636B401884806799AD2';
```

Update for your deployment.

## Custom Domain

### Vercel

1. Go to project settings
2. Add custom domain
3. Configure DNS:
   ```
   A     @    76.76.21.21
   CNAME www  cname.vercel-dns.com
   ```

### Netlify

1. Go to domain settings
2. Add custom domain
3. Configure DNS:
   ```
   A     @    75.2.60.5
   CNAME www  your-site.netlify.app
   ```

## HTTPS/SSL

### Automatic SSL (Vercel/Netlify)

SSL certificates are automatically provisioned.

### Manual SSL (Self-Hosted)

Use Let's Encrypt with Certbot:

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

## Monitoring

### Vercel

- Built-in analytics
- Real-time logs
- Performance metrics

### Self-Hosted

Use PM2 for process management:

```bash
# Install PM2
npm install -g pm2

# Start application
cd examples/nextjs
pm2 start npm --name "fhevm-nextjs" -- start

# Monitor
pm2 monit

# Logs
pm2 logs fhevm-nextjs

# Auto-restart on failure
pm2 startup
pm2 save
```

## Performance Optimization

### Next.js

1. **Enable compression:**
   ```javascript
   // next.config.js
   module.exports = {
     compress: true
   };
   ```

2. **Image optimization:**
   ```tsx
   import Image from 'next/image';
   <Image src="..." alt="..." width={500} height={300} />
   ```

3. **Code splitting:**
   ```tsx
   import dynamic from 'next/dynamic';
   const Component = dynamic(() => import('./Component'));
   ```

### Static Sites

1. **Minify assets:**
   ```bash
   npm run build  # Already minified by Vite
   ```

2. **Enable CDN:**
   - Use Cloudflare
   - Enable caching
   - Set cache headers

3. **Optimize images:**
   - Use WebP format
   - Compress images
   - Lazy load images

## Troubleshooting

### Build Fails

**Issue:** Missing dependencies

```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue:** TypeScript errors

```bash
# Type check
npm run type-check

# Ignore errors (not recommended)
# In tsconfig.json: "skipLibCheck": true
```

### Runtime Errors

**Issue:** MetaMask not connecting

- Check network is Sepolia (Chain ID: 11155111)
- Ensure wallet has ETH
- Check browser console for errors

**Issue:** Contract calls failing

- Verify contract address is correct
- Check wallet has gas
- Verify RPC endpoint is working

### Performance Issues

**Issue:** Slow page loads

- Enable compression
- Use CDN
- Optimize images
- Check bundle size

**Issue:** High server load

- Enable caching
- Use serverless functions
- Scale horizontally

## Security Checklist

- [ ] Environment variables not in source code
- [ ] HTTPS enabled
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] Dependencies up to date

### Security Headers

Configure in hosting platform or nginx:

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' https:;" always;
```

## Rollback

### Vercel

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

### Self-Hosted

```bash
# With PM2
pm2 restart fhevm-nextjs --update-env

# Manual
git checkout [previous-commit]
npm run build
pm2 restart fhevm-nextjs
```

## Support

For deployment issues:
- Check [GitHub Issues](https://github.com/your-repo/issues)
- Review [Vercel Documentation](https://vercel.com/docs)
- Check [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

## Example Deployments

- **Next.js Example**: https://fhevm-nextjs.vercel.app
- **Research Platform**: https://fhe-research-data-sharing.vercel.app

These examples demonstrate successful production deployments.
