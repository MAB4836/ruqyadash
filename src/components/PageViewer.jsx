import React, { useEffect, useRef } from 'react'

const PageViewer = ({ cards, categoryTitle, onBack, isDarkMode = false, showTranslations = true }) => {
  const pageContentRef = useRef(null)

  // Start at the top of the page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
        {/* Back button at top */}
        <div className="flex justify-center mb-4">
          <button
            onClick={onBack}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg px-6 py-3 transition-all duration-200 font-medium"
          >
            ← Back to Ruqyah Options
          </button>
        </div>

        {/* Category title */}
        <div className="text-center mb-4">
          <h1 className="text-white font-bold text-xl sm:text-2xl">
            {categoryTitle} - Page View
          </h1>
        </div>

        {/* Page content */}
        <div className="w-full bg-white rounded-lg shadow-xl overflow-hidden">
          <div 
            ref={pageContentRef}
            className={`p-4 sm:p-6 md:p-8 space-y-12 ${
              isDarkMode ? 'page-dark-mode' : ''
            }`}
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth'
            }}
          >
            {cards.map((card, index) => (
              <div key={card.id} className="border-b border-gray-200 last:border-b-0 pb-8 last:pb-0">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
                  {index + 1}. <span dangerouslySetInnerHTML={{ __html: card.title }} />
                </h2>
                <div 
                  className="arabic-text text-xl sm:text-2xl md:text-3xl"
                  dangerouslySetInnerHTML={{ __html: card.content }} 
                />
              </div>
            ))}
            
            {/* Translation visibility styles for Ruqyah decks */}
            {(categoryTitle.includes('Manzil') || categoryTitle.includes('Prophetic Ruqyah') || categoryTitle.includes('Ruqyah Plus')) && !showTranslations && (
              <style>{`
                .text-gray-600.italic,
                .text-base.text-gray-700:not(.font-semibold):not(.font-bold) {
                  display: none !important;
                }
              `}</style>
            )}
            
            {/* Dark mode styles */}
            {isDarkMode && (
              <style>{`
                .page-dark-mode {
                  background-color: black !important;
                  color: white !important;
                }
                .page-dark-mode,
                .page-dark-mode * {
                  color: white !important;
                  background-color: black !important;
                  border-color: #666 !important;
                }
                .page-dark-mode h2 {
                  color: white !important;
                }
                .page-dark-mode .bg-gradient-to-r {
                  background: black !important;
                }
                .page-dark-mode .border-gray-200 {
                  border-color: #666 !important;
                }
                .page-dark-mode .border-amber-300,
                .page-dark-mode .border-blue-400,
                .page-dark-mode .border-green-400,
                .page-dark-mode .border-purple-400,
                .page-dark-mode .border-yellow-400,
                .page-dark-mode .border-indigo-400 {
                  border-color: #666 !important;
                }
              `}</style>
            )}
          </div>
        </div>
        
        {/* Back button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={onBack}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg px-6 py-3 transition-all duration-200 font-medium"
          >
            ← Back to Ruqyah Options
          </button>
        </div>
      </div>
    </div>
  )
}

export default PageViewer