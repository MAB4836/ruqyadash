import React, { useEffect, useRef } from 'react'

const PageViewer = ({ cards, categoryTitle, onBack, isDarkMode = false, showTranslations = true }) => {
  const pageContentRef = useRef(null)

  // Start at the top of the page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center p-0 md:p-4">
      <div className="relative w-full md:max-w-2xl lg:max-w-4xl">
        {/* Back button at top */}
        <div className="flex justify-center mb-4 px-4 md:px-0">
          <button
            onClick={onBack}
            className={`rounded-lg px-6 py-3 transition-all duration-200 font-medium text-white ${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/60' : 'bg-white bg-opacity-20 hover:bg-opacity-30'}`}
          >
            ← Back to Ruqyah Options
          </button>
        </div>

        {/* Category title */}
        <div className="text-center mb-4 px-4 md:px-0">
          <h1 className="text-white font-bold text-xl sm:text-2xl">
            {categoryTitle} - Page View
          </h1>
        </div>

        {/* Page content */}
        <div className={`w-full md:rounded-lg shadow-xl overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 md:border border-gray-600' : 'bg-white'}`}>
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
              <div key={card.id} className={`border-b last:border-b-0 pb-8 last:pb-0 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <h2 className={`text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
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
                  background: linear-gradient(135deg, rgb(17, 24, 39) 0%, rgb(30, 58, 138) 100%) !important;
                  color: rgb(243, 244, 246) !important;
                }
                .page-dark-mode h2,
                .page-dark-mode h3,
                .page-dark-mode h4 {
                  color: rgb(243, 244, 246) !important;
                }
                .page-dark-mode p {
                  color: rgb(209, 213, 219) !important;
                }
                .page-dark-mode .arabic-text {
                  color: rgb(243, 244, 246) !important;
                }
                
                /* Override all hardcoded text colors */
                .page-dark-mode .text-gray-600,
                .page-dark-mode .text-gray-700,
                .page-dark-mode .text-gray-800,
                .page-dark-mode .text-gray-900 {
                  color: rgb(209, 213, 219) !important;
                }
                .page-dark-mode .text-amber-800,
                .page-dark-mode .text-amber-900 {
                  color: rgb(251, 191, 36) !important;
                }
                .page-dark-mode .text-blue-800,
                .page-dark-mode .text-blue-900 {
                  color: rgb(147, 197, 253) !important;
                }
                .page-dark-mode .text-green-800,
                .page-dark-mode .text-green-900 {
                  color: rgb(134, 239, 172) !important;
                }
                .page-dark-mode .text-purple-800,
                .page-dark-mode .text-purple-900 {
                  color: rgb(196, 181, 253) !important;
                }
                .page-dark-mode .text-yellow-800,
                .page-dark-mode .text-yellow-900 {
                  color: rgb(254, 240, 138) !important;
                }
                .page-dark-mode .text-indigo-800,
                .page-dark-mode .text-indigo-900 {
                  color: rgb(165, 180, 252) !important;
                }
                
                /* Override all hardcoded background colors */
                .page-dark-mode .bg-white {
                  background: rgba(55, 65, 81, 0.3) !important;
                }
                .page-dark-mode .bg-gray-50 {
                  background: rgba(55, 65, 81, 0.3) !important;
                }
                .page-dark-mode .bg-amber-50 {
                  background: rgba(120, 53, 15, 0.3) !important;
                }
                .page-dark-mode .bg-blue-50 {
                  background: rgba(30, 58, 138, 0.3) !important;
                }
                .page-dark-mode .bg-green-50 {
                  background: rgba(20, 83, 45, 0.3) !important;
                }
                .page-dark-mode .bg-purple-50 {
                  background: rgba(76, 29, 149, 0.3) !important;
                }
                .page-dark-mode .bg-yellow-50 {
                  background: rgba(133, 77, 14, 0.3) !important;
                }
                .page-dark-mode .bg-indigo-50 {
                  background: rgba(49, 46, 129, 0.3) !important;
                }
                .page-dark-mode .bg-gradient-to-r {
                  background: linear-gradient(135deg, rgb(55, 65, 81) 0%, rgb(59, 130, 246) 100%) !important;
                }
                
                /* Override all hardcoded border colors */
                .page-dark-mode .border-gray-200 {
                  border-color: rgba(75, 85, 99, 0.5) !important;
                }
                .page-dark-mode .border-amber-300,
                .page-dark-mode .border-amber-400 {
                  border-color: rgba(251, 191, 36, 0.5) !important;
                }
                .page-dark-mode .border-blue-300,
                .page-dark-mode .border-blue-400 {
                  border-color: rgba(147, 197, 253, 0.5) !important;
                }
                .page-dark-mode .border-green-300,
                .page-dark-mode .border-green-400 {
                  border-color: rgba(134, 239, 172, 0.5) !important;
                }
                .page-dark-mode .border-purple-300,
                .page-dark-mode .border-purple-400 {
                  border-color: rgba(196, 181, 253, 0.5) !important;
                }
                .page-dark-mode .border-yellow-300,
                .page-dark-mode .border-yellow-400 {
                  border-color: rgba(254, 240, 138, 0.5) !important;
                }
                .page-dark-mode .border-indigo-300,
                .page-dark-mode .border-indigo-400 {
                  border-color: rgba(165, 180, 252, 0.5) !important;
                }
                
                /* Enhanced shadow for dark mode */
                .page-dark-mode .shadow-lg {
                  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1) !important;
                }
              `}</style>
            )}
          </div>
        </div>
        
        {/* Back button */}
        <div className="flex justify-center mt-8 px-4 md:px-0">
          <button
            onClick={onBack}
            className={`rounded-lg px-6 py-3 transition-all duration-200 font-medium text-white ${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/60' : 'bg-white bg-opacity-20 hover:bg-opacity-30'}`}
          >
            ← Back to Ruqyah Options
          </button>
        </div>
      </div>
    </div>
  )
}

export default PageViewer