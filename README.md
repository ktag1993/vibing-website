# Vibing Website

The official marketing website for Vibing platform.

## 🌐 Overview

This repository contains the static website for Vibing, built with vanilla HTML, CSS, and JavaScript. The website is deployed to AWS S3 and served via CloudFront CDN for optimal performance.

## 📁 Structure

```
vibing-website/
├── index.html              # Main landing page
├── privacy-policy.html     # Privacy policy
├── terms-and-conditions.html # Terms and conditions
├── refund-policy.html      # Refund policy
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   └── js/
│       └── script.js       # JavaScript for forms and interactions
└── .github/
    └── workflows/
        ├── deploy-dev.yml  # Dev deployment workflow
        └── deploy-prod.yml # Prod deployment workflow
```

## 🚀 Deployment

This website uses GitHub Actions for automated deployment to AWS S3 + CloudFront.

### Prerequisites

Before deployment, you need to:

1. **Create S3 Buckets:**
   - Dev: `vibing-website-dev` (or your chosen name)
   - Prod: `vibing-website-prod` (or your chosen name)
   - Configure buckets for static website hosting
   - Add bucket policy for public read access

2. **Create CloudFront Distributions:**
   - Create distributions pointing to the S3 buckets
   - Configure custom domains (vibing.live for prod, dev.vibing.live for dev)
   - Set up SSL certificates via ACM

3. **Configure GitHub Secrets:**
   - `AWS_ROLE_ARN` - IAM role for GitHub Actions OIDC
   
4. **Update Workflow Files:**
   - Replace `REPLACE_WITH_DEV_DISTRIBUTION_ID` in `deploy-dev.yml`
   - Replace `REPLACE_WITH_PROD_DISTRIBUTION_ID` in `deploy-prod.yml`
   - Update S3 bucket names if different from defaults

### Deployment Process

#### Dev Environment
- **Trigger:** Push to `main` branch or manual dispatch
- **URL:** https://dev.vibing.live (or your dev domain)
- **Purpose:** Testing changes before production

#### Prod Environment
- **Trigger:** Manual dispatch recommended (or push to main)
- **URL:** https://vibing.live
- **Purpose:** Live production website

### Manual Deployment

If you need to deploy manually without GitHub Actions:

```bash
# Dev deployment
aws s3 sync . s3://vibing-website-dev/ \
  --delete \
  --exclude ".git/*" \
  --exclude ".github/*" \
  --cache-control "public, max-age=3600" \
  --profile vibing \
  --region ap-south-1

aws cloudfront create-invalidation \
  --distribution-id YOUR_DEV_DISTRIBUTION_ID \
  --paths "/*" \
  --profile vibing \
  --region ap-south-1

# Prod deployment
aws s3 sync . s3://vibing-website-prod/ \
  --delete \
  --exclude ".git/*" \
  --exclude ".github/*" \
  --cache-control "public, max-age=3600" \
  --profile vibing \
  --region ap-south-1

aws cloudfront create-invalidation \
  --distribution-id YOUR_PROD_DISTRIBUTION_ID \
  --paths "/*" \
  --profile vibing \
  --region ap-south-1
```

## 🔧 Development

### Local Development

Simply open `index.html` in your browser to preview the website locally.

For a better development experience with live reload:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js (install http-server globally)
npx http-server -p 8000

# Then visit http://localhost:8000
```

### Making Changes

1. Edit HTML/CSS/JS files locally
2. Test in your browser
3. Commit and push to `main` branch
4. GitHub Actions will automatically deploy to dev
5. Manually trigger prod deployment when ready

## 📝 Content Updates

### Legal Documents

All legal documents include "Minepost Technologies Private Limited" as the company name:
- Privacy Policy
- Terms and Conditions
- Refund Policy

Update these as needed to reflect current policies.

### Lead Form

The lead form in `index.html` submits to `https://api.vibing.live/leads`. Make sure:
- The backend API has a `/leads` endpoint
- CORS is configured to allow requests from the website domain
- The endpoint is documented in the backend API documentation

## 🎨 Customization

### Colors

Color scheme is defined in CSS variables in `style.css`:
- Primary: `#667eea` (Purple-Blue)
- Secondary: `#764ba2` (Dark Purple)
- Accent: `#f093fb` (Pink)

### Fonts

Currently using Inter font from Google Fonts. Can be changed in the `<head>` section and CSS.

## 🛠️ TODO

- [ ] Set up actual S3 buckets for dev and prod
- [ ] Create CloudFront distributions
- [ ] Configure custom domains (vibing.live, dev.vibing.live)
- [ ] Update workflow files with actual distribution IDs
- [ ] Test deployment to dev environment
- [ ] Test deployment to prod environment
- [ ] Add favicon.ico to assets/
- [ ] Implement backend `/leads` endpoint if not already done
- [ ] Configure CORS on backend for website domain

## 📧 Contact

For questions or issues, contact: support@vibing.live

---

**Company:** Minepost Technologies Private Limited

