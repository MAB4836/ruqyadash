// HELLO FROM DEEPSEEK CODER
// HELLO FROM DEEPSEEK CODER
// HELLO FROM DEEPSEEK CODER
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react'
import Navigation from './Navigation'
import { KeepAwake } from '@capacitor-community/keep-awake'

const CardViewer = forwardRef(({ cards, categoryTitle, onBack, navigateToSection, navigateBack, hasReturnPath, isDarkMode = false, showTranslations = true }, ref) => {
  const [currentCard, setCurrentCard] = useState(1)
  const [repetitionCounts, setRepetitionCounts] = useState({})
  const [showScrollDown, setShowScrollDown] = useState(false)
  const [isAtTop, setIsAtTop] = useState(false)
  const [isFullPageVisible, setIsFullPageVisible] = useState(false)
  const cardContentRef = useRef(null)
  const cardContainerRef = useRef(null)
  const bookScrollRef = useRef(null)
  
  // Audio state
  const [currentAudio, setCurrentAudio] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)
  const audioRef = useRef(null)
  
  
  // Animation state
  const [isAnimating, setIsAnimating] = useState(false)
  const [slideDirection, setSlideDirection] = useState(null) // 'left' or 'right'
  const [nextCardIndex, setNextCardIndex] = useState(currentCard)
  
  // Note popup state
  const [showNotePopup, setShowNotePopup] = useState(false)
  
  // Check if current card should show the Note pill
  const shouldShowNotePill = (card) => {
    const isSpecialCategory = categoryTitle === 'Complete Ruqyah Verses' || categoryTitle === 'Manzil'
    const isSpecialCard = card && (card.id === 1 || card.id === 35)
    return isSpecialCategory && isSpecialCard
  }

  // Expose stopAudio function to parent component via ref
  useImperativeHandle(ref, () => ({
    stopAudio: () => {
      if (currentAudio) {
        currentAudio.pause()
        setIsPlaying(false)
        setCurrentAudio(null)
        allowScreenOff()
      }
      setAutoPlay(false)
    }
  }), [currentAudio])

  // Check for return card index and scroll position on component mount
  useEffect(() => {
    const returnToCard = localStorage.getItem('returnToCardIndex')
    const returnScrollPosition = localStorage.getItem('returnScrollPosition')
    
    if (returnToCard) {
      setCurrentCard(parseInt(returnToCard))
      localStorage.removeItem('returnToCardIndex')
    }
    
    if (returnScrollPosition) {
      // Set scroll position after a short delay to ensure the card content is rendered
      setTimeout(() => {
        const cardIndex = returnToCard ? parseInt(returnToCard) : currentCard
        const isBookFormat = categoryTitle === 'Diagnosis and Help' && cardIndex === 8
        
        if (isBookFormat && bookScrollRef.current) {
          bookScrollRef.current.scrollTop = parseInt(returnScrollPosition)
        } else if (!isBookFormat && cardContentRef.current) {
          cardContentRef.current.scrollTop = parseInt(returnScrollPosition)
        } else {
        }
      }, 100)
      localStorage.removeItem('returnScrollPosition')
    }
  }, [])

  // Auto-scroll to bottom on component mount to show navigation buttons
  // Skip auto-scroll for categories that have important quick access buttons at top
  useEffect(() => {
    const categoriesWithTopButtons = ['What is Ruqyah?']
    if (!categoriesWithTopButtons.includes(categoryTitle)) {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    }
  }, [])

  // Keep screen awake for text reading sessions
  useEffect(() => {
    const shouldKeepAwake = categoryTitle === 'Complete Ruqyah Verses' || 
                           categoryTitle === 'Manzil' ||
                           categoryTitle === 'Short Ruqyah'
    
    if (shouldKeepAwake) {
      keepScreenOn()
      console.log('Screen wake lock activated for text reading:', categoryTitle)
    }

    return () => {
      if (shouldKeepAwake) {
        allowScreenOff()
        console.log('Screen wake lock released for text reading:', categoryTitle)
      }
    }
  }, [categoryTitle])

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
    
    // Also scroll card content to bottom
    const currentCardData = cards[currentCard - 1]
    const isBookFormat = categoryTitle === 'Diagnosis and Help' && currentCard === 8
    
    if (isBookFormat && bookScrollRef.current) {
      bookScrollRef.current.scrollTop = bookScrollRef.current.scrollHeight
    } else if (!isBookFormat && cardContentRef.current) {
      cardContentRef.current.scrollTop = cardContentRef.current.scrollHeight
    }
    
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

  const handleBackWithAudioStop = () => {
    // Stop any currently playing audio before navigating back
    if (currentAudio) {
      currentAudio.pause()
      setIsPlaying(false)
      setCurrentAudio(null)
      allowScreenOff()
    }
    // Turn off auto-play if it was enabled
    setAutoPlay(false)
    
    // Release screen wake lock for text reading sessions
    const shouldKeepAwake = categoryTitle === 'Complete Ruqyah Verses' || 
                           categoryTitle === 'Manzil' ||
                           categoryTitle === 'Short Ruqyah'
    
    if (shouldKeepAwake) {
      allowScreenOff()
      console.log('Screen wake lock released on back navigation:', categoryTitle)
    }
    
    // Call the original onBack function
    onBack()
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

  // Screen wake control functions
  const keepScreenOn = async () => {
    try {
      await KeepAwake.keepAwake()
      console.log('Screen wake lock activated')
    } catch (error) {
      console.warn('Could not activate screen wake lock:', error)
    }
  }
  
  const allowScreenOff = async () => {
    try {
      await KeepAwake.allowSleep()
      console.log('Screen wake lock released')
    } catch (error) {
      console.warn('Could not release screen wake lock:', error)
    }
  }

  // Auto-continue helper function
  const autoAdvanceToNextCard = useCallback(() => {
    if (!autoPlay || currentCard >= cards.length) {
      setAutoPlay(false)
      return
    }
    
    const nextCardIndex = currentCard + 1
    const nextCardData = cards[nextCardIndex - 1]
    
    // Only advance if next card exists and has audio
    if (nextCardData && nextCardData.audioFile) {
      setIsAnimating(true)
      setSlideDirection('left')
      setNextCardIndex(nextCardIndex)
      
      setTimeout(() => {
        setCurrentCard(nextCardIndex)
        setIsAnimating(false)
        setSlideDirection(null)
      }, 300)
    } else {
      // If we reach the end or next card has no audio, turn off auto-play
      setAutoPlay(false)
    }
  }, [autoPlay, currentCard, cards])

  // Audio control functions
  const playAudio = useCallback(async (audioFile) => {
    // Clean up any existing audio
    if (currentAudio) {
      try {
        currentAudio.pause()
        // Clean up previous audio event listeners
        currentAudio.onended = null
        currentAudio.onerror = null
      } catch (error) {
        // Ignore pause errors on old audio
      }
    }
    
    // Small delay to ensure previous audio cleanup is complete
    await new Promise(resolve => setTimeout(resolve, 50))
    
    try {
      const audio = new Audio(`/audio/${audioFile}`)
      audioRef.current = audio
      setCurrentAudio(audio)
      
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Check if this audio is still the current one before updating state
            if (audioRef.current === audio) {
              setIsPlaying(true)
              keepScreenOn()
            }
          })
          .catch(error => {
            // Only log error if this is still the current audio
            if (audioRef.current === audio) {
              console.error('Error playing audio:', error)
              setIsPlaying(false)
              setCurrentAudio(null)
            }
          })
      }
      
      audio.onended = () => {
        // Check if this is still the current audio
        if (audioRef.current === audio) {
          setIsPlaying(false)
          setCurrentAudio(null)
          allowScreenOff()
          
          // Auto-continue logic with delay
          if (autoPlay) {
            setTimeout(() => {
              autoAdvanceToNextCard()
            }, 500)
          }
        }
      }
      
      audio.onerror = () => {
        // Check if this is still the current audio
        if (audioRef.current === audio) {
          setIsPlaying(false)
          setCurrentAudio(null)
          allowScreenOff()
          console.error('Error loading audio file:', audioFile)
        }
      }
    } catch (error) {
      console.error('Error creating audio:', error)
      setIsPlaying(false)
      setCurrentAudio(null)
    }
  }, [currentAudio, autoPlay, allowScreenOff, keepScreenOn, autoAdvanceToNextCard])
  
  const toggleAudio = async () => {
    const currentCardData = cards[currentCard - 1]
    if (!currentCardData || !currentCardData.audioFile) return
    
    if (isPlaying && currentAudio) {
      try {
        currentAudio.pause()
        setIsPlaying(false)
        allowScreenOff()
      } catch (error) {
        // Audio might already be paused or disposed
      }
    } else if (currentAudio && currentAudio.paused) {
      try {
        const playPromise = currentAudio.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
              keepScreenOn()
            })
            .catch(() => {
              // If resume fails, create new audio
              playAudio(currentCardData.audioFile)
            })
        }
      } catch (error) {
        // If resume fails, create new audio
        playAudio(currentCardData.audioFile)
      }
    } else {
      await playAudio(currentCardData.audioFile)
    }
  }

  // Handle audio when card changes
  useEffect(() => {
    if (currentAudio && !isAnimating) {
      // Stop current audio when changing cards manually
      currentAudio.pause()
      // Clean up event listeners
      currentAudio.onended = null
      currentAudio.onerror = null
      setIsPlaying(false)
      setCurrentAudio(null)
      allowScreenOff()
    }
  }, [currentCard, isAnimating, currentAudio, allowScreenOff])
  
  // Auto-play audio for new card in auto-continue mode
  useEffect(() => {
    if (autoPlay && !isAnimating && !isPlaying) {
      const currentCardData = cards[currentCard - 1]
      if (currentCardData && currentCardData.audioFile) {
        setTimeout(async () => {
          await playAudio(currentCardData.audioFile)
        }, 200)
      }
    }
  }, [currentCard, autoPlay, isAnimating, isPlaying, playAudio])

  // Enhanced scroll sensitivity
  useEffect(() => {
    const handleWheel = (e) => {
      // Only enhance wheel scrolling, not touch scrolling
      if (e.deltaY !== 0) {
        const scrollContainer = cardContentRef.current || bookScrollRef.current
        if (scrollContainer) {
          // Check if we're at the boundaries to prevent default behavior
          const atTop = scrollContainer.scrollTop === 0
          const atBottom = Math.ceil(scrollContainer.scrollTop + scrollContainer.clientHeight) >= scrollContainer.scrollHeight - 1
          
          // Prevent default only when we need to handle the scroll ourselves
          if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
            e.preventDefault()
            // Multiply scroll distance by 1.5 for better sensitivity
            scrollContainer.scrollTop += e.deltaY * 1.5
          }
        }
      }
    }

    const handleTouchMove = (e) => {
      // Enable momentum scrolling for touch devices
      const scrollContainer = cardContentRef.current || bookScrollRef.current
      if (scrollContainer) {
        scrollContainer.style.webkitOverflowScrolling = 'touch'
        scrollContainer.style.overflowBehavior = 'contain'
      }
    }

    const currentContainer = cardContentRef.current || bookScrollRef.current
    const cleanupFunctions = []
    
    if (currentContainer) {
      // Add wheel event listener
      currentContainer.addEventListener('wheel', handleWheel, { passive: false })
      cleanupFunctions.push(() => {
        if (currentContainer) {
          currentContainer.removeEventListener('wheel', handleWheel)
        }
      })
      
      // Add touchmove event listener
      currentContainer.addEventListener('touchmove', handleTouchMove, { passive: true })
      cleanupFunctions.push(() => {
        if (currentContainer) {
          currentContainer.removeEventListener('touchmove', handleTouchMove)
        }
      })
    }
    
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [currentCard])

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
    } else if (categoryTitle === 'Diagnosis and Help') {
      return [
        { label: 'Start Here', cardId: 1 },
        { label: 'Common Effects', cardId: 2 },
        { label: 'Mood & Emotions', cardId: 3 },
        { label: 'Sleep Problems', cardId: 4 },
        { label: 'Physical Signs', cardId: 5 },
        { label: 'Mind & Memory', cardId: 6 },
        { label: 'People Tensions', cardId: 7 },
        { label: 'Self-Check Guide', cardId: 8 }
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

  // Clean up audio on component unmount
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause()
        currentAudio.onended = null
        currentAudio.onerror = null
        setIsPlaying(false)
        setCurrentAudio(null)
      }
      // Release screen wake lock
      const releaseScreenLock = async () => {
        try {
          await KeepAwake.allowSleep()
        } catch (error) {
          console.warn('Could not release screen wake lock:', error)
        }
      }
      releaseScreenLock()
    }
  }, [currentAudio])

  // Scroll to top whenever currentCard changes
  useEffect(() => {
    if (cardContentRef.current) {
      cardContentRef.current.scrollTop = 0
    }
    if (bookScrollRef.current) {
      bookScrollRef.current.scrollTop = 0
    }
  }, [currentCard])

  const renderCardContent = (card) => {
    if (!card) {
      return <span className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-800">{currentCard}</span>
    }

    // Special book page rendering for card 8 of "Diagnosis and Help"
    if (categoryTitle === 'Diagnosis and Help' && currentCard === 8) {
      return (
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-blue-900' : 'bg-white'}`}>
          <div ref={bookScrollRef} className="h-full overflow-y-auto p-4" style={{ 
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}>
            <div className="max-w-4xl mx-auto">
              <div className={`rounded-lg shadow-xl p-6 sm:p-8 ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600' : 'bg-white'}`}>
                <div className="mb-6">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-4">
                    How to Safely Check for Possible Spiritual Affliction and What to Do Next
                  </h1>
                  <div className="w-16 h-1 bg-blue-500 mx-auto mb-6"></div>
                </div>

                <div className="prose prose-gray max-w-none space-y-6">
                  <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r-lg mb-6">
                    <h4 className="font-bold text-gray-800 mb-3">Contents of This Guide:</h4>
                    <div className="text-gray-700">
                      <ol className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="font-bold mr-2 text-gray-800">1.</span>
                          <span><strong>Before you begin</strong> (medical disclaimer)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-bold mr-2 text-gray-800">2.</span>
                          <div>
                            <span><strong>Safe Self-Testing Options</strong> (5 color-coded methods)</span>
                            <ul className="mt-1 ml-4 space-y-1 text-xs text-gray-600">
                              <li>- Option A: Recitation Test (with personal experience note)</li>
                              <li>- Option B: Listening Test (with practical tips)</li>
                              <li>- Option C: Water Ruqyah Test</li>
                              <li>- Option D: Oil Application Test</li>
                              <li>- Option E: Dream Observation Test</li>
                            </ul>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="font-bold mr-2 text-gray-800">3.</span>
                          <span><strong>Professional Help Guidelines</strong> (immediate actions)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-bold mr-2 text-gray-800">4.</span>
                          <span><strong>When to Seek Professional Help</strong> (warning signs)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-bold mr-2 text-gray-800">5.</span>
                          <span><strong>Cross-references to other app sections</strong> (visual app navigation cards)</span>
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className={`border-l-4 p-4 rounded-r-lg ${isDarkMode ? 'bg-blue-900 border-blue-400' : 'bg-blue-50 border-blue-500'}`}>
                    <h4 className={`font-bold mb-3 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>Before you begin:</h4>
                    <div className={`space-y-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                      <p>If you haven't already, please consult a qualified doctor or mental health professional to rule out medical causes.</p>
                      <p>Ruqyah is safe to do whether or not you have spiritual affliction, but it should not replace medical treatment.</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className={`border-l-4 pl-6 py-4 pr-4 rounded-r-lg ${isDarkMode ? 'border-green-400 bg-green-900' : 'border-green-500 bg-green-50'}`}>
                      <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-green-200' : 'text-green-900'}`}>1. Safe Self-Testing Options</h2>
                      
                      <div className="space-y-6">
                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-green-800' : 'bg-green-100'}`}>
                          <h5 className={`font-bold mb-3 ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>Option A: Recitation Test</h5>
                          <div className={`space-y-3 ${isDarkMode ? 'text-green-200' : 'text-green-700'}`}>
                            <p>• Sit in a clean place, make wudu if possible, face the qiblah.</p>
                            <p><strong>Read aloud with focus:</strong></p>
                            <ul className="space-y-1 ml-4">
                              <li>- Surah Al-Fatiha (1)</li>
                              <li>- Ayat al-Kursi (2:255)</li>
                              <li>- The last three Quls (each recited 3 times):</li>
                              <li className="ml-4">• Surah Al-Ikhlas (112)</li>
                              <li className="ml-4">• Surah Al-Falaq (113)</li>
                              <li className="ml-4">• Surah An-Nas (114)</li>
                            </ul>
                            <p><strong>Observe for any unusual sensations such as:</strong></p>
                            <ul className="space-y-1 ml-4">
                              <li>- Headaches, pressure, or tingling in the head</li>
                              <li>- Emotional surges like crying, fear, anger without cause</li>
                              <li>- Body jerks, nausea, or urge to stop reading</li>
                            </ul>
                            <p className="italic">No reaction doesn't guarantee absence of affliction.</p>
                            <div className={`mt-3 p-3 rounded italic text-sm ${isDarkMode ? 'bg-green-700 text-green-200' : 'bg-green-200 text-green-800'}`}>
                              <p><strong>Personal Note:</strong> For me this was the key one. I read the Quran on most days, however, at the start of this affliction I stopped reading it every day and for a while stop reading altogether but I didn't think this was due to anything sinister. When I read it my mind would argue against it - I can't repeat the thoughts that used to occur. Again in hindsight, for me, it could not have been clearer that something sinister was happening to me.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-blue-800' : 'bg-blue-100'}`}>
                          <h5 className={`font-bold mb-3 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>Option B: Listening Test</h5>
                          <div className={`space-y-3 ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                            <p>Play a trusted ruqyah recitation quietly through headphones at a comfortable volume.</p>
                            <p><strong>Suggested choices include:</strong></p>
                            <ul className="space-y-1 ml-4">
                              <li>- Full Surah Al-Baqarah (2)</li>
                              <li>- Ayat al-Kursi (2:255) alone</li>
                              <li>- Last two verses of Surah Al-Baqarah (2:285-286)</li>
                              <li>- Surah Al-Falaq (113) and Surah An-Nas (114), three times each</li>
                              <li>- Surah Al-Ikhlas (112)</li>
                            </ul>
                            <p>Notice sudden physical or emotional reactions (anxiety, chest tightness, dizziness).</p>
                            <div className={`mt-3 p-3 rounded italic text-sm ${isDarkMode ? 'bg-blue-700 text-blue-200' : 'bg-blue-200 text-blue-800'}`}>
                              <p><strong>Note:</strong> Surah Al-Baqarah is the longest in the Quran, however, you don't need to wait till the end to notice reactions. Initially you will feel reluctant to even approach the Quran - so many excuses so much procrastination and irritation and even anger.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-purple-800' : 'bg-purple-100'}`}>
                          <h5 className={`font-bold mb-3 ${isDarkMode ? 'text-purple-200' : 'text-purple-800'}`}>Option C: Water Ruqyah Test</h5>
                          <div className={`space-y-3 ${isDarkMode ? 'text-purple-200' : 'text-purple-700'}`}>
                            <p>Recite these verses slowly and clearly over a cup of clean water. Then blow gently once at the end before giving it to drink or drinking it yourself:</p>
                            <ul className="space-y-1 ml-4">
                              <li>- Surah Al-Fatiha (1)</li>
                              <li>- Ayat al-Kursi (2:255)</li>
                              <li>- Surah Al-Ikhlas (112), Al-Falaq (113), An-Nas (114) (3 times each)</li>
                            </ul>
                            <p>Drink some of the water and observe for any unusual nausea, stomach discomfort, or other sensations without medical cause.</p>
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-orange-800' : 'bg-orange-100'}`}>
                          <h5 className={`font-bold mb-3 ${isDarkMode ? 'text-orange-200' : 'text-orange-800'}`}>Option D: Oil Application Test</h5>
                          <div className={`space-y-2 ${isDarkMode ? 'text-orange-200' : 'text-orange-700'}`}>
                            <p>Recite the same verses listed above over olive oil.</p>
                            <p>Rub lightly on forehead, chest, and soles of feet before sleeping.</p>
                            <p>Observe for nightmares, restlessness, or unusual fear.</p>
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-teal-800' : 'bg-teal-100'}`}>
                          <h5 className={`font-bold mb-3 ${isDarkMode ? 'text-teal-200' : 'text-teal-800'}`}>Option E: Dream Observation Test</h5>
                          <div className={`space-y-2 ${isDarkMode ? 'text-teal-200' : 'text-teal-700'}`}>
                            <p>Increase Qur'an recitation and dhikr before sleeping for a few nights.</p>
                            <p>Watch for repeated disturbing dreams involving snakes, falling, or dark figures.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`border-l-4 pl-6 py-4 pr-4 rounded-r-lg ${isDarkMode ? 'border-yellow-400 bg-yellow-900' : 'border-yellow-500 bg-yellow-50'}`}>
                      <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-yellow-200' : 'text-yellow-900'}`}>2. Professional Help Guidelines</h2>
                      <ul className={`space-y-3 ${isDarkMode ? 'text-yellow-200' : 'text-yellow-700'}`}>
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <span>If any of the above tests indicate that sihr is involved, after reading the rest of this page, go to the the Ruqyah Toolkit and click on the Guide icon which will which give instructions on what to do next ( <button 
                            onClick={() => {
                              console.log('🔗 Ruqyah Toolkit link clicked from card:', currentCard)
                              // Capture current scroll position from the book format scroll container
                              const scrollPosition = bookScrollRef.current ? bookScrollRef.current.scrollTop : 0
                              console.log('📍 Capturing scroll position from book container:', scrollPosition)
                              navigateToSection && navigateToSection('ruqyahVerses', { 
                                category: 'diagnosisHelp', 
                                screen: 'cards', 
                                cardIndex: 8,
                                scrollPosition: scrollPosition
                              })
                            }}
                            className="text-blue-600 hover:text-blue-800 underline font-medium"
                          >"Ruqyah Toolkit"</button>).</span>
                        </li>
                        <li className="flex items-start"><span className="mr-2 font-bold">•</span><span>Increase Qur'an recitation and dhikr regularly.</span></li>
                        <li className="flex items-start"><span className="mr-2 font-bold">•</span><span>Maintain physical cleanliness, wudu, and avoid sinful environments.</span></li>
                        <li className="flex items-start"><span className="mr-2 font-bold">•</span><span>Make sincere du'a after each prayer, asking Allah for healing and protection.</span></li>
                        <li className="flex items-start"><span className="mr-2 font-bold">•</span><span>Seek help from a trusted and knowledgeable raqi if symptoms persist or worsen.</span></li>
                      </ul>
                    </div>
                    
                    <div className={`border-l-4 pl-6 py-4 pr-4 rounded-r-lg ${isDarkMode ? 'border-red-400 bg-red-900' : 'border-red-500 bg-red-50'}`}>
                      <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-red-200' : 'text-red-900'}`}>3. When to Seek Professional Help</h2>
                      <div className={`border-l-4 p-4 mb-4 ${isDarkMode ? 'bg-red-800 border-red-400' : 'bg-red-100 border-red-500'}`}>
                        <p className={`font-semibold mb-2 ${isDarkMode ? 'text-red-200' : 'text-red-800'}`}>Warning:</p>
                        <p className={isDarkMode ? 'text-red-200' : 'text-red-700'}>From experience unfortunately the Raqis could actually be black magicians themselves. Please check the RAQI menu item for ways to spot a false raqi who if they are skilled will solve one problem and cause many more so that you keep on going back. Or they will try to get you to commit shirk and/or major sins in return for "curing" you e.g. sacrifice a black chicken whilst saying some incoherent words. IF A "RAQI" AGREES TO SEE A WOMAN NOT RELATED TO HIM ON A ONE TO ONE SESSION OR "NEEDS" TO TOUCH THE WOMEN AT ANY POINT EVEN WITH OTHERS PRESENT BE AWARE HE IS 100% FALSE THOUGH HE MIGHT LOOK OLD AND PIOUS (I came across one who was an Imam at a local mosque and what he did was sheer kufr although he did not see it that way even though he openly claimed he had controlled a jinn like is father and grandfather before him by secluding himself for forty days - now google how a magician conjures up a jinn by this method). And of course asking for a date of birth or mothers name - if anyone ask this it is a sure fire indicator this person is a magician and not a raqi. See further in the RAQI menu item.</p>
                      </div>
                      <ul className={`space-y-3 ${isDarkMode ? 'text-red-200' : 'text-red-700'}`}>
                        <li className="flex items-start"><span className="mr-2 font-bold">•</span><span>If symptoms are severe, worsening, or affecting daily life (sleep, relationships, work).</span></li>
                        <li className="flex items-start"><span className="mr-2 font-bold">•</span><span>If you experience thoughts of self-harm or harming others.</span></li>
                        <li className="flex items-start"><span className="mr-2 font-bold">•</span><span>If you cannot consistently perform ruqyah or maintain your routine.</span></li>
                        <li className="flex items-start"><span className="mr-2 font-bold">•</span><span>If family or relationships are seriously strained.</span></li>
                        <li className="flex items-start"><span className="mr-2 font-bold">•</span><span>For guidance on choosing a trustworthy and knowledgeable raqi, see the "Raqi" section of this app.</span></li>
                      </ul>
                    </div>
                    
                    <div className={`border-l-4 pl-6 py-4 pr-4 rounded-r-lg ${isDarkMode ? 'border-gray-400 bg-gray-800' : 'border-gray-500 bg-gray-50'}`}>
                      <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>4. Cross-references to other app sections</h2>
                      <div className={`space-y-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <button
                          onClick={() => {
                            const scrollPosition = bookScrollRef.current ? bookScrollRef.current.scrollTop : 0
                            console.log('📍 Cross-ref button clicked, capturing scroll position from book:', scrollPosition)
                            navigateToSection && navigateToSection('ruqyahVerses', { 
                              category: 'diagnosisHelp', 
                              screen: 'cards', 
                              cardIndex: 8,
                              scrollPosition: scrollPosition
                            })
                          }}
                          className={`w-full text-left p-3 rounded border-l-4 transition-colors duration-200 ${isDarkMode ? 'bg-gray-700 border-blue-400 hover:bg-blue-800 text-gray-200' : 'bg-white border-blue-400 hover:bg-blue-50'}`}
                        >
                          <h5 className={`font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>Ruqyah Toolkit</h5>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Essential daily protection verses for regular practice</p>
                        </button>
                        <div className={`w-full p-3 rounded border-l-4 border-purple-400 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                          <h5 className={`font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>Sihr/Magic</h5>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>For a detailed explanation of the different types of sihr and how they are carried out</p>
                        </div>
                        <div className={`w-full p-3 rounded border-l-4 border-green-400 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                          <h5 className={`font-semibold ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>Raqi</h5>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>For guidance on choosing a trustworthy and knowledgeable ruqyah practitioner</p>
                        </div>
                      </div>
                      
                      {hasReturnPath && (
                        <div className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                          <button
                            onClick={() => navigateBack && navigateBack()}
                            className={`px-4 py-2 rounded-lg transition-colors duration-200 text-white ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
                          >
                            ← Return to Previous Section
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Regular card rendering for all other cards
    return (
      <div 
        ref={cardContentRef} 
        className={`text-center p-3 sm:p-4 md:p-6 overflow-y-auto h-full w-full ${
          isDarkMode ? 'ruqyah-dark-mode' : ''
        }`} 
        style={{ 
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth'
        }}
      >
        <h2 className={`text-base sm:text-lg md:text-xl font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}
            dangerouslySetInnerHTML={{ __html: card.title }} />
        
        {shouldShowNotePill(card) && (
          <div className="flex justify-center mb-4 sm:mb-6">
            <button 
              onClick={() => setShowNotePopup(true)}
              className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors opacity-70 ${isDarkMode ? 'bg-blue-700 text-blue-200 hover:bg-blue-600' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
            >
              Note
            </button>
          </div>
        )}
        
        <div 
          className="arabic-text text-xl sm:text-2xl md:text-3xl"
          dangerouslySetInnerHTML={{ __html: card.content }} 
        />
        
        {/* Translation visibility styles for Ruqyah decks */}
        {(categoryTitle === 'Manzil' || categoryTitle === 'Prophetic Ruqyah' || categoryTitle === 'Ruqyah Plus') && !showTranslations && (
          <style>{`
            .text-gray-600.italic,
            .text-base.text-gray-700:not(.font-semibold):not(.font-bold) {
              display: none !important;
            }
          `}</style>
        )}
        
        {/* Dark mode styles for all categories */}
        {isDarkMode && (
          <style>{`
            .ruqyah-dark-mode {
              background: linear-gradient(135deg, rgb(17, 24, 39) 0%, rgb(30, 58, 138) 100%) !important;
              color: rgb(243, 244, 246) !important;
            }
            .ruqyah-dark-mode h2,
            .ruqyah-dark-mode h3,
            .ruqyah-dark-mode h4 {
              color: rgb(243, 244, 246) !important;
            }
            .ruqyah-dark-mode p {
              color: rgb(209, 213, 219) !important;
            }
            .ruqyah-dark-mode .arabic-text {
              color: rgb(243, 244, 246) !important;
            }
            
            /* Override all hardcoded text colors */
            .ruqyah-dark-mode .text-gray-600,
            .ruqyah-dark-mode .text-gray-700,
            .ruqyah-dark-mode .text-gray-800,
            .ruqyah-dark-mode .text-gray-900 {
              color: rgb(255, 255, 255) !important;
            }
            .ruqyah-dark-mode .text-amber-800,
            .ruqyah-dark-mode .text-amber-900 {
              color: rgb(251, 191, 36) !important;
            }
            .ruqyah-dark-mode .text-blue-800,
            .ruqyah-dark-mode .text-blue-900 {
              color: rgb(147, 197, 253) !important;
            }
            .ruqyah-dark-mode .text-green-800,
            .ruqyah-dark-mode .text-green-900 {
              color: rgb(134, 239, 172) !important;
            }
            .ruqyah-dark-mode .text-purple-800,
            .ruqyah-dark-mode .text-purple-900 {
              color: rgb(196, 181, 253) !important;
            }
            .ruqyah-dark-mode .text-yellow-800,
            .ruqyah-dark-mode .text-yellow-900 {
              color: rgb(254, 240, 138) !important;
            }
            .ruqyah-dark-mode .text-indigo-800,
            .ruqyah-dark-mode .text-indigo-900 {
              color: rgb(165, 180, 252) !important;
            }
            
            /* Remove bullet points from paragraphs in colored boxes */
            .bg-green-50 p,
            .bg-orange-50 p,
            .bg-blue-50 p,
            .bg-yellow-50 p {
              list-style: none !important;
              list-style-type: none !important;
            }
            
            /* Enhanced text visibility in light background containers */
            .ruqyah-dark-mode .bg-orange-50 p,
            .ruqyah-dark-mode .bg-orange-50 h4,
            .ruqyah-dark-mode .bg-orange-50 span {
              color: rgb(255, 255, 255) !important;
            }
            .ruqyah-dark-mode .bg-blue-50 p,
            .ruqyah-dark-mode .bg-blue-50 h4,
            .ruqyah-dark-mode .bg-blue-50 span {
              color: rgb(255, 255, 255) !important;
            }
            .ruqyah-dark-mode .bg-green-50 p,
            .ruqyah-dark-mode .bg-green-50 h4,
            .ruqyah-dark-mode .bg-green-50 span {
              color: rgb(255, 255, 255) !important;
            }
            .ruqyah-dark-mode .bg-purple-50 p,
            .ruqyah-dark-mode .bg-purple-50 h4,
            .ruqyah-dark-mode .bg-purple-50 span {
              color: rgb(255, 255, 255) !important;
            }
            .ruqyah-dark-mode .bg-yellow-50 p,
            .ruqyah-dark-mode .bg-yellow-50 h4,
            .ruqyah-dark-mode .bg-yellow-50 span {
              color: rgb(255, 255, 255) !important;
            }
            .ruqyah-dark-mode .bg-indigo-50 p,
            .ruqyah-dark-mode .bg-indigo-50 h4,
            .ruqyah-dark-mode .bg-indigo-50 span {
              color: rgb(255, 255, 255) !important;
            }
            .ruqyah-dark-mode .bg-red-50 p,
            .ruqyah-dark-mode .bg-red-50 h4,
            .ruqyah-dark-mode .bg-red-50 span {
              color: rgb(255, 255, 255) !important;
            }
            .ruqyah-dark-mode .bg-teal-50 p,
            .ruqyah-dark-mode .bg-teal-50 h4,
            .ruqyah-dark-mode .bg-teal-50 span {
              color: rgb(255, 255, 255) !important;
            }
            
            /* Override all hardcoded background colors */
            .ruqyah-dark-mode .bg-white {
              background: rgba(55, 65, 81, 0.3) !important;
            }
            .ruqyah-dark-mode .bg-gray-50 {
              background: rgba(55, 65, 81, 0.3) !important;
            }
            .ruqyah-dark-mode .bg-amber-50 {
              background: rgba(120, 53, 15, 0.3) !important;
            }
            .ruqyah-dark-mode .bg-blue-50 {
              background: rgba(30, 58, 138, 0.3) !important;
            }
            .ruqyah-dark-mode .bg-green-50 {
              background: rgba(20, 83, 45, 0.3) !important;
            }
            .ruqyah-dark-mode .bg-purple-50 {
              background: rgba(76, 29, 149, 0.3) !important;
            }
            .ruqyah-dark-mode .bg-yellow-50 {
              background: rgba(133, 77, 14, 0.3) !important;
            }
            .ruqyah-dark-mode .bg-indigo-50 {
              background: rgba(49, 46, 129, 0.3) !important;
            }
            .ruqyah-dark-mode .bg-orange-50 {
              background: rgba(154, 52, 18, 0.3) !important;
            }
            .ruqyah-dark-mode .bg-red-50 {
              background: rgba(153, 27, 27, 0.3) !important;
            }
            .ruqyah-dark-mode .bg-teal-50 {
              background: rgba(17, 94, 89, 0.3) !important;
            }
            .ruqyah-dark-mode .bg-gradient-to-r {
              background: linear-gradient(135deg, rgb(55, 65, 81) 0%, rgb(59, 130, 246) 100%) !important;
            }
            
            /* Override all hardcoded border colors */
            .ruqyah-dark-mode .border-amber-300,
            .ruqyah-dark-mode .border-amber-400 {
              border-color: rgba(251, 191, 36, 0.5) !important;
            }
            .ruqyah-dark-mode .border-blue-300,
            .ruqyah-dark-mode .border-blue-400 {
              border-color: rgba(147, 197, 253, 0.5) !important;
            }
            .ruqyah-dark-mode .border-green-300,
            .ruqyah-dark-mode .border-green-400 {
              border-color: rgba(134, 239, 172, 0.5) !important;
            }
            .ruqyah-dark-mode .border-purple-300,
            .ruqyah-dark-mode .border-purple-400 {
              border-color: rgba(196, 181, 253, 0.5) !important;
            }
            .ruqyah-dark-mode .border-yellow-300,
            .ruqyah-dark-mode .border-yellow-400 {
              border-color: rgba(254, 240, 138, 0.5) !important;
            }
            .ruqyah-dark-mode .border-indigo-300,
            .ruqyah-dark-mode .border-indigo-400 {
              border-color: rgba(165, 180, 252, 0.5) !important;
            }
            
            /* Enhanced shadow for dark mode */
            .ruqyah-dark-mode .shadow-lg {
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1) !important;
            }
          `}</style>
        )}
      </div>
    )
  }

  const currentCardData = cards[currentCard - 1]

  // Determine if counting should be shown (only for ruqyah verse decks)
  const shouldShowCounting = categoryTitle === 'Short Ruqyah' || categoryTitle === 'Complete Ruqyah Verses' || categoryTitle === 'Manzil'

  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center p-4" style={{ touchAction: 'none' }}>
      
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
          <h1 className={`font-bold text-xl sm:text-2xl ${isDarkMode ? 'text-gray-100' : 'text-white'}`}>
            {categoryTitle}
          </h1>
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
                      ? isDarkMode ? 'bg-blue-400 text-gray-900 font-semibold' : 'bg-yellow-400 text-gray-800 font-semibold'
                      : isDarkMode ? 'bg-gray-700/50 text-gray-200 hover:bg-gray-600/60' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Audio controls and dark mode toggle - positioned outside card */}
        <div className="flex justify-center items-center gap-6 mb-2">
          {/* Audio controls */}
          {currentCardData && currentCardData.audioFile && (
            <>
              {/* Play/Pause button */}
              <button
                onClick={toggleAudio}
                className={`rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 shadow-lg ${
                  isPlaying 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-white/30 hover:bg-white/40 text-white'
                }`}
                title={isPlaying ? "Pause audio" : "Play audio"}
              >
                {isPlaying ? <span style={{fontSize: '0.5em'}}>||</span> : '▶'}
              </button>
              
              {/* Auto-continue toggle */}
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className={`rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 shadow-lg ${
                  autoPlay 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-white/30 hover:bg-white/40 text-white'
                }`}
                title={autoPlay ? "Auto-continue ON" : "Auto-continue OFF"}
              >
                ↻
              </button>
            </>
          )}
          
        </div>

        {/* Card display */}
        <div 
          ref={cardContainerRef}
          className="relative w-full min-h-[600px] max-h-[85vh] rounded-lg shadow-xl overflow-hidden select-none"
        >
          {/* Current Card */}
          <div 
            className={`absolute inset-0 w-full h-full flex items-center justify-center transition-transform duration-300 ease-out ${
              !isAnimating ? 'translate-x-0' : 
              slideDirection === 'left' ? '-translate-x-full' : 'translate-x-full'
            } ${
              isDarkMode ? 'bg-gradient-to-br from-gray-900 to-blue-900' : 'bg-gray-100'
            }`}
            style={categoryTitle === 'Manzil' && isDarkMode ? {
              '--text-color': 'white',
              '--bg-color': 'transparent'
            } : {}}
          >
            {/* Card counter badge */}
            <div className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-medium z-10 ${isDarkMode ? 'bg-gray-700/60 text-gray-200' : 'bg-gray-800/20 text-white'}`}>
              {currentCard} / {cards.length}
            </div>
            
            {/* Left Click Zone - Always functional */}
            {currentCard > 1 && (
              <div 
                className="absolute left-0 top-0 w-[15%] h-full flex items-center justify-start pl-4 cursor-pointer z-10"
                onClick={prevCard}
              >
                {/* Visible Arrow - Desktop only */}
                <div className={`hidden md:flex rounded-full w-12 h-12 items-center justify-center backdrop-blur-sm opacity-40 hover:opacity-70 transition-opacity duration-200 ${isDarkMode ? 'bg-gray-600/50' : 'bg-gray-800/40'}`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              </div>
            )}
            {/* Right Click Zone - Always functional */}
            {currentCard < cards.length && (
              <div 
                className="absolute right-0 top-0 w-[15%] h-full flex items-center justify-end pr-4 cursor-pointer z-10"
                onClick={nextCard}
              >
                {/* Visible Arrow - Desktop only */}
                <div className={`hidden md:flex rounded-full w-12 h-12 items-center justify-center backdrop-blur-sm opacity-40 hover:opacity-70 transition-opacity duration-200 ${isDarkMode ? 'bg-gray-600/50' : 'bg-gray-800/40'}`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            )}

            
            {renderCardContent(currentCardData)}
          </div>

          {/* Next Card (only visible during animation) */}
          {isAnimating && (
            <div 
              className={`absolute inset-0 w-full h-full flex items-center justify-center transition-transform duration-300 ease-out ${
                isDarkMode ? 'bg-gradient-to-br from-gray-900 to-blue-900' : 'bg-gray-100'
              }`}
              style={{
                transform: slideDirection === 'left' ? 
                  'translateX(0%)' : 'translateX(0%)',
                left: slideDirection === 'left' ? '-100%' : '100%'
              }}
            >
              {/* Card counter badge for next card */}
              <div className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-medium z-10 ${isDarkMode ? 'bg-gray-700/60 text-gray-200' : 'bg-gray-800/20 text-white'}`}>
                {nextCardIndex} / {cards.length}
              </div>
              
              {/* Left Click Zone for next card - Always functional */}
              {nextCardIndex > 1 && (
                <div 
                  className="absolute left-0 top-0 w-[15%] h-full flex items-center justify-start pl-4 cursor-pointer z-10"
                  onClick={prevCard}
                >
                  {/* Visible Arrow - Desktop only */}
                  <div className={`hidden md:flex rounded-full w-12 h-12 items-center justify-center backdrop-blur-sm opacity-40 hover:opacity-70 transition-opacity duration-200 ${isDarkMode ? 'bg-gray-600/50' : 'bg-gray-800/40'}`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                </div>
              )}
              {/* Right Click Zone for next card - Always functional */}
              {nextCardIndex < cards.length && (
                <div 
                  className="absolute right-0 top-0 w-[15%] h-full flex items-center justify-end pr-4 cursor-pointer z-10"
                  onClick={nextCard}
                >
                  {/* Visible Arrow - Desktop only */}
                  <div className={`hidden md:flex rounded-full w-12 h-12 items-center justify-center backdrop-blur-sm opacity-40 hover:opacity-70 transition-opacity duration-200 ${isDarkMode ? 'bg-gray-600/50' : 'bg-gray-800/40'}`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}

              <div 
                className={`text-center p-3 sm:p-4 md:p-6 overflow-y-auto h-full w-full ${
                  isDarkMode ? 'ruqyah-dark-mode' : ''
                }`} 
                style={{
                  scrollTop: 0, 
                  overscrollBehavior: 'contain',
                  WebkitOverflowScrolling: 'touch',
                  scrollBehavior: 'smooth'
                }}
              >
                {cards[nextCardIndex - 1] && (
                  <>
                    <h2 className={`text-base sm:text-lg md:text-xl font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}
                        dangerouslySetInnerHTML={{ __html: cards[nextCardIndex - 1].title }} />
                    
                    {shouldShowNotePill(cards[nextCardIndex - 1]) && (
                      <div className="flex justify-center mb-4 sm:mb-6">
                        <button 
                          onClick={() => setShowNotePopup(true)}
                          className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors opacity-70 ${isDarkMode ? 'bg-blue-700 text-blue-200 hover:bg-blue-600' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                        >
                          Note
                        </button>
                      </div>
                    )}
                    
                    <div 
                      className="arabic-text text-xl sm:text-2xl md:text-3xl"
                      dangerouslySetInnerHTML={{ __html: cards[nextCardIndex - 1].content }} 
                    />
                    
                    {/* Dark mode styles for animated card */}
                    {isDarkMode && (
                      <style>{`
                        .ruqyah-dark-mode {
                          background: linear-gradient(135deg, rgb(17, 24, 39) 0%, rgb(30, 58, 138) 100%) !important;
                          color: rgb(243, 244, 246) !important;
                        }
                        .ruqyah-dark-mode h2,
                        .ruqyah-dark-mode h3,
                        .ruqyah-dark-mode h4 {
                          color: rgb(243, 244, 246) !important;
                        }
                        .ruqyah-dark-mode p {
                          color: rgb(209, 213, 219) !important;
                        }
                        .ruqyah-dark-mode .arabic-text {
                          color: rgb(243, 244, 246) !important;
                        }
                        
                        /* Override all hardcoded text colors */
                        .ruqyah-dark-mode .text-gray-600,
                        .ruqyah-dark-mode .text-gray-700,
                        .ruqyah-dark-mode .text-gray-800,
                        .ruqyah-dark-mode .text-gray-900 {
                          color: rgb(255, 255, 255) !important;
                        }
                        .ruqyah-dark-mode .text-amber-800,
                        .ruqyah-dark-mode .text-amber-900 {
                          color: rgb(251, 191, 36) !important;
                        }
                        .ruqyah-dark-mode .text-blue-800,
                        .ruqyah-dark-mode .text-blue-900 {
                          color: rgb(147, 197, 253) !important;
                        }
                        .ruqyah-dark-mode .text-green-800,
                        .ruqyah-dark-mode .text-green-900 {
                          color: rgb(134, 239, 172) !important;
                        }
                        .ruqyah-dark-mode .text-purple-800,
                        .ruqyah-dark-mode .text-purple-900 {
                          color: rgb(196, 181, 253) !important;
                        }
                        .ruqyah-dark-mode .text-yellow-800,
                        .ruqyah-dark-mode .text-yellow-900 {
                          color: rgb(254, 240, 138) !important;
                        }
                        .ruqyah-dark-mode .text-indigo-800,
                        .ruqyah-dark-mode .text-indigo-900 {
                          color: rgb(165, 180, 252) !important;
                        }
                        
                        /* Enhanced text visibility in light background containers */
                        .ruqyah-dark-mode .bg-orange-50 p,
                        .ruqyah-dark-mode .bg-orange-50 h4,
                        .ruqyah-dark-mode .bg-orange-50 span {
                          color: rgb(255, 255, 255) !important;
                        }
                        .ruqyah-dark-mode .bg-blue-50 p,
                        .ruqyah-dark-mode .bg-blue-50 h4,
                        .ruqyah-dark-mode .bg-blue-50 span {
                          color: rgb(255, 255, 255) !important;
                        }
                        .ruqyah-dark-mode .bg-green-50 p,
                        .ruqyah-dark-mode .bg-green-50 h4,
                        .ruqyah-dark-mode .bg-green-50 span {
                          color: rgb(255, 255, 255) !important;
                        }
                        .ruqyah-dark-mode .bg-purple-50 p,
                        .ruqyah-dark-mode .bg-purple-50 h4,
                        .ruqyah-dark-mode .bg-purple-50 span {
                          color: rgb(255, 255, 255) !important;
                        }
                        .ruqyah-dark-mode .bg-yellow-50 p,
                        .ruqyah-dark-mode .bg-yellow-50 h4,
                        .ruqyah-dark-mode .bg-yellow-50 span {
                          color: rgb(255, 255, 255) !important;
                        }
                        .ruqyah-dark-mode .bg-indigo-50 p,
                        .ruqyah-dark-mode .bg-indigo-50 h4,
                        .ruqyah-dark-mode .bg-indigo-50 span {
                          color: rgb(255, 255, 255) !important;
                        }
                        .ruqyah-dark-mode .bg-red-50 p,
                        .ruqyah-dark-mode .bg-red-50 h4,
                        .ruqyah-dark-mode .bg-red-50 span {
                          color: rgb(255, 255, 255) !important;
                        }
                        .ruqyah-dark-mode .bg-teal-50 p,
                        .ruqyah-dark-mode .bg-teal-50 h4,
                        .ruqyah-dark-mode .bg-teal-50 span {
                          color: rgb(255, 255, 255) !important;
                        }
                        
                        /* Override all hardcoded background colors */
                        .ruqyah-dark-mode .bg-white {
                          background: rgba(55, 65, 81, 0.3) !important;
                        }
                        .ruqyah-dark-mode .bg-gray-50 {
                          background: rgba(55, 65, 81, 0.3) !important;
                        }
                        .ruqyah-dark-mode .bg-amber-50 {
                          background: rgba(120, 53, 15, 0.3) !important;
                        }
                        .ruqyah-dark-mode .bg-blue-50 {
                          background: rgba(30, 58, 138, 0.3) !important;
                        }
                        .ruqyah-dark-mode .bg-green-50 {
                          background: rgba(20, 83, 45, 0.3) !important;
                        }
                        .ruqyah-dark-mode .bg-purple-50 {
                          background: rgba(76, 29, 149, 0.3) !important;
                        }
                        .ruqyah-dark-mode .bg-yellow-50 {
                          background: rgba(133, 77, 14, 0.3) !important;
                        }
                        .ruqyah-dark-mode .bg-indigo-50 {
                          background: rgba(49, 46, 129, 0.3) !important;
                        }
                        .ruqyah-dark-mode .bg-orange-50 {
                          background: rgba(154, 52, 18, 0.3) !important;
                        }
                        .ruqyah-dark-mode .bg-red-50 {
                          background: rgba(153, 27, 27, 0.3) !important;
                        }
                        .ruqyah-dark-mode .bg-teal-50 {
                          background: rgba(17, 94, 89, 0.3) !important;
                        }
                        .ruqyah-dark-mode .bg-gradient-to-r {
                          background: linear-gradient(135deg, rgb(55, 65, 81) 0%, rgb(59, 130, 246) 100%) !important;
                        }
                        
                        /* Override all hardcoded border colors */
                        .ruqyah-dark-mode .border-amber-300,
                        .ruqyah-dark-mode .border-amber-400 {
                          border-color: rgba(251, 191, 36, 0.5) !important;
                        }
                        .ruqyah-dark-mode .border-blue-300,
                        .ruqyah-dark-mode .border-blue-400 {
                          border-color: rgba(147, 197, 253, 0.5) !important;
                        }
                        .ruqyah-dark-mode .border-green-300,
                        .ruqyah-dark-mode .border-green-400 {
                          border-color: rgba(134, 239, 172, 0.5) !important;
                        }
                        .ruqyah-dark-mode .border-purple-300,
                        .ruqyah-dark-mode .border-purple-400 {
                          border-color: rgba(196, 181, 253, 0.5) !important;
                        }
                        .ruqyah-dark-mode .border-yellow-300,
                        .ruqyah-dark-mode .border-yellow-400 {
                          border-color: rgba(254, 240, 138, 0.5) !important;
                        }
                        .ruqyah-dark-mode .border-indigo-300,
                        .ruqyah-dark-mode .border-indigo-400 {
                          border-color: rgba(165, 180, 252, 0.5) !important;
                        }
                        
                        /* Enhanced shadow for dark mode */
                        .ruqyah-dark-mode .shadow-lg {
                          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1) !important;
                        }
                      `}</style>
                    )}
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
          onBack={handleBackWithAudioStop}
          count={getCurrentCount()}
          onIncrement={incrementCount}
          onClear={clearCount}
          showCounting={shouldShowCounting}
        />
        
        {/* Note Popup Modal */}
        {showNotePopup && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50" onClick={() => setShowNotePopup(false)}>
            <div className={`rounded-lg p-6 m-4 max-w-sm w-full shadow-lg ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Note</h3>
                <button 
                  onClick={() => setShowNotePopup(false)}
                  className={`transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                The Qur'an must be recited in Arabic but the following du'as can be recited in Arabic or in your own language.
              </p>
            </div>
          </div>
        )}
        
        {/* Fixed scroll indicator - changes direction based on position */}
        {!isFullPageVisible && (
          <button 
            onClick={isAtTop ? scrollToBottom : () => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
              handleScrollToTop()
            }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-30 bg-white/15 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg touch-manipulation hover:bg-white/25 transition-all duration-200"
            title={isAtTop ? "Scroll to bottom" : "Scroll to top"}
          >
            {isAtTop ? '↓' : '↑'}
          </button>
        )}
      </div>
    </div>
  )
})

export default CardViewer
