import React from 'react'

const Navigation = ({ 
  currentCard, 
  totalCards, 
  onPrevious, 
  onNext, 
  onHome, 
  onBack,
  count, 
  onIncrement, 
  onClear,
  showCounting = true,
  showScrollToTop = true,
  onScrollToTop,
  isFullPageVisible = false
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (onScrollToTop) onScrollToTop()
  }
  return (
    <>
      {/* Navigation buttons */}
      <div className="flex items-center justify-center mt-4 sm:mt-6 gap-2 sm:gap-3">
        <button 
          onClick={onBack}
          className="px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-100 touch-manipulation"
        >
          <span className="block sm:hidden">⌂</span>
          <span className="hidden sm:block">Menu</span>
        </button>
        
        <button 
          onClick={onHome}
          disabled={currentCard === 1}
          className="px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-100 disabled:cursor-not-allowed touch-manipulation"
        >
          <span className="block sm:hidden">↩</span>
          <span className="hidden sm:block">Start</span>
        </button>
        
        <button 
          onClick={onPrevious}
          disabled={currentCard === 1}
          className="px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-100 disabled:cursor-not-allowed touch-manipulation"
        >
          <span className="block sm:hidden">◀</span>
          <span className="hidden sm:block">Previous</span>
        </button>
        
        {showCounting && (
          <>
            <button 
              onClick={onIncrement}
              className="px-3 py-2 sm:px-8 sm:py-3 text-sm sm:text-base bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-100 touch-manipulation"
            >
              <span className="block sm:hidden">+</span>
              <span className="hidden sm:block">Count</span>
            </button>
            
            <span className="px-3 py-2 sm:px-6 sm:py-3 bg-white text-gray-800 rounded-lg shadow-md text-sm sm:text-base font-medium min-w-[50px] flex items-center justify-center">
              {count}
            </span>
            
            <button 
              onClick={onClear}
              className="px-3 py-2 sm:px-8 sm:py-3 text-sm sm:text-base bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-100 touch-manipulation"
            >
              <span className="block sm:hidden">↻</span>
              <span className="hidden sm:block">Clear</span>
            </button>
          </>
        )}
        
        <button 
          onClick={onNext}
          disabled={currentCard === totalCards}
          className="px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-100 disabled:cursor-not-allowed touch-manipulation"
        >
          <span className="block sm:hidden">▶</span>
          <span className="hidden sm:block">Next</span>
        </button>
        
        {!isFullPageVisible && (
          <button 
            onClick={scrollToTop}
            className="w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm bg-white/30 text-white rounded-full shadow-md hover:bg-white/40 touch-manipulation flex items-center justify-center ml-4"
          >
            ↑
          </button>
        )}
      </div>
    </>
  )
}

export default Navigation