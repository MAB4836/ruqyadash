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
  showCounting = true
}) => {
  return (
    <>
      {/* Navigation buttons */}
      <div className="flex items-center justify-center mt-4 sm:mt-6 gap-2 sm:gap-3">
        <button 
          onClick={onBack}
          className="w-[40px] h-[40px] sm:w-auto sm:h-auto px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-100 touch-manipulation"
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
          className="hidden md:block px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-100 disabled:cursor-not-allowed touch-manipulation"
        >
          <span className="block sm:hidden">◀</span>
          <span className="hidden sm:block">Previous</span>
        </button>
        
        {showCounting && (
          <>
            <button 
              onClick={onIncrement}
              className="w-[36px] h-[36px] sm:w-auto sm:h-auto px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-100 touch-manipulation"
            >
              <span className="block sm:hidden">+</span>
              <span className="hidden sm:block">Count</span>
            </button>
            
            <span className="px-3 py-2 sm:px-6 sm:py-3 bg-white text-gray-800 rounded-lg shadow-md text-sm sm:text-base font-medium w-[37px] flex items-center justify-center">
              {count}
            </span>
            
            <button 
              onClick={onClear}
              className="px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-100 touch-manipulation"
            >
              <span className="block sm:hidden">↻</span>
              <span className="hidden sm:block">Clear</span>
            </button>
          </>
        )}
        
        <button 
          onClick={onNext}
          disabled={currentCard === totalCards}
          className="hidden md:block px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-100 disabled:cursor-not-allowed touch-manipulation"
        >
          <span className="block sm:hidden">▶</span>
          <span className="hidden sm:block">Next</span>
        </button>
        
      </div>
    </>
  )
}

export default Navigation