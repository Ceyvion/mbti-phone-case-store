# PERSONA - MBTI Phone Case Store

A beautiful, Swiss-inspired, grid-based e-commerce website for trendy phone cases based on MBTI personality types. Built with modern web technologies and designed for speed, minimalism, and user experience.

![PERSONA Store](images/preview.png)

## 🎨 Design Philosophy

This project embraces Swiss Design principles:
- **Grid-based layouts** for precise, structured design
- **Minimal aesthetic** with abundant whitespace
- **Sans-serif typography** for clarity and readability
- **Asymmetrical layouts** following Swiss design traditions
- **Bold typography** as a primary design element

## ✨ Features

### Design Features
- 12-column Swiss grid system
- Futuristic minimal aesthetic
- Custom cursor interactions
- Smooth animations and transitions
- Fully responsive design
- Light and fast performance

### E-commerce Features
- 16 MBTI personality type showcase
- Product filtering by personality categories
- Quick view functionality
- Interactive shopping cart
- Hover effects and micro-animations
- Mobile-optimized experience

### Technical Features
- Pure HTML, CSS, and JavaScript (no frameworks)
- CSS variables for easy customization
- Intersection Observer for scroll animations
- Optimized for performance
- SEO-friendly structure

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mbti-phone-case-store.git
cd mbti-phone-case-store
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

3. Visit `http://localhost:8000` in your browser

## 📁 Project Structure

```
mbti-phone-case-store/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # JavaScript functionality
├── images/             # Image assets (to be added)
└── README.md          # This file
```

## 🛠️ Customization

### Adding Product Images

Replace the placeholder text in the HTML with actual images:

```html
<!-- Replace this -->
<span>[INTJ Case Image]</span>

<!-- With this -->
<img src="images/intj-case.jpg" alt="INTJ Architect Phone Case">
```

### Changing Colors

Edit the CSS variables in `css/styles.css`:

```css
:root {
    --color-accent: #0066ff;  /* Change accent color */
    --color-black: #0a0a0a;   /* Change primary color */
    /* ... other variables */
}
```

### Adding New MBTI Types or Products

The design is modular and easy to extend. Simply add new product cards or MBTI cards following the existing structure.

## 🔧 Shopify Integration

To integrate with Shopify:

1. Convert the HTML structure to Liquid templates
2. Replace static product data with Shopify product loops
3. Integrate with Shopify's cart API
4. Use Shopify's asset pipeline for CSS/JS

## 🎯 Performance Optimizations

- Minimal CSS with no unused styles
- Vanilla JavaScript (no heavy frameworks)
- CSS animations instead of JavaScript where possible
- Lazy loading ready for images
- Optimized grid system

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by Swiss Design pioneers like Josef Müller-Brockmann
- MBTI personality framework by Myers-Briggs
- Modern e-commerce design trends

---

Made with ❤️ and Swiss precision