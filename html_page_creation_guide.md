# HTML Page Creation Guide for RuqyaDash

This document outlines the process of creating and integrating HTML pages like `personalProtection.html` into the RuqyaDash application.

## 1. HTML File Structure

HTML files in this project follow a specific structure with these key components:

### 1.1 Basic Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - Comprehensive Guide</title>
    <!-- Google Fonts for Arabic text -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri+Quran&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600&display=swap">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* CSS styles here */
    </style>
</head>
<body>
    <!-- Content here -->
</body>
</html>
```

### 1.2 Required CSS Styles

Include these styles in the `<style>` section:

```css
/* Import Arabic fonts */
@font-face {
    font-family: 'KSARegular_B';
    src: url('/KSARegular_B.ttf') format('truetype');
    font-display: swap;
    unicode-range: U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC;
}

@font-face {
    font-family: 'MUHAMMADIBold';
    src: url('/MUHAMMADIBold.ttf') format('truetype');
    font-display: swap;
    unicode-range: U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC;
}

@font-face {
    font-family: 'Naskh-Nastaleeq';
    src: url('/Naskh-Nastaleeq-IndoPak-QWBW.ttf') format('truetype');
    font-display: swap;
    unicode-range: U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC;
}

@font-face {
    font-family: 'PDMS_SALEEM';
    src: url('/PDMS_SALEEM_QURANFONTQESHIP_0.ttf') format('truetype');
    font-display: swap;
    unicode-range: U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
    min-height: 100vh;
    margin: 0;
    padding: 0;
}

.guide-container {
    width: 100%;
    margin: 0 auto;
}

