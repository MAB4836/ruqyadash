import React, { useState, useEffect, useRef } from 'react'
import Navigation from './Navigation'

const CardViewer = ({ cards, categoryTitle, onBack }) => {
  const [currentCard, setCurrentCard] = useState(1)
  const [repetitionCounts, setRepetitionCounts] = useState({})
  const [showScrollDown, setShowScrollDown] = useState(false)
  const [isAtTop, setIsAtTop] = useState(false)
  const [isFullPageVisible, setIsFullPageVisible] = useState(false)
  const cardContentRef = useRef(null)
  const cardContainerRef = useRef(null)
  
  // Swipe gesture state
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [isSwipping, setIsSwipping] = useState(false)
  
  // Animation state
  const [isAnimating, setIsAnimating] = useState(false)
  const [slideDirection, setSlideDirection] = useState(null) // 'left' or 'right'
  const [nextCardIndex, setNextCardIndex] = useState(currentCard)

  // Auto-scroll to bottom on component mount to show navigation buttons
  useEffect(() => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }, [])

  // Show scroll-down button when scroll-to-top is pressed
  const handleScrollToTop = () => {
    setShowScrollDown(true)
  }

  // Detect when at top of page and if full page is visible
  useEffect(() => {
    const handleScroll = () => {
      const atTop = window.scrollY === 0
      setIsAtTop(atTop)
      
      const fullPageVisible = window.innerHeight >= document.documentElement.scrollHeight
      setIsFullPageVisible(fullPageVisible)
    }

    handleScroll() // Check initial position
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    setShowScrollDown(false)
  }

  const nextCard = () => {
    if (isAnimating || currentCard >= cards.length) return
    
    const newCardIndex = currentCard + 1
    setIsAnimating(true)
    setSlideDirection('left')
    setNextCardIndex(newCardIndex)
    
    setTimeout(() => {
      setCurrentCard(newCardIndex)
      setIsAnimating(false)
      setSlideDirection(null)
    }, 300)
  }

  const prevCard = () => {
    if (isAnimating || currentCard <= 1) return
    
    const newCardIndex = currentCard - 1
    setIsAnimating(true)
    setSlideDirection('right')
    setNextCardIndex(newCardIndex)
    
    setTimeout(() => {
      setCurrentCard(newCardIndex)
      setIsAnimating(false)
      setSlideDirection(null)
    }, 300)
  }

  const goHome = () => {
    if (isAnimating) return
    setCurrentCard(1)
    setNextCardIndex(1)
  }

  const incrementCount = () => {
    setRepetitionCounts(prev => ({
      ...prev,
      [currentCard]: (prev[currentCard] || 0) + 1
    }))
  }

  const clearCount = () => {
    setRepetitionCounts(prev => ({
      ...prev,
      [currentCard]: 0
    }))
  }

  const getCurrentCount = () => {
    return repetitionCounts[currentCard] || 0
  }

  // Swipe gesture handlers
  const minSwipeDistance = 50

  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    setIsSwipping(true)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsSwipping(false)
      return
    }
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentCard < cards.length) {
      nextCard()
    }
    if (isRightSwipe && currentCard > 1) {
      prevCard()
    }
    
    setIsSwipping(false)
  }

  // Situation-based quick access buttons for different categories
  const getSituationButtons = () => {
    if (categoryTitle === 'Personal Protection') {
      return [
        { label: 'Emergency', cardId: 1 },
        { label: 'Evil Presence', cardId: 2 },
        { label: 'Afflicted/Frightened/Pain', cardId: 3 },
        { label: 'Before Sleep', cardId: 4 },
        { label: 'Nightmare', cardId: 5 },
        { label: 'Against Magic', cardId: 6 },
        { label: 'Hidden Enemies', cardId: 7 },
        { label: 'Suspect Places', cardId: 8 },
        { label: 'Morning/Evening', cardId: 9 }
      ]
    } else if (categoryTitle === 'Short Ruqyah') {
      return [
        { label: 'Al-Fatiha', cardId: 1 },
        { label: 'Ayat Al-Kursi', cardId: 2 },
        { label: 'Al-Baqarah 284', cardId: 3 },
        { label: 'Al-Baqarah 285', cardId: 4 },
        { label: 'Al-Baqarah 286', cardId: 5 },
        { label: 'Al-Ikhlas', cardId: 6 },
        { label: 'Al-Falaq', cardId: 7 },
        { label: 'An-Nas', cardId: 8 }
      ]
    } else if (categoryTitle === 'What is Ruqyah?') {
      return [
        { label: 'What is Ruqyah?', cardId: 1 },
        { label: 'Types', cardId: 2 },
        { label: 'How to Perform', cardId: 3 },
        { label: 'Signs & Symptoms', cardId: 4 },
        { label: 'Conditions Treated', cardId: 5 },
        { label: 'Daily Protection', cardId: 6 }
      ]
    } else if (categoryTitle === 'Entering Suspect Places') {
      return [
        { label: 'Before Entering', cardId: 1 },
        { label: 'Upon Entry', cardId: 2 },
        { label: 'During Visit', cardId: 3 },
        { label: 'Food/Drink', cardId: 4 },
        { label: 'After Leaving', cardId: 5 }
      ]
    } else if (categoryTitle === 'Understanding the Evil Eye') {
      return [
        { label: 'What is Evil Eye?', cardId: 1 },
        { label: 'Evidence', cardId: 2 },
        { label: 'Hasad vs Evil Eye', cardId: 3 },
        { label: 'Signs of Being Affected', cardId: 4 }
      ]
    } else if (categoryTitle === 'Quranic Verses of Protection') {
      return [
        { label: 'Core Verses', cardId: 1 },
        { label: 'Al-Falaq', cardId: 2 },
        { label: 'An-Nas', cardId: 3 },
        { label: 'Ayat al-Kursi', cardId: 4 },
        { label: 'Al-Qalam', cardId: 5 },
        { label: 'Yunus', cardId: 6 },
        { label: 'Yusuf', cardId: 7 },
        { label: 'Al-Baqarah', cardId: 8 }
      ]
    } else if (categoryTitle === 'Prophetic Duas for Protection') {
      return [
        { label: 'Prophet\'s Du\'a', cardId: 1 },
        { label: 'General Protection', cardId: 2 },
        { label: 'For Children', cardId: 3 }
      ]
    } else if (categoryTitle === 'Daily Protection Routine') {
      return [
        { label: 'Morning/Evening', cardId: 1 },
        { label: 'Saying Bismillah', cardId: 2 },
        { label: 'Surah Al-Baqarah', cardId: 3 }
      ]
    } else if (categoryTitle === 'Performing Ruqyah on Yourself') {
      return [
        { label: 'Core Verses', cardId: 1 },
        { label: 'Recite & Blow', cardId: 2 },
        { label: 'Water/Oil Method', cardId: 3 },
        { label: 'Self-Ruqyah', cardId: 4 },
        { label: 'Sunnah Du\'a', cardId: 5 },
        { label: 'Daily Adhkar', cardId: 6 },
        { label: 'Don\'t Overburden', cardId: 7 },
        { label: 'Wisdom', cardId: 8 }
      ]
    } else if (categoryTitle === 'Preventing Causing Evil Eye') {
      return [
        { label: 'Say MashaAllah', cardId: 1 },
        { label: 'Avoid Overexposing', cardId: 2 },
        { label: 'Teach Family', cardId: 3 }
      ]
    } else if (categoryTitle === 'Travel & Outdoor Protection') {
      return [
        { label: 'Wilderness/Desolate', cardId: 1 },
        { label: 'General Travel', cardId: 2 }
      ]
    } else if (categoryTitle === 'Family & Home Protection') {
      return [
        { label: 'Nightly Routine', cardId: 1 },
        { label: 'Family Members', cardId: 2 },
        { label: 'Affliction/Fear', cardId: 3 }
      ]
    } else if (categoryTitle === 'Preparing Spiritual Remedies') {
      return [
        { label: 'Ruqyah Water', cardId: 1 },
        { label: 'Short/Complete Verses', cardId: 2 },
        { label: 'Core Protection', cardId: 3 },
        { label: 'Against Sihr', cardId: 4 },
        { label: 'Against Jinn', cardId: 5 },
        { label: 'Strengthening Tawhid', cardId: 6 },
        { label: 'Additional Support', cardId: 7 },
        { label: 'Ruqyah Oil', cardId: 8 },
        { label: 'Combined Method', cardId: 9 },
        { label: 'Important Guidelines', cardId: 10 }
      ]
    } else if (categoryTitle === 'Entry - How Jinn Gain Access') {
      return [
        { label: 'Magic (Sihr)', cardId: 1 },
        { label: 'Spiritual Weakness', cardId: 2 },
        { label: 'Trauma', cardId: 3 },
        { label: 'Object-Based Sihr', cardId: 4 },
        { label: 'Food/Drink Sihr', cardId: 5 }
      ]
    } else if (categoryTitle === 'Sustained - How Jinn Maintain Influence') {
      return [
        { label: 'Why They Stay', cardId: 1 },
        { label: 'Control Methods', cardId: 2 },
        { label: 'Possession Signs', cardId: 3 },
        { label: 'Fighting Back', cardId: 4 }
      ]
    } else if (categoryTitle === 'Expelled - Signs of Jinn Expulsion') {
      return [
        { label: 'Physical Weakening', cardId: 1 },
        { label: 'Mental Liberation', cardId: 2 },
        { label: 'Spiritual Reconnection', cardId: 3 },
        { label: 'Dream Changes', cardId: 4 },
        { label: 'Complete Expulsion', cardId: 5 }
      ]
    } else if (categoryTitle === 'Additional Knowledge - Sihr Types & Authority') {
      return [
        { label: 'Sihr Classification', cardId: 1 },
        { label: 'Advanced Categories', cardId: 2 },
        { label: 'Jinn Hierarchy', cardId: 3 }
      ]
    } else if (categoryTitle === 'Sihr/Magic Types') {
      return [
        { label: 'Separation', cardId: 1 },
        { label: 'Love', cardId: 2 },
        { label: 'Harm', cardId: 3 },
        { label: 'Confusion', cardId: 4 },
        { label: 'Loss', cardId: 5 },
        { label: 'Transformation', cardId: 6 },
        { label: 'Speech', cardId: 7 },
        { label: 'Sleep', cardId: 8 },
        { label: 'Pregnancy', cardId: 9 },
        { label: 'Wealth', cardId: 10 },
        { label: 'Death', cardId: 11 },
        { label: 'Binding', cardId: 12 },
        { label: 'Possession', cardId: 13 },
        { label: 'Whispers', cardId: 14 },
        { label: 'Depression', cardId: 15 },
        { label: 'Addiction', cardId: 16 },
        { label: 'Sickness', cardId: 17 },
        { label: 'Forgetfulness', cardId: 18 }
      ]
    }
    return []
  }

  const situationButtons = getSituationButtons()

  const jumpToCard = (cardId) => {
    if (isAnimating) return
    setCurrentCard(cardId)
    setNextCardIndex(cardId)
  }

  // Keep nextCardIndex in sync with currentCard when not animating
  useEffect(() => {
    if (!isAnimating) {
      setNextCardIndex(currentCard)
    }
  }, [currentCard, isAnimating])

  // Scroll to top whenever currentCard changes
  useEffect(() => {
    if (cardContentRef.current) {
      cardContentRef.current.scrollTop = 0
    }
  }, [currentCard])

  const renderCardContent = (card) => {
    if (!card) {
      return <span className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-800">{currentCard}</span>
    }

    return (
      <div ref={cardContentRef} className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
        <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800"
            dangerouslySetInnerHTML={{ __html: card.title }} />
        
        <div dangerouslySetInnerHTML={{ __html: card.content }} />
      </div>
    )
  }

  const currentCardData = cards[currentCard - 1]

  // Determine if counting should be shown (only for ruqyah verse decks)
  const shouldShowCounting = categoryTitle === 'Short Ruqyah' || categoryTitle === 'Complete Ruqyah Verses' || categoryTitle === 'Manzil'

  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center p-4">
      
      {/* Test scroll to bottom button - next to title */}
      {/* {showScrollDown && categoryTitle !== 'Complete Ruqyah Verses' && (
        <button 
          onClick={scrollToBottom}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-20 bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg touch-manipulation"
        >
          ↓
        </button>
      )} */}
      
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
        {/* Category title */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-white font-bold text-xl sm:text-2xl">
              {categoryTitle}
            </h1>
            
            {/* Scroll down button - flows with title */}
            {isAtTop && !isFullPageVisible && (
              <button 
                onClick={scrollToBottom}
                className="bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg touch-manipulation flex-shrink-0"
              >
                ↓
              </button>
            )}
          </div>
        </div>

        {/* Situation-based Quick Access Buttons */}
        {situationButtons.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {situationButtons.map((button) => (
                <button
                  key={button.cardId}
                  onClick={() => jumpToCard(button.cardId)}
                  className={`px-3 py-2 text-xs rounded-lg transition-all duration-200 ${
                    currentCard === button.cardId
                      ? 'bg-yellow-400 text-gray-800 font-semibold'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Card display */}
        <div 
          ref={cardContainerRef}
          className={`relative w-full h-[80vh] sm:h-96 md:h-[500px] rounded-lg shadow-xl overflow-hidden select-none ${
            isSwipping ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'pan-y' }}
        >
          {/* Current Card */}
          <div 
            className={`absolute inset-0 w-full h-full bg-white flex items-center justify-center transition-transform duration-300 ease-out ${
              !isAnimating ? 'translate-x-0' : 
              slideDirection === 'left' ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            {/* Card counter badge */}
            <div className="absolute top-3 right-3 bg-gray-800/20 text-white text-xs px-2 py-1 rounded-full font-medium z-10">
              {currentCard} / {cards.length}
            </div>
            
            {/* Swipe indicators */}
            {currentCard > 1 && (
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs opacity-50 pointer-events-none">
                ←
              </div>
            )}
            {currentCard < cards.length && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs opacity-50 pointer-events-none">
                →
              </div>
            )}
            
            {renderCardContent(currentCardData)}
          </div>

          {/* Next Card (only visible during animation) */}
          {isAnimating && (
            <div 
              className="absolute inset-0 w-full h-full bg-white flex items-center justify-center transition-transform duration-300 ease-out"
              style={{
                transform: slideDirection === 'left' ? 
                  'translateX(0%)' : 'translateX(0%)',
                left: slideDirection === 'left' ? '-100%' : '100%'
              }}
            >
              {/* Card counter badge for next card */}
              <div className="absolute top-3 right-3 bg-gray-800/20 text-white text-xs px-2 py-1 rounded-full font-medium z-10">
                {nextCardIndex} / {cards.length}
              </div>
              
              {/* Swipe indicators for next card */}
              {nextCardIndex > 1 && (
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs opacity-50 pointer-events-none">
                  ←
                </div>
              )}
              {nextCardIndex < cards.length && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs opacity-50 pointer-events-none">
                  →
                </div>
              )}
              
              <div style={{color: 'red', fontSize: '30px', zIndex: 1000, position: 'absolute', top: '50px'}}>
                slideDirection: {slideDirection}
              </div>
              <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full" style={{scrollTop: 0}}>
                {cards[nextCardIndex - 1] && (
                  <>
                    <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800"
                        dangerouslySetInnerHTML={{ __html: cards[nextCardIndex - 1].title }} />
                    <div dangerouslySetInnerHTML={{ __html: cards[nextCardIndex - 1].content }} />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Navigation */}
        <Navigation
          currentCard={currentCard}
          totalCards={cards.length}
          onPrevious={prevCard}
          onNext={nextCard}
          onHome={goHome}
          onBack={onBack}
          count={getCurrentCount()}
          onIncrement={incrementCount}
          onClear={clearCount}
          showCounting={shouldShowCounting}
          showScrollToTop={categoryTitle !== 'Complete Ruqyah Verses'}
          onScrollToTop={handleScrollToTop}
          isFullPageVisible={isFullPageVisible}
        />
      </div>
    </div>
  )
}

export default CardViewer