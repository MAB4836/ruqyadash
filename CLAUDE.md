# Ruqyah Islamic Protection App - CLAUDE.md

## Project Overview
This is a React-based Islamic spiritual protection app built with Vite, Tailwind CSS, and Capacitor for cross-platform deployment. The app provides access to Quranic verses, prophetic supplications (duas), and traditional Islamic protection routines for spiritual healing (Ruqyah) and protection from supernatural threats.

## Key Information
- **Project Name**: ffcard (internal name) / Ruqyah (app name)
- **Type**: React SPA with Android mobile app capability
- **Main Purpose**: Islamic spiritual protection and Ruqyah guidance
- **Target Platforms**: Web and Android (via Capacitor)

## Technology Stack
- **Frontend**: React 18.2.0 with JSX
- **Build Tool**: Vite 5.2.0
- **Styling**: Tailwind CSS 3.4.17
- **Mobile**: Capacitor 7.4.2 for Android deployment
- **Code Quality**: ESLint with React plugins
- **Package Manager**: npm

## Development Commands
```bash
# Development
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint checks

# Deployment
npm run deploy       # Deploy to GitHub Pages
```

## Project Structure
```
├── src/
│   ├── components/          # React components
│   │   ├── MenuScreen.jsx          # Main menu interface
│   │   ├── CardViewer.jsx          # Content display component
│   │   ├── RuqyahSubmenu.jsx       # Ruqyah options submenu
│   │   ├── EvilEyeSubmenu.jsx      # Evil eye protection submenu
│   │   ├── PersonalProtectionSubmenu.jsx
│   │   ├── JinnAttacksSubmenu.jsx  # Jinn protection submenu
│   │   └── Navigation.jsx          # Navigation component
│   ├── data/               # Content data files (JS modules)
│   │   ├── ruqyahVerses.js        # Complete Ruqyah verses
│   │   ├── shortRuqyah.js         # Short Ruqyah collection
│   │   ├── quranicProtection.js   # Quranic protection verses
│   │   ├── propheticDuas.js       # Prophet's supplications
│   │   ├── personalProtection.js  # Personal protection routines
│   │   ├── dailyProtectionRoutine.js
│   │   ├── familyProtection.js
│   │   ├── travelProtection.js
│   │   ├── jinnEntry.js           # Jinn knowledge content
│   │   ├── jinnSustained.js
│   │   ├── jinnExpelled.js
│   │   ├── jinnKnowledge.js
│   │   ├── sihrTypes.js           # Magic/sihr types
│   │   ├── spiritualRemedies.js
│   │   ├── understandingEvilEye.js
│   │   ├── preventingEvilEye.js
│   │   ├── performingRuqyah.js
│   │   ├── whatIsRuqyah.js
│   │   └── suspectHouse.js
│   ├── App.jsx             # Main app component with routing logic
│   ├── main.jsx           # React app entry point
│   ├── App.css            # Main stylesheet
│   └── index.css          # Base styles with Tailwind imports
├── android/               # Capacitor Android project
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   ├── java/com/ruqyahdash/ruqyahmenu/MainActivity.java
│   │   │   └── assets/public/     # Built web app assets
│   │   └── build.gradle
│   └── build.gradle
├── public/               # Static assets
├── dist/                # Production build output
├── capacitor.config.json # Capacitor configuration
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.cjs  # Tailwind CSS configuration
└── eslint.config.js     # ESLint configuration
```

## App Architecture
The app uses a state-driven navigation system:
- **MenuScreen**: Main entry point with category selection
- **Submenus**: Category-specific option screens (Ruqyah, Evil Eye, etc.)
- **CardViewer**: Content display with card-based interface
- **Data Files**: Modular content stored as JavaScript exports

### Navigation Flow
1. Main Menu → Category Selection
2. Category → Submenu (if applicable) 
3. Submenu → Content Cards
4. Back navigation through each level

## Content Structure
Content is stored in `/src/data/` as JavaScript modules exporting arrays of card objects:
```javascript
export const exampleContent = [
  {
    id: 1,
    title: "Card Title",
    content: "HTML content with Arabic text and styling"
  }
]
```

## Styling Approach  
- **Tailwind CSS**: Utility-first styling throughout
- **Responsive Design**: Mobile-first with responsive breakpoints
- **Arabic Text Support**: Proper RTL text rendering
- **Color Scheme**: Red/blue primary colors with Islamic aesthetic

## Mobile App Details
- **Android Package**: `com.ruqyahdash.ruqyahmenu`
- **Capacitor Version**: 7.4.2
- **Build Target**: Android with splash screens and icons
- **Web Assets**: Bundled in `android/app/src/main/assets/public/`

## Configuration Files
- **capacitor.config.json**: App ID and web directory settings
- **tailwind.config.cjs**: CSS framework configuration
- **eslint.config.js**: Code linting rules for React/JSX
- **vite.config.js**: Build tool configuration

## Development Notes
- The app is designed for Islamic spiritual content and protection
- Content includes Quranic verses, prophetic supplications, and traditional guidance
- No external API dependencies - all content is static
- Responsive design optimized for mobile usage
- Touch-friendly interface with large buttons and easy navigation

## Testing & Quality
- ESLint configured for React/JSX best practices
- No automated tests currently configured
- Manual testing recommended for navigation flows
- Mobile testing via Capacitor Android build

## Deployment
- **Web**: GitHub Pages via `npm run deploy`
- **Android**: Build APK via Capacitor CLI
- Production builds created in `/dist/` directory