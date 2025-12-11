# 🚀 Deployment Guide

## Quick Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Follow the prompts**
   - Link to your GitHub repository
   - Configure project settings (Vite preset will be auto-detected)
   - Deploy!

## Deploy to Netlify

1. **Build the project**
```bash
npm run build
```

2. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

3. **Deploy**
```bash
netlify deploy --prod
```

## Manual Deployment Steps

### 1. Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### 2. Preview Locally
```bash
npm run preview
```

### 3. Deploy the `dist` folder to your hosting provider

## Environment Variables

No environment variables are required for this project.

## Performance Optimization

The build includes:
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Asset optimization
- ✅ Lazy loading

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Post-Deployment Checklist

- [ ] Test all animations on production
- [ ] Verify custom cursor works
- [ ] Check mobile responsiveness
- [ ] Test all interactive elements
- [ ] Verify loading screen
- [ ] Check scroll performance
- [ ] Test social links

## Troubleshooting

### Animations not smooth
- Ensure hardware acceleration is enabled
- Check browser performance settings

### Custom cursor not showing
- Verify `cursor: none` is applied to body
- Check z-index values

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Production URL

After deployment, your site will be live at:
- Vercel: `https://your-project.vercel.app`
- Netlify: `https://your-project.netlify.app`

## Custom Domain

To add a custom domain:
1. Go to your hosting provider dashboard
2. Navigate to domain settings
3. Add your custom domain
4. Update DNS records as instructed

---

**Need help?** Check the hosting provider's documentation or reach out to support.

