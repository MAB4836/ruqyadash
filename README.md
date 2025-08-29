# ffcard

A React application for Islamic ruqyah (spiritual healing) and protection from supernatural threats, built with Vite and Tailwind CSS. This project provides an interactive interface for accessing Quranic verses, prophetic supplications, and traditional Islamic protection routines.

## Features
- **Interactive Protection Menus**: 
  - Ruqyah verses and practices
  - Evil Eye prevention and remedies
  - Jinn attack protection and knowledge
  - Personal and family protection routines
  - Travel and home protection guidance
- **Structured Data**: 
  - Quranic protection verses (`src/data/quranicProtection.js`)
  - Prophetic supplications (`src/data/propheticDuas.js`)
  - Spiritual remedies (`src/data/spiritualRemedies.js`)
  - Ruqyah performance guidance (`src/data/performingRuqyah.js`)
- **Modular Architecture**: 
  - Reusable components in `src/components/`
  - Data files organized by category in `src/data/`

## Technologies
- React 18 with JSX syntax
- Vite build tool for development and bundling
- Tailwind CSS for utility-first styling
- PostCSS and Autoprefixer for CSS processing
- ESLint for code quality checks

## Development Scripts
```bash
npm run dev       # Start development server
npm run build     # Build production version
npm run lint      # Run ESLint checks
npm run deploy    # Deploy to GitHub Pages
```

## Deployment
The app is configured for GitHub Pages deployment via the `gh-pages` package. After building with `npm run build`, use `npm run deploy` to publish to GitHub Pages.

## Project Structure
```
├── public/               # Static assets
├── src/
│   ├── components/       # UI components
│   ├── data/             # JSON-like JS data files
│   └── App.css           # Main CSS file
└── README.md             # Project documentation
```

## License
MIT License - see LICENSE file for details
