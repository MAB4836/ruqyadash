import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import Navigation from './Navigation'
import { KeepAwake } from '@capacitor-community/keep-awake'

const CardViewer = forwardRef(({ cards, categoryTitle, onBack, navigateToSection, navigateBack, hasReturnPath }, ref) => {
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
  
  // Swipe gesture state
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [isSwipping, setIsSwipping] = useState(false)
  
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
  useEffect(() => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
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

  // Audio control functions
  const playAudio = (audioFile) => {
    if (currentAudio) {
      currentAudio.pause()
    }
    
    const audio = new Audio(`/audio/${audioFile}`)
    audioRef.current = audio
    setCurrentAudio(audio)
    
    audio.play()
    setIsPlaying(true)
    keepScreenOn()
    
    audio.onended = () => {
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
    
    audio.onerror = () => {
      setIsPlaying(false)
      setCurrentAudio(null)
      allowScreenOff()
      console.error('Error loading audio file:', audioFile)
    }
  }
  
  const toggleAudio = () => {
    const currentCardData = cards[currentCard - 1]
    if (!currentCardData || !currentCardData.audioFile) return
    
    if (isPlaying && currentAudio) {
      currentAudio.pause()
      setIsPlaying(false)
      allowScreenOff()
    } else if (currentAudio && currentAudio.paused) {
      currentAudio.play()
      setIsPlaying(true)
      keepScreenOn()
    } else {
      playAudio(currentCardData.audioFile)
    }
  }
  
  // Auto-continue helper function
  const autoAdvanceToNextCard = () => {
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
  }

  // Handle audio when card changes
  useEffect(() => {
    if (currentAudio && !isAnimating) {
      // Stop current audio when changing cards manually
      currentAudio.pause()
      setIsPlaying(false)
      setCurrentAudio(null)
      allowScreenOff()
    }
  }, [currentCard])
  
  // Auto-play audio for new card in auto-continue mode
  useEffect(() => {
    if (autoPlay && !isAnimating && !isPlaying) {
      const currentCardData = cards[currentCard - 1]
      if (currentCardData && currentCardData.audioFile) {
        setTimeout(() => {
          playAudio(currentCardData.audioFile)
        }, 200)
      }
    }
  }, [currentCard, autoPlay, isAnimating])

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

    // Special book page rendering for card 8 of "Diagnosis and Help"
    if (categoryTitle === 'Diagnosis and Help' && currentCard === 8) {
      return (
        <div className="absolute inset-0 bg-white">
          <div ref={bookScrollRef} className="h-full overflow-y-auto p-4" style={{ overscrollBehavior: 'contain' }}>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
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

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <h4 className="font-bold text-blue-800 mb-3">Before you begin:</h4>
                    <div className="text-blue-700 space-y-2">
                      <p>If you haven't already, please consult a qualified doctor or mental health professional to rule out medical causes.</p>
                      <p>Ruqyah is safe to do whether or not you have spiritual affliction, but it should not replace medical treatment.</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="border-l-4 border-green-500 pl-6 bg-green-50 py-4 pr-4 rounded-r-lg">
                      <h2 className="text-lg font-bold text-green-900 mb-4">1. Safe Self-Testing Options</h2>
                      
                      <div className="space-y-6">
                        <div className="bg-green-100 p-4 rounded-lg">
                          <h5 className="font-bold text-green-800 mb-3">Option A: Recitation Test</h5>
                          <div className="text-green-700 space-y-3">
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
                            <div className="mt-3 p-3 bg-green-200 rounded italic text-green-800 text-sm">
                              <p><strong>Personal Note:</strong> For me this was the key one. I read the Quran on most days, however, at the start of this affliction I stopped reading it every day and for a while stop reading altogether but I didn't think this was due to anything sinister. When I read it my mind would argue against it - I can't repeat the thoughts that used to occur. Again in hindsight, for me, it could not have been clearer that something sinister was happening to me.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-blue-100 p-4 rounded-lg">
                          <h5 className="font-bold text-blue-800 mb-3">Option B: Listening Test</h5>
                          <div className="text-blue-700 space-y-3">
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
                            <div className="mt-3 p-3 bg-blue-200 rounded italic text-blue-800 text-sm">
                              <p><strong>Note:</strong> Surah Al-Baqarah is the longest in the Quran, however, you don't need to wait till the end to notice reactions. Initially you will feel reluctant to even approach the Quran - so many excuses so much procrastination and irritation and even anger.</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-purple-100 p-4 rounded-lg">
                          <h5 className="font-bold text-purple-800 mb-3">Option C: Water Ruqyah Test</h5>
                          <div className="text-purple-700 space-y-3">
                            <p>Recite these verses slowly and clearly over a cup of clean water. Then blow gently once at the end before giving it to drink or drinking it yourself:</p>
                            <ul className="space-y-1 ml-4">
                              <li>- Surah Al-Fatiha (1)</li>
                              <li>- Ayat al-Kursi (2:255)</li>
                              <li>- Surah Al-Ikhlas (112), Al-Falaq (113), An-Nas (114) (3 times each)</li>
                            </ul>
                            <p>Drink some of the water and observe for any unusual nausea, stomach discomfort, or other sensations without medical cause.</p>
                          </div>
                        </div>
                        
                        <div className="bg-orange-100 p-4 rounded-lg">
                          <h5 className="font-bold text-orange-800 mb-3">Option D: Oil Application Test</h5>
                          <div className="text-orange-700 space-y-2">
                            <p>Recite the same verses listed above over olive oil.</p>
                            <p>Rub lightly on forehead, chest, and soles of feet before sleeping.</p>
                            <p>Observe for nightmares, restlessness, or unusual fear.</p>
                          </div>
                        </div>
                        
                        <div className="bg-teal-100 p-4 rounded-lg">
                          <h5 className="font-bold text-teal-800 mb-3">Option E: Dream Observation Test</h5>
                          <div className="text-teal-700 space-y-2">
                            <p>Increase Qur'an recitation and dhikr before sleeping for a few nights.</p>
                            <p>Watch for repeated disturbing dreams involving snakes, falling, or dark figures.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-l-4 border-yellow-500 pl-6 bg-yellow-50 py-4 pr-4 rounded-r-lg">
                      <h2 className="text-lg font-bold text-yellow-900 mb-4">2. Professional Help Guidelines</h2>
                      <ul className="space-y-3 text-yellow-700">
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
                    
                    <div className="border-l-4 border-red-500 pl-6 bg-red-50 py-4 pr-4 rounded-r-lg">
                      <h2 className="text-lg font-bold text-red-900 mb-4">3. When to Seek Professional Help</h2>
                      <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
                        <p className="text-red-800 font-semibold mb-2">Warning:</p>
                        <p className="text-red-700">From experience unfortunately the Raqis could actually be black magicians themselves. Please check the RAQI menu item for ways to spot a false raqi who if they are skilled will solve one problem and cause many more so that you keep on going back. Or they will try to get you to commit shirk and/or major sins in return for "curing" you e.g. sacrifice a black chicken whilst saying some incoherent words. IF A "RAQI" AGREES TO SEE A WOMAN NOT RELATED TO HIM ON A ONE TO ONE SESSION OR "NEEDS" TO TOUCH THE WOMEN AT ANY POINT EVEN WITH OTHERS PRESENT BE AWARE HE IS 100% FALSE THOUGH HE MIGHT LOOK OLD AND PIOUS (I came across one who was an Imam at a local mosque and what he did was sheer kufr although he did not see it that way even though he openly claimed he had controlled a jinn like is father and grandfather before him by secluding himself for forty days - now google how a magician conjures up a jinn by this method). And of course asking for a date of birth or mothers name - if anyone ask this it is a sure fire indicator this person is a magician and not a raqi. See further in the RAQI menu item.</p>
                      </div>
                      <ul className="space-y-3 text-red-700">
                        <li className="flex items-start"><span className="mr-2 font-bold">•</span><span>If symptoms are severe, worsening, or affecting daily life (sleep, relationships, work).</span></li>
                        <li className="flex items-start"><span className="mr-2 font-bold">•</span><span>If you experience thoughts of self-harm or harming others.</span></li>
                        <li className="flex items-start"><span className="mr-2 font-bold">•</span><span>If you cannot consistently perform ruqyah or maintain your routine.</span></li>
                        <li className="flex items-start"><span className="mr-2 font-bold">•</span><span>If family or relationships are seriously strained.</span></li>
                        <li className="flex items-start"><span className="mr-2 font-bold">•</span><span>For guidance on choosing a trustworthy and knowledgeable raqi, see the "Raqi" section of this app.</span></li>
                      </ul>
                    </div>
                    
                    <div className="border-l-4 border-gray-500 pl-6 bg-gray-50 py-4 pr-4 rounded-r-lg">
                      <h2 className="text-lg font-bold text-gray-900 mb-4">4. Cross-references to other app sections</h2>
                      <div className="space-y-3 text-gray-700">
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
                          className="w-full text-left bg-white p-3 rounded border-l-4 border-blue-400 hover:bg-blue-50 transition-colors duration-200"
                        >
                          <h5 className="font-semibold text-blue-800">Ruqyah Toolkit</h5>
                          <p className="text-gray-600 text-sm">Essential daily protection verses for regular practice</p>
                        </button>
                        <div className="w-full bg-white p-3 rounded border-l-4 border-purple-400">
                          <h5 className="font-semibold text-purple-800">Sihr/Magic</h5>
                          <p className="text-gray-600 text-sm">For a detailed explanation of the different types of sihr and how they are carried out</p>
                        </div>
                        <div className="w-full bg-white p-3 rounded border-l-4 border-green-400">
                          <h5 className="font-semibold text-green-800">Raqi</h5>
                          <p className="text-gray-600 text-sm">For guidance on choosing a trustworthy and knowledgeable ruqyah practitioner</p>
                        </div>
                      </div>
                      
                      {hasReturnPath && (
                        <div className="mt-6 pt-4 border-t border-gray-300">
                          <button
                            onClick={() => navigateBack && navigateBack()}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
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
      <div ref={cardContentRef} className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full" style={{ overscrollBehavior: 'contain' }}>
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2"
            dangerouslySetInnerHTML={{ __html: card.title }} />
        
        {shouldShowNotePill(card) && (
          <div className="flex justify-center mb-4 sm:mb-6">
            <button 
              onClick={() => setShowNotePopup(true)}
              className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full hover:bg-blue-200 transition-colors opacity-70"
            >
              Note
            </button>
          </div>
        )}
        
        <div dangerouslySetInnerHTML={{ __html: card.content }} />
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

        {/* Audio controls - positioned outside card */}
        {currentCardData && currentCardData.audioFile && (
          <div className="flex justify-center items-center gap-6 mb-2">
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
            
            {/* Left Click Zone - Always functional */}
            {currentCard > 1 && (
              <div 
                className="absolute left-0 top-0 w-1/4 h-full flex items-center justify-start pl-4 cursor-pointer z-10"
                onClick={prevCard}
              >
                {/* Visible Arrow - Desktop only */}
                <div className="hidden md:flex bg-black/20 rounded-full w-12 h-12 items-center justify-center backdrop-blur-sm opacity-30 hover:opacity-60 transition-opacity duration-200">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              </div>
            )}
            {/* Right Click Zone - Always functional */}
            {currentCard < cards.length && (
              <div 
                className="absolute right-0 top-0 w-1/4 h-full flex items-center justify-end pr-4 cursor-pointer z-10"
                onClick={nextCard}
              >
                {/* Visible Arrow - Desktop only */}
                <div className="hidden md:flex bg-black/20 rounded-full w-12 h-12 items-center justify-center backdrop-blur-sm opacity-30 hover:opacity-60 transition-opacity duration-200">
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
              
              {/* Left Click Zone for next card - Always functional */}
              {nextCardIndex > 1 && (
                <div 
                  className="absolute left-0 top-0 w-1/4 h-full flex items-center justify-start pl-4 cursor-pointer z-10"
                  onClick={prevCard}
                >
                  {/* Visible Arrow - Desktop only */}
                  <div className="hidden md:flex bg-black/20 rounded-full w-12 h-12 items-center justify-center backdrop-blur-sm opacity-30 hover:opacity-60 transition-opacity duration-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                </div>
              )}
              {/* Right Click Zone for next card - Always functional */}
              {nextCardIndex < cards.length && (
                <div 
                  className="absolute right-0 top-0 w-1/4 h-full flex items-center justify-end pr-4 cursor-pointer z-10"
                  onClick={nextCard}
                >
                  {/* Visible Arrow - Desktop only */}
                  <div className="hidden md:flex bg-black/20 rounded-full w-12 h-12 items-center justify-center backdrop-blur-sm opacity-30 hover:opacity-60 transition-opacity duration-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}

              
              <div style={{color: 'red', fontSize: '30px', zIndex: 1000, position: 'absolute', top: '50px'}}>
                slideDirection: {slideDirection}
              </div>
              <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full" style={{scrollTop: 0, overscrollBehavior: 'contain'}}>
                {cards[nextCardIndex - 1] && (
                  <>
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2"
                        dangerouslySetInnerHTML={{ __html: cards[nextCardIndex - 1].title }} />
                    
                    {shouldShowNotePill(cards[nextCardIndex - 1]) && (
                      <div className="flex justify-center mb-4 sm:mb-6">
                        <button 
                          onClick={() => setShowNotePopup(true)}
                          className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full hover:bg-blue-200 transition-colors opacity-70"
                        >
                          Note
                        </button>
                      </div>
                    )}
                    
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
          onBack={handleBackWithAudioStop}
          count={getCurrentCount()}
          onIncrement={incrementCount}
          onClear={clearCount}
          showCounting={shouldShowCounting}
          showScrollToTop={categoryTitle !== 'Complete Ruqyah Verses'}
          onScrollToTop={handleScrollToTop}
          isFullPageVisible={isFullPageVisible}
        />
        
        {/* Note Popup Modal */}
        {showNotePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowNotePopup(false)}>
            <div className="bg-white rounded-lg p-6 m-4 max-w-sm w-full shadow-lg" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Note</h3>
                <button 
                  onClick={() => setShowNotePopup(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-700 leading-relaxed">
                The Qur'an must be recited in Arabic but the following du'as can be recited in Arabic or in your own language.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

export default CardViewer