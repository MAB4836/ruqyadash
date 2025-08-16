import React from 'react'

const RuqyahSubmenu = ({ onSelectOption, onBack, onOpenGuide, showReturnButton, isDarkMode, onToggleDarkMode, isPageView, onTogglePageView, showTranslations, onToggleTranslations }) => {
  const submenuOptions = [
    {
      id: 'whatIsRuqyah',
      title: 'What is Ruqyah?',
      description: 'Learn about the Islamic practice of spiritual healing'
    },
    {
      id: 'shortRuqyah',
      title: 'Prophetic Ruqyah',
      description: 'Ruqyah verses proven from Sunnah'
    },
    {
      id: 'manzil',
      title: 'Manzil',
      description: 'The Manzil is a well-known collection of Quranic verses for protection and healing'
    },
    {
      id: 'completeRuqyah',
      title: 'Ruqyah Plus',
      description: 'Includes additional verses commonly recited by scholars and practitioners'
    }
  ]

  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Ruqyah Options
          </h1>
          <div className="text-center">
            {/* Bismillah with toggles on sides */}
            <div className="flex justify-between items-center mb-4">
              {/* Left toggles */}
              <div className="flex items-center gap-2">
                {/* Translation toggle */}
                <button
                  onClick={onToggleTranslations}
                  className="rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200 bg-white/20 hover:bg-white/30 text-white"
                  title={showTranslations ? "Hide translations" : "Show translations"}
                >
                  <span className="text-xs">{showTranslations ? 'أ' : 'A'}</span>
                </button>
              </div>
              
              {/* Center - Bismillah */}
              <p className="text-white text-sm opacity-75">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              
              {/* Right toggles */}
              <div className="flex items-center gap-2">
                {/* Page View toggle */}
                <button
                  onClick={onTogglePageView}
                  className="rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200 bg-white/20 hover:bg-white/30 text-white"
                  title={isPageView ? "Card view" : "Page view"}
                >
                  <span className="text-xs">{isPageView ? '📄' : '🔢'}</span>
                </button>
                
                {/* Dark mode toggle */}
                <button
                  onClick={onToggleDarkMode}
                  className="rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200 bg-white/20 hover:bg-white/30 text-white"
                  title={isDarkMode ? "Light mode" : "Dark mode"}
                >
                  <span className="text-xs">{isDarkMode ? '☀' : '🌙'}</span>
                </button>
              </div>
            </div>
            
            {/* Start Here Guide Pill - now has full width */}
            <div className="flex justify-center mb-4">
              <button
                onClick={onOpenGuide}
                className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Start Here - Understanding These Ruqyah Collections
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {submenuOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelectOption(option.id)}
              className="w-full bg-blue-400 hover:bg-blue-500 text-white rounded-lg shadow-lg p-4 sm:p-6 transition-all duration-200 transform hover:scale-105 touch-manipulation"
            >
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold">{option.title}</h3>
                <p className="text-sm sm:text-base opacity-90 mt-1">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
        
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={onBack}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg px-4 py-2 transition-all duration-200"
          >
            {showReturnButton ? '← Return to Previous Section' : '← Back'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RuqyahSubmenu