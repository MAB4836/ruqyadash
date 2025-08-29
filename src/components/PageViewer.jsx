import React, { useEffect, useRef, useState } from 'react'
import { KeepAwake } from '@capacitor-community/keep-awake'

const PageViewer = ({ cards, categoryTitle, onBack, isDarkMode = false, showTranslations = true, fullWidth = false, backButtonText }) => {
  const pageContentRef = useRef(null)
  const audioRef = useRef(null)
  const autoPlayRef = useRef(true)
  const currentAudioIndexRef = useRef(-1)
  
  // Audio state management
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudioIndex, setCurrentAudioIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [showAudioControls, setShowAudioControls] = useState(false)

  // Sync autoPlay state with ref
  useEffect(() => {
    autoPlayRef.current = autoPlay
  }, [autoPlay])

  // Screen wake control functions
  const keepScreenOn = async () => {
    try {
      await KeepAwake.keepAwake()
      console.log('Screen wake lock activated for page view:', categoryTitle)
    } catch (error) {
      console.warn('Could not activate screen wake lock:', error)
    }
  }
  
  const allowScreenOff = async () => {
    try {
      await KeepAwake.allowSleep()
      console.log('Screen wake lock released for page view:', categoryTitle)
    } catch (error) {
      console.warn('Could not release screen wake lock:', error)
    }
  }

  // Audio helper functions
  const getPlayableCards = () => {
    return cards.filter(card => card.audioFile && card.audioFile.trim() !== '')
  }

  const findNextPlayableIndex = (currentIndex) => {
    console.log('findNextPlayableIndex called with currentIndex:', currentIndex, 'categoryTitle:', categoryTitle)
    // For Manzil, use simple index arithmetic (numbered cards are indices 1-21)
    if (categoryTitle === 'Manzil') {
      if (currentIndex >= 1 && currentIndex <= 20) {
        // Normal progression: next card
        console.log('Next card found at index:', currentIndex + 1)
        return currentIndex + 1
      } else if (currentIndex === 21 && autoPlayRef.current) {
        // Last card with autoplay on: loop back to first numbered card
        console.log('Last card finished, looping back to index 1')
        return 1
      } else {
        // Last card with autoplay off, or invalid index
        console.log('No next card (end of sequence or autoplay off)')
        return -1
      }
    }
    
    // Default logic for other categories
    const playableCards = getPlayableCards()
    const currentCardInPlayable = playableCards.findIndex(card => 
      cards.findIndex(c => c.id === card.id) === currentIndex
    )
    
    if (currentCardInPlayable < playableCards.length - 1) {
      const nextCard = playableCards[currentCardInPlayable + 1]
      return cards.findIndex(card => card.id === nextCard.id)
    }
    return -1
  }

  const findPrevPlayableIndex = (currentIndex) => {
    // For Manzil, use simple index arithmetic (numbered cards are indices 1-21)
    if (categoryTitle === 'Manzil') {
      if (currentIndex >= 2 && currentIndex <= 21) {
        // Normal progression: previous card
        return currentIndex - 1
      } else {
        // First card (index 1) or invalid index: no previous
        return -1
      }
    }
    
    // Default logic for other categories
    const playableCards = getPlayableCards()
    const currentCardInPlayable = playableCards.findIndex(card => 
      cards.findIndex(c => c.id === card.id) === currentIndex
    )
    
    if (currentCardInPlayable > 0) {
      const prevCard = playableCards[currentCardInPlayable - 1]
      return cards.findIndex(card => card.id === prevCard.id)
    }
    return -1
  }

  const scrollToCard = (index) => {
    const cardElement = document.getElementById(`card-${cards[index]?.id}`)
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const playAudio = async (index) => {
    if (index < 0 || index >= cards.length || !cards[index].audioFile) return
    
    console.log('playAudio: setting currentAudioIndex to', index)
    setIsLoading(true)
    setCurrentAudioIndex(index)
    currentAudioIndexRef.current = index  // Keep ref in sync
    console.log('playAudio: currentAudioIndexRef.current now =', currentAudioIndexRef.current)
    setShowAudioControls(true)
    
    if (audioRef.current) {
      const audioPath = `/audio/${cards[index].audioFile}`
      audioRef.current.src = audioPath
      
      try {
        await audioRef.current.play()
        setIsPlaying(true)
        scrollToCard(index)
      } catch (error) {
        console.error('Error playing audio:', error)
        setIsPlaying(false)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const pauseAudio = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const stopAudio = () => {
    console.log('stopAudio: resetting currentAudioIndex to -1')
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      setCurrentAudioIndex(-1)
      currentAudioIndexRef.current = -1  // Keep ref in sync
      setAudioProgress(0)
      setShowAudioControls(false)
    }
  }

  const playNext = () => {
    console.log('playNext called, currentAudioIndex:', currentAudioIndex)
    const nextIndex = findNextPlayableIndex(currentAudioIndex)
    console.log('findNextPlayableIndex returned:', nextIndex)
    if (nextIndex !== -1) {
      console.log('Playing next track at index:', nextIndex, 'Title:', cards[nextIndex]?.title)
      playAudio(nextIndex)
    } else {
      console.log('No next track found, stopping audio')
      stopAudio()
    }
  }

  const playPrev = () => {
    const prevIndex = findPrevPlayableIndex(currentAudioIndex)
    if (prevIndex !== -1) {
      playAudio(prevIndex)
    }
  }

  const getFirstNumberedCardIndex = () => {
    // For Manzil, find the first card that would have a number (skip "Beginning of Ruqyah")
    if (categoryTitle === 'Manzil') {
      return cards.findIndex(card => 
        card.title !== 'Beginning of Ruqyah' && 
        card.title !== 'End of Ruqyah' && 
        card.audioFile && 
        card.audioFile.trim() !== ''
      )
    }
    // For other categories, start from the first playable card
    const playableCards = getPlayableCards()
    if (playableCards.length > 0) {
      return cards.findIndex(card => card.id === playableCards[0].id)
    }
    return -1
  }

  const togglePlayPause = () => {
    if (currentAudioIndex === -1) {
      // Start playing from the first numbered card
      const firstNumberedIndex = getFirstNumberedCardIndex()
      if (firstNumberedIndex !== -1) {
        playAudio(firstNumberedIndex)
      }
    } else {
      if (isPlaying) {
        pauseAudio()
      } else {
        audioRef.current?.play()
        setIsPlaying(true)
      }
    }
  }

  // Start at the top of the page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Keep screen awake for text reading sessions
  useEffect(() => {
    const shouldKeepAwake = categoryTitle === 'Complete Ruqyah Verses' || 
                           categoryTitle === 'Manzil' ||
                           categoryTitle === 'Short Ruqyah'
    
    if (shouldKeepAwake) {
      keepScreenOn()
    }

    return () => {
      if (shouldKeepAwake) {
        allowScreenOff()
      }
    }
  }, [categoryTitle])

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration)
    }

    const handleTimeUpdate = () => {
      setAudioProgress((audio.currentTime / audio.duration) * 100)
    }

    const handleEnded = () => {
      console.log('Audio ended, autoPlay:', autoPlayRef.current, 'currentAudioIndexRef:', currentAudioIndexRef.current)
      if (autoPlayRef.current) {
        // Use ref to get the actual current index (not stale state)
        const currentIndex = currentAudioIndexRef.current
        const nextIndex = findNextPlayableIndex(currentIndex)
        console.log('handleEnded: nextIndex found:', nextIndex)
        if (nextIndex !== -1) {
          console.log('Playing next track at index:', nextIndex, 'Title:', cards[nextIndex]?.title)
          playAudio(nextIndex)
        } else {
          console.log('No next track found, stopping audio')
          setIsPlaying(false)
          setCurrentAudioIndex(-1)
          setShowAudioControls(false)
        }
      } else {
        setIsPlaying(false)
        setCurrentAudioIndex(-1)
        setShowAudioControls(false)
      }
    }

    const handleError = (e) => {
      console.error('Audio error:', e)
      setIsPlaying(false)
      setIsLoading(false)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [])

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      stopAudio()
    }
  }, [])

  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center p-0 md:p-4">
      <div className={`relative w-full ${fullWidth ? '' : 'md:max-w-2xl lg:max-w-4xl'}`}>
        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          preload="metadata"
          style={{ display: 'none' }}
        />
        {/* Back button at top */}
        <div className="flex justify-center mb-4 px-4 md:px-0">
          <button
            onClick={onBack}
            className={`rounded-lg px-6 py-3 transition-all duration-200 font-medium text-white ${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/60' : 'bg-white bg-opacity-20 hover:bg-opacity-30'}`}
          >
            {backButtonText || '← Back to Ruqyah Options'}
          </button>
        </div>

        {/* Category title */}
        <div className="text-center mb-4 px-4 md:px-0">
          <h1 className="text-white font-bold text-xl sm:text-2xl">
            {categoryTitle} - Page View
          </h1>
        </div>

        {/* Page content */}
        <div className={`w-full md:rounded-lg shadow-xl overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 md:border border-gray-600' : 'bg-gray-100'}`}>
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
              <div 
                key={card.id} 
                id={`card-${card.id}`}
                className={`border-b last:border-b-0 pb-8 last:pb-0 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} ${
                  currentAudioIndex === index ? 'ring-2 ring-blue-500 bg-blue-50/10 rounded-lg p-4' : ''
                }`}
              >
                <div className="flex items-center justify-center mb-4 gap-3">
                  <h2 className={`text-lg sm:text-xl md:text-2xl font-bold text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    {(() => {
                      // Don't show numbers for Beginning of Ruqyah and End of Ruqyah in Manzil
                      if (categoryTitle === 'Manzil' && (card.title === 'Beginning of Ruqyah' || card.title === 'End of Ruqyah')) {
                        return <span dangerouslySetInnerHTML={{ __html: card.title }} />
                      }
                      // For Manzil, adjust numbering (skip first item in numbering)
                      else if (categoryTitle === 'Manzil' && card.title !== 'Beginning of Ruqyah') {
                        return <><span>{index}. </span><span dangerouslySetInnerHTML={{ __html: card.title }} /></>
                      }
                      // Default numbering for other categories
                      else {
                        return <><span>{index + 1}. </span><span dangerouslySetInnerHTML={{ __html: card.title }} /></>
                      }
                    })()}
                  </h2>
                  
                  {/* Audio play button for Manzil cards with audio files */}
                  {categoryTitle === 'Manzil' && card.audioFile && (
                    <button
                      onClick={() => playAudio(index)}
                      className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                        currentAudioIndex === index && isPlaying
                          ? 'text-blue-500'
                          : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                      }`}
                      title={`Play ${card.title}`}
                    >
                      {currentAudioIndex === index && isLoading ? (
                        <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      ) : currentAudioIndex === index && isPlaying ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                    </button>
                  )}
                </div>
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
        
        {/* Floating Audio Controls */}
        {categoryTitle === 'Manzil' && showAudioControls && (
          <div className={`fixed bottom-0 left-0 right-0 p-4 backdrop-blur-md border-t z-50 ${
            isDarkMode 
              ? 'bg-gray-900/90 border-gray-700' 
              : 'bg-white/90 border-gray-200'
          }`}>
            <div className="max-w-2xl mx-auto">
              {/* Progress bar */}
              <div className={`w-full h-1 rounded-full mb-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
              
              {/* Current track info */}
              <div className="text-center mb-3">
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {currentAudioIndex >= 0 && cards[currentAudioIndex]?.title}
                </p>
              </div>
              
              {/* Control buttons */}
              <div className="flex items-center justify-center gap-4">
                {/* Previous button */}
                <button
                  onClick={playPrev}
                  disabled={findPrevPlayableIndex(currentAudioIndex) === -1}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    findPrevPlayableIndex(currentAudioIndex) === -1
                      ? 'opacity-50 cursor-not-allowed'
                      : `hover:scale-110 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`
                  }`}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                  </svg>
                </button>
                
                {/* Play/Pause button */}
                <button
                  onClick={togglePlayPause}
                  disabled={isLoading}
                  className={`p-3 rounded-full transition-all duration-200 transform hover:scale-110 ${
                    isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : isPlaying ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>
                
                {/* Next button */}
                <button
                  onClick={playNext}
                  disabled={findNextPlayableIndex(currentAudioIndex) === -1}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    findNextPlayableIndex(currentAudioIndex) === -1
                      ? 'opacity-50 cursor-not-allowed'
                      : `hover:scale-110 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`
                  }`}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                  </svg>
                </button>
                
                {/* Stop button */}
                <button
                  onClick={stopAudio}
                  className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
                  }`}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h12v12H6z"/>
                  </svg>
                </button>
                
                {/* Auto-play toggle */}
                <button
                  onClick={() => {
                    const newAutoPlay = !autoPlay
                    setAutoPlay(newAutoPlay)
                    autoPlayRef.current = newAutoPlay
                  }}
                  className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                    autoPlay 
                      ? 'text-blue-500' 
                      : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
                  }`}
                  title={autoPlay ? 'Auto-play ON' : 'Auto-play OFF'}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Back button */}
        <div className="flex justify-center mt-8 px-4 md:px-0">
          <button
            onClick={onBack}
            className={`rounded-lg px-6 py-3 transition-all duration-200 font-medium text-white ${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/60' : 'bg-white bg-opacity-20 hover:bg-opacity-30'}`}
          >
            {backButtonText || '← Back to Ruqyah Options'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PageViewer