# 🎨 Hero Images Setup Guide

## Required Images

To complete the enhanced hero section, you need to add these images to the `/public` folder:

### 1. **alcovia-hero-front.webp** 
- **Content**: Student working on laptop (foreground)
- **Size**: 1920x1080 or larger
- **Format**: WebP (optimized)
- **Requirements**: 
  - Transparent or clean background
  - High quality image
  - Student should be centered/bottom aligned
- **Used for**: Foreground layer with mask reveal animation

### 2. **alcovia-hero-back.webp**
- **Content**: Blurred abstract background
- **Size**: 1920x1080 or larger  
- **Format**: WebP (optimized)
- **Requirements**:
  - Abstract patterns or gradients
  - Should complement orange/red color scheme
  - Can be blurred in editing or code will blur it
- **Used for**: Background layer with slow parallax

### 3. **alcovia-hero-mid.svg**
- **Content**: Product UI card or dashboard mockup
- **Format**: SVG (vector)
- **Requirements**:
  - Should showcase Alcovia's platform/dashboard
  - Use brand colors (orange, red)
  - Clean, modern UI design
  - Transparent background
- **Used for**: Middle layer with medium parallax
- **Current**: Placeholder SVG is provided - replace with actual design

## 📁 File Structure

```
public/
├── alcovia-hero-front.webp  ← Add your student image here
├── alcovia-hero-back.webp   ← Add your background image here
└── alcovia-hero-mid.svg     ← Replace placeholder with actual UI
```

## 🎯 Image Optimization Tips

### For WebP Images:
```bash
# Convert and optimize using imagemagick
magick input.jpg -resize 1920x1080 -quality 85 alcovia-hero-front.webp
magick background.jpg -resize 1920x1080 -blur 0x8 -quality 80 alcovia-hero-back.webp
```

### For SVG:
- Use tools like Figma, Adobe Illustrator, or Sketch
- Optimize with SVGO: `svgo alcovia-hero-mid.svg`
- Ensure text is converted to paths
- Keep file size under 100KB

## 🖼️ Current Placeholders

Right now, the site uses:
- **Front**: Gradient rounded shape (temporary)
- **Back**: Gradient background (temporary)  
- **Mid**: Orange/red gradient UI card (placeholder SVG)

## 🎨 Design Specifications

### Color Palette to Match:
- Primary Orange: `#FF6B35` / `hsl(12 100% 60%)`
- Secondary Red: `#E63946` / `hsl(350 89% 60%)`
- Accent Pink: `#FF4D6D` / `hsl(340 100% 65%)`
- Background: `#0A0A0A`

### Animation Specs:
- **Front Image**: Mask reveal (left to right)
- **Mid Image**: Staggered entrance (fade + scale)
- **Back Image**: Slow parallax scroll
- **Blobs**: Continuous rotation

## 🚀 After Adding Images

1. Drop images in `/public` folder
2. Refresh browser (Vite will hot-reload)
3. No code changes needed!

## 🎭 Advanced: Image Variations

You can create different versions for:
- **Mobile**: Smaller, optimized versions
- **Tablet**: Medium-sized versions
- **Desktop**: Full-resolution versions

Add them like:
```
public/
├── alcovia-hero-front-mobile.webp
├── alcovia-hero-front-tablet.webp
└── alcovia-hero-front-desktop.webp
```

Then update `EnhancedHero.tsx` to use responsive images:
```tsx
<picture>
  <source media="(max-width: 640px)" srcSet="/alcovia-hero-front-mobile.webp" />
  <source media="(max-width: 1024px)" srcSet="/alcovia-hero-front-tablet.webp" />
  <img src="/alcovia-hero-front-desktop.webp" alt="Student" />
</picture>
```

## 📊 Performance Targets

- **Load Time**: < 2 seconds
- **Image Size**: < 500KB per image
- **LCP (Largest Contentful Paint)**: < 2.5s
- **CLS (Cumulative Layout Shift)**: < 0.1

## ✅ Checklist

- [ ] Add `alcovia-hero-front.webp`
- [ ] Add `alcovia-hero-back.webp`
- [ ] Replace `alcovia-hero-mid.svg` with actual UI
- [ ] Optimize all images
- [ ] Test on mobile/tablet/desktop
- [ ] Verify animations work smoothly
- [ ] Check accessibility (alt text)
- [ ] Test with slow 3G connection

---

**Need help creating these images?** Consider using:
- **AI Tools**: Midjourney, DALL-E, Stable Diffusion
- **Stock Photos**: Unsplash, Pexels (with proper licensing)
- **Design Tools**: Figma, Canva, Photoshop

**Current Status**: Using placeholders - site fully functional, just waiting for final images! 🎨

