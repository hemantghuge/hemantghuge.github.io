# Portfolio Website - replit.md

## Overview

This is a personal portfolio website for Hemant Ghuge, a Senior AI Engineer and aspiring Product Manager. The website showcases his expertise in computer vision, edge AI, and product delivery, highlighting major deployments across 9000+ ATMs and 1200+ stores. The site is built as a static website using HTML, CSS, and JavaScript with Tailwind CSS for styling.

## System Architecture

### Frontend Architecture
- **Static Website**: Pure HTML, CSS, and JavaScript implementation
- **CSS Framework**: Tailwind CSS via CDN for rapid styling and responsive design
- **JavaScript**: Vanilla JavaScript for interactivity, no frameworks required
- **Font System**: Inter font family from Google Fonts for consistent typography
- **Icon System**: Font Awesome 6.4.0 for icons and visual elements
- **Color Scheme**: Custom color palette with primary (#1e1b4b), secondary (#3730a3), accent (#f59e0b), and coral (#fb7185) colors

### Backend Architecture
- **Server**: Simple Python HTTP server for local development
- **Static File Serving**: All assets served directly without processing
- **No Database**: Portfolio content is embedded directly in HTML files
- **No Authentication**: Public-facing portfolio site

## Key Components

### Page Structure
- **index.html**: Homepage with hero section, skills overview, and key highlights
- **about.html**: Detailed personal and professional background
- **projects.html**: Portfolio of AI, Product, and Research projects with filtering
- **resume.html**: Resume viewing and download functionality
- **contact.html**: Contact information and outreach forms

### Asset Organization
- **CSS**: Custom styles in `assets/css/styles.css` with Tailwind customizations
- **JavaScript**: Modular JS files (`main.js` for core functionality, `projects.js` for project-specific features)
- **Images**: SVG placeholders and optimized images in `assets/images/`
- **Documents**: Resume PDF stored in `assets/resume/`

### Interactive Features
- **Mobile Navigation**: Responsive hamburger menu with smooth transitions
- **Project Filtering**: Category-based filtering on projects page
- **Form Handling**: Contact and booking form processing
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Analytics**: Event tracking for user interactions

## Data Flow

### Static Content Flow
1. HTML files contain embedded content and structure
2. CSS files provide styling and responsive design rules
3. JavaScript files add interactivity and user experience enhancements
4. Assets (images, fonts, documents) are served directly

### User Interaction Flow
1. User navigates between pages via static links
2. JavaScript handles dynamic interactions (menu toggles, form submissions, project filtering)
3. External links tracked for analytics purposes
4. Contact forms can be processed via external services or email

## External Dependencies

### CDN Dependencies
- **Tailwind CSS**: `https://cdn.tailwindcss.com` for utility-first styling
- **Google Fonts**: Inter font family for typography
- **Font Awesome**: `cdnjs.cloudflare.com` for icons

### Optional Integrations
- **Analytics**: Google Analytics or similar for visitor tracking
- **Form Processing**: Netlify Forms, Formspree, or similar for contact form handling
- **Email Service**: Integration with email providers for contact functionality

## Deployment Strategy

### Current Setup
- **Development Server**: Python HTTP server on port 5000
- **Platform**: Optimized for Replit deployment
- **Build Process**: No build step required - direct file serving

### Production Considerations
- **Static Hosting**: Suitable for GitHub Pages, Netlify, Vercel, or similar platforms
- **CDN**: All external dependencies loaded via CDN for reliability
- **Performance**: Minimal JavaScript and optimized assets for fast loading
- **SEO**: Meta tags, semantic HTML, and proper heading structure implemented

### Scalability Approach
- **Content Management**: Currently hardcoded, could be migrated to headless CMS
- **Database Integration**: No database required for current functionality
- **API Integration**: Contact forms may require serverless functions or third-party services

## Changelog

```
Changelog:
- June 25, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```