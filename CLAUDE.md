# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is PERSONA, a Swiss-inspired minimal e-commerce website for MBTI personality phone cases. The project is built with pure HTML, CSS, and JavaScript (no frameworks) following Swiss design principles.

## Development Commands

```bash
# Start development server (with cache disabled)
npm run dev

# Start production server
npm start

# Alternative manual server commands:
python -m http.server 8000
npx http-server -p 8000
```

## Architecture and Structure

### Core Files
- `index.html` - Main HTML structure with all sections (hero, MBTI grid, products, features, footer)
- `css/styles.css` - Complete styling system with Swiss grid, responsive design, and animations
- `js/main.js` - Interactive functionality including custom cursor, animations, and e-commerce features

### Design System
- **Swiss Grid System**: 12-column grid with consistent spacing (`--grid-gap: 24px`)
- **Typography**: Fluid typography using `clamp()` for responsive sizing
- **Color System**: CSS custom properties in `:root` for easy theming
- **Animations**: CSS animations with Intersection Observer for scroll-triggered effects

### Key Features
- **MBTI Integration**: 16 personality types displayed in a 4x4 grid layout
- **Product Filtering**: Filter system with animations for different personality categories
- **Interactive Elements**: Custom cursor, hover effects, ripple animations on MBTI cards
- **Cart Functionality**: Simulated cart with toast notifications and counter updates
- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 1024px

### CSS Architecture
- **CSS Variables**: All design tokens defined in `:root` for consistency
- **Utility Classes**: Margin/padding utilities (`.mt-1` through `.mt-5`, etc.)
- **Component-Based**: Each section has its own styles (hero, mbti-section, products-section)
- **Performance**: Minimal CSS with optimized animations and transitions

### JavaScript Functionality
- **Custom Cursor**: Follows mouse movement with hover effects on interactive elements
- **Scroll Animations**: Intersection Observer pauses/plays animations based on visibility
- **Product Interactions**: Quick view overlays, filter buttons with smooth transitions
- **MBTI Card Clicks**: Ripple effects and automatic scrolling to products section
- **Navigation**: Smooth scrolling for anchor links with offset for fixed header

## Important Implementation Details

### Swiss Design Principles
- Grid-based layouts using CSS Grid
- Minimal aesthetic with abundant whitespace
- Sans-serif typography with tight letter-spacing
- Asymmetrical layouts following Swiss traditions
- Bold typography as primary design element

### Performance Optimizations
- Pure vanilla JavaScript (no frameworks)
- CSS animations preferred over JavaScript where possible
- Debounced scroll events for performance
- Optimized grid systems and minimal CSS

### Mobile Experience
- Navigation links hidden on mobile (mobile menu placeholder exists)
- Product grid scales from 3 columns → 2 columns → 1 column
- MBTI grid scales from 4x4 → 2x8 layout
- Hero section stacks vertically on mobile

## Future Integration Notes

The project is designed for Shopify integration:
- Static product data ready to be replaced with Shopify product loops
- Cart functionality structured for Shopify Cart API integration
- Product filtering system ready for dynamic data
- CSS structure compatible with Shopify's asset pipeline

## Browser Compatibility

Targets modern browsers with CSS Grid, CSS Custom Properties, and Intersection Observer support. Includes proper fallbacks for older browsers in the responsive design.