.header {
    background: linear-gradient(90deg, #2b6cb0 0%, #4299e1 100%);
    padding: 25px 20px;
    margin-bottom: 0;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
}

.section-title {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 15px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.box {
    border-radius: 12px;
    margin-bottom: 25px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.box:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
}

/* Arabic text styling */
.arabic-text {
    font-family: 'MUHAMMADIBold', 'Naskh-Nastaleeq', 'KSARegular_B', 'Amiri Quran', 'Noto Sans Arabic', sans-serif;
    line-height: 2.2;
    font-weight: 500;
}

.footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px;
    color: #cbd5e0;
    font-size: 0.9rem;
}
```

### 1.3 Content Structure

Organize content using this structure:

```html
<div class="guide-container">
    <!-- Header -->
    <header class="header">
        <h1 class="text-3xl md:text-4xl font-bold text-white text-center">Page Title</h1>
    </header>
    
    <!-- Main content -->
    <main class="p-4 md:p-6 lg:p-8">
        <!-- Introduction Section -->
        <section class="mb-8">
            <div class="box bg-gray-700 p-6">
                <h2 class="section-title text-gray-100">Introduction</h2>
                <p class="text-gray-300 mb-4">Introduction text here...</p>
            </div>
        </section>
        
        <!-- Content Sections -->
        <section class="mb-8">
            <div class="box bg-blue-800 p-6">
                <h2 class="section-title text-gray-100">Section Title</h2>
                <p class="text-gray-300 mb-4">Content text here...</p>
                
                <!-- Arabic Text Example -->
                <p class="arabic-text text-lg sm:text-xl md:text-2xl mb-4 text-center text-gray-100" 
                   style="direction: rtl; text-align: center;">
                    بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </p>
            </div>
        </section>
        
        <!-- More sections as needed -->
    </main>
    
    <!-- Footer -->
    <footer class="footer">
        <p>© 2023 RuqyaDash. All rights reserved.</p>
    </footer>
</div>
```

## 2. Arabic Text Support

### 2.1 Font Setup

The application uses several Arabic fonts to ensure proper rendering:

1. Google Fonts (loaded via CDN):
   - Amiri Quran
   - Noto Sans Arabic

2. Local fonts (included in the project):
   - KSARegular_B
   - MUHAMMADIBold
   - Naskh-Nastaleeq
   - PDMS_SALEEM

### 2.2 Arabic Text Styling

When adding Arabic text, use these guidelines:

1. Apply the `.arabic-text` class to the containing element
2. Set `direction: rtl;` and `text-align: center;` inline styles
3. Use appropriate text size classes (e.g., `text-lg sm:text-xl md:text-2xl`)
4. Set text color to ensure readability against the background (e.g., `text-gray-100`)

Example:
```html
<p class="arabic-text text-lg sm:text-xl md:text-2xl mb-4 text-center text-gray-100" 
   style="direction: rtl; text-align: center;">
    بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
</p>
```

## 3. Color Scheme

The application uses a dark theme with specific color combinations:

### 3.1 Background Colors

- Main background: `linear-gradient(135deg, #1a202c 0%, #2d3748 100%)`
- Section backgrounds:
  - Gray sections: `bg-gray-700`
  - Blue sections: `bg-blue-800`
  - Green sections: `bg-green-800`
  - Red sections: `bg-red-800`
  - Purple sections: `bg-purple-800`

### 3.2 Text Colors

- Headings: `text-gray-100`
- Body text: `text-gray-300` or `text-gray-200`
- Arabic text: `text-gray-100`

## 4. Integration into the Application

### 4.1 Create a Viewer Component

To integrate a new HTML page, create a viewer component in `src/components/`:

```jsx
import React, { useEffect } from 'react'

const NewPageViewer = ({ onBack, isDarkMode }) => {
  useEffect(() => {
    // Load the HTML file content into an iframe
    const iframe = document.getElementById('new-page-iframe')
    if (iframe) {
      iframe.src = '/newPage.html'
    }
  }, [])

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header with back button */}
      <div className={`sticky top-0 z-10 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className={`flex items-center transition-colors ${isDarkMode ? 'text-blue-300 hover:text-blue-100' : 'text-blue-600 hover:text-blue-800'}`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
      </div>

      {/* iframe container */}
      <div className="w-full h-full">
        <iframe
          id="new-page-iframe"
          title="New Page Guide"
          className="w-full min-h-screen border-0"
          style={{ height: 'calc(100vh - 73px)' }}
        />
      </div>
    </div>
  )
}

export default NewPageViewer
```

### 4.2 Update App.jsx

1. Import the new viewer component:
```jsx
import NewPageViewer from './components/NewPageViewer'
```

2. Add a state variable for the new option:
```jsx
const [selectedNewOption, setSelectedNewOption] = useState(null)
```

3. Add a handler function for navigation:
```jsx
const handleBackToMenu = useCallback(() => {
  setCurrentScreen('menu')
  setSelectedCategory(null)
  setSelectedNewOption(null)
}, [])
```

4. Update the render logic to include the new component:
```jsx
{currentScreen === 'newPageViewer' && (
  <NewPageViewer 
    onBack={handleBackToMenu} 
    isDarkMode={isDarkMode} 
  />
)}
```

### 4.3 Add to Navigation Menu

Update the appropriate submenu component to include the new page option:

```jsx
const submenuOptions = [
  // Existing options...
  {
    id: 'newPage',
    title: 'New Page Title',
    description: 'Brief description of the new page'
  },
  // More options...
]
```

### 4.4 Update Navigation Logic

In the submenu component's `onSelectOption` handler, ensure the new option is handled:

```jsx
const handleOptionSelect = (optionId) => {
  onSelectOption(optionId)
}
```

In App.jsx, update the handler for the submenu:

```jsx
const handlePersonalProtectionOptionSelect = useCallback((option) => {
  setSelectedPersonalProtectionOption(option)
  
  if (option === 'newPage') {
    setCurrentScreen('newPageViewer')
  } else {
    // Handle other options
  }
}, [])
```

## 5. Testing

After creating and integrating a new HTML page:

1. Run the development server: `npm run dev`
2. Navigate to the appropriate submenu
3. Select your new page option
4. Verify that:
   - The page loads correctly in the iframe
   - Arabic text is displayed properly
   - The back button works as expected
   - All styling is consistent with the application theme

## 6. Common Issues and Solutions

### 6.1 Arabic Text Not Displaying Correctly

- Ensure all font files are in the public directory
- Check that the `arabic-text` class is applied
- Verify `direction: rtl;` is set for the text container

### 6.2 Iframe Not Loading

- Check that the HTML file is in the correct location (public directory)
- Verify the file path in the viewer component
- Check for console errors related to iframe loading

### 6.3 Styling Inconsistencies

- Ensure Tailwind CSS is loaded correctly
- Check for missing CSS classes or styles
- Verify color scheme consistency with the rest of the application