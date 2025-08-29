import React, { useState, useEffect, useCallback, useRef } from 'react'
import MenuScreen from './components/MenuScreen'
import MorningAdhkar from './components/MorningAdhkar'
import ShifaPage from './components/ShifaPage'
import ChildPage from './components/ChildPage'
import RuqyahSubmenu from './components/RuqyahSubmenu'
import RuqyahGuide from './components/RuqyahGuide'
import RaqiGuideViewer from './components/RaqiGuideViewer'
import SelfDiagnosisViewer from './components/SelfDiagnosisViewer'
import SihrTypesViewer from './components/SihrTypesViewer'
import PersonalProtectionViewer from './components/PersonalProtectionViewer'
import SpiritualAfflictionsGuideViewer from './components/SpiritualAfflictionsGuideViewer'
import WhatIsRuqyahViewer from './components/WhatIsRuqyahViewer'
import EvilEyeSubmenu from './components/EvilEyeSubmenu'
import PersonalProtectionSubmenu from './components/PersonalProtectionSubmenu'
import JinnAttacksSubmenu from './components/JinnAttacksSubmenu'
import ImmediateHelpSubmenu from './components/ImmediateHelpSubmenu'
import CardViewer from './components/CardViewer'
import PageViewer from './components/PageViewer'
import SpiritualAfflictionsGuide from './components/SpiritualAfflictionsGuide'
import SettingsPopup from './components/SettingsPopup'
import { ruqyahVerses } from './data/ruqyahVerses'
import { shortRuqyah } from './data/shortRuqyah'
import { whatIsRuqyah } from './data/whatIsRuqyah'
import { suspectHouse } from './data/suspectHouse'
import { personalProtection } from './data/personalProtection'
import { understandingEvilEye } from './data/understandingEvilEye'
import { quranicProtection } from './data/quranicProtection'
import { propheticDuas } from './data/propheticDuas'
import { dailyProtectionRoutine } from './data/dailyProtectionRoutine'
import { performingRuqyah } from './data/performingRuqyah'
import { preventingEvilEye } from './data/preventingEvilEye'
import { travelProtection } from './data/travelProtection'
import { familyProtection } from './data/familyProtection'
import { jinnEntry } from './data/jinnEntry'
import { jinnSustained } from './data/jinnSustained'
import { jinnExpelled } from './data/jinnExpelled'
import { jinnKnowledge } from './data/jinnKnowledge'
import { sihrTypes } from './data/sihrTypes'
import { spiritualRemedies } from './data/spiritualRemedies'
import { manzilVerses } from './data/manzilVerses'
import { selfDiagnosis } from './data/selfDiagnosis'
import { spiritualAfflictionsGuide } from './data/spiritualAfflictionsGuide'
// import { raqiGuide } from './data/raqiGuide' // Now using HTML file instead

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedRuqyahOption, setSelectedRuqyahOption] = useState(null)
  const [selectedEvilEyeOption, setSelectedEvilEyeOption] = useState(null)
  const [selectedPersonalProtectionOption, setSelectedPersonalProtectionOption] = useState(null)
  const [selectedJinnAttacksOption, setSelectedJinnAttacksOption] = useState(null)
  const [selectedImmediateHelpOption, setSelectedImmediateHelpOption] = useState(null)
  const [showExitDialog, setShowExitDialog] = useState(false)
  const [showSettingsPopup, setShowSettingsPopup] = useState(false)
  const [navigationHistory, setNavigationHistory] = useState([])
  const [selectedFont, setSelectedFont] = useState(() => {
    return localStorage.getItem('arabicFont') || 'KSARegular_B'
  })
  const [arabicFontSize, setArabicFontSize] = useState(() => {
    return parseInt(localStorage.getItem('arabicFontSize')) || 110
  })
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('ruqyahDarkMode') === 'true'
  })
  const [isPageView, setIsPageView] = useState(() => {
    return localStorage.getItem('ruqyahPageView') === 'true'
  })
  const [showTranslations, setShowTranslations] = useState(() => {
    return localStorage.getItem('ruqyahShowTranslations') !== 'false'
  })
  
  // Ref to access CardViewer audio control functions
  const cardViewerRef = useRef(null)

  const handleBackToMenu = useCallback(() => {
    setCurrentScreen('menu');
    setSelectedCategory(null);
    setSelectedRuqyahOption(null);
    setSelectedEvilEyeOption(null);
    setSelectedPersonalProtectionOption(null);
    setSelectedJinnAttacksOption(null);
    setSelectedImmediateHelpOption(null);
  }, [])

  const handleBackToRuqyahSubmenu = useCallback(() => {
    setCurrentScreen('ruqyahSubmenu')
    setSelectedCategory(null)
    setSelectedRuqyahOption(null)
  }, [])

  const handleBackToRuqyahSubmenuFromGuide = useCallback(() => {
    setCurrentScreen('ruqyahSubmenu')
  }, [])

  const handleBackToEvilEyeSubmenu = useCallback(() => {
    setCurrentScreen('evilEyeSubmenu')
    setSelectedCategory(null)
    setSelectedEvilEyeOption(null)
  }, [])

  const handleBackToPersonalProtectionSubmenu = useCallback(() => {
    setCurrentScreen('personalProtectionSubmenu')
    setSelectedCategory(null)
    setSelectedPersonalProtectionOption(null)
  }, [])

  const handleBackToJinnAttacksSubmenu = useCallback(() => {
    setCurrentScreen('jinnAttacksSubmenu')
    setSelectedCategory(null)
    setSelectedJinnAttacksOption(null)
  }, [])

  const handleBackToImmediateHelpSubmenu = useCallback(() => {
    setCurrentScreen('immediateHelpSubmenu')
    setSelectedCategory(null)
    setSelectedImmediateHelpOption(null)
  }, [])

  const handleBackToImmediateHelpSubmenuFromGuide = useCallback(() => {
    setCurrentScreen('immediateHelpSubmenu')
  }, [])

  useEffect(() => {
    const handleBackButton = () => {
      if (currentScreen === 'menu') {
        setShowExitDialog(true);
        return;
      }

      // Handle back navigation for other screens
      if (currentScreen === 'ruqyahSubmenu' || 
          currentScreen === 'evilEyeSubmenu' || 
          currentScreen === 'personalProtectionSubmenu' || 
          currentScreen === 'jinnAttacksSubmenu' ||
          currentScreen === 'immediateHelpSubmenu' ||
          currentScreen === 'morningAdhkar' ||
          currentScreen === 'shifaPage' ||
          currentScreen === 'childPage') {
        handleBackToMenu();
      } 
      else if (currentScreen === 'ruqyahGuide') {
        handleBackToRuqyahSubmenuFromGuide();
      }
      else if (currentScreen === 'spiritualAfflictionsGuide') {
        handleBackToImmediateHelpSubmenuFromGuide();
      } 
      else if (currentScreen === 'cards') {
        // Stop any playing audio before navigating back
        if (cardViewerRef.current && cardViewerRef.current.stopAudio) {
          cardViewerRef.current.stopAudio();
        }
        
        if (selectedRuqyahOption) {
          handleBackToRuqyahSubmenu();
        } else if (selectedEvilEyeOption) {
          handleBackToEvilEyeSubmenu();
        } else if (selectedPersonalProtectionOption) {
          handleBackToPersonalProtectionSubmenu();
        } else if (selectedJinnAttacksOption) {
          handleBackToJinnAttacksSubmenu();
        } else if (selectedImmediateHelpOption) {
          handleBackToImmediateHelpSubmenu();
        } else {
          handleBackToMenu();
        }
      }
    };

    // For Capacitor (mobile)
    if (window.Capacitor?.Plugins?.App) {
      console.log('Setting up Capacitor back button listener');
      const backButtonListener = window.Capacitor.Plugins.App.addListener('backButton', ({ canGoBack }) => {
        console.log('Back button pressed, canGoBack:', canGoBack);
        handleBackButton();
      });

      return () => {
        backButtonListener.remove();
      };
    }
    // For web (development/testing)
    else {
      console.log('Setting up window.backButton for testing');
      window.handleBackButton = handleBackButton;
    }
  }, [
    currentScreen,
    handleBackToMenu,
    handleBackToRuqyahSubmenu,
    handleBackToRuqyahSubmenuFromGuide,
    handleBackToEvilEyeSubmenu,
    handleBackToPersonalProtectionSubmenu,
    handleBackToJinnAttacksSubmenu,
    handleBackToImmediateHelpSubmenu,
    handleBackToImmediateHelpSubmenuFromGuide,
    selectedRuqyahOption,
    selectedEvilEyeOption,
    selectedPersonalProtectionOption,
    selectedJinnAttacksOption,
    selectedImmediateHelpOption
  ])

  const categoryData = {
    whatIsRuqyah: {
      title: 'What is Ruqyah?',
      cards: whatIsRuqyah
    },
    shortRuqyah: {
      title: 'Prophetic Ruqyah',
      cards: shortRuqyah
    },
    manzil: {
      title: 'Manzil',
      cards: manzilVerses
    },
    completeRuqyah: {
      title: 'Ruqyah Plus',
      cards: ruqyahVerses
    },
    suspectHouse: {
      title: 'Entering Suspect Places',
      cards: suspectHouse
    },
    personalProtection: {
      title: 'Personal Protection',
      cards: personalProtection
    },
    understandingEvilEye: {
      title: 'Understanding the Evil Eye',
      cards: understandingEvilEye
    },
    quranicProtection: {
      title: 'Quranic Verses of Protection',
      cards: quranicProtection
    },
    propheticDuas: {
      title: 'Prophetic Duas for Protection',
      cards: propheticDuas
    },
    dailyProtectionRoutine: {
      title: 'Daily Protection Routine',
      cards: dailyProtectionRoutine
    },
    performingRuqyah: {
      title: 'Performing Ruqyah on Yourself',
      cards: performingRuqyah
    },
    preventingEvilEye: {
      title: 'Preventing Causing Evil Eye',
      cards: preventingEvilEye
    },
    evilEye: {
      title: 'Against Evil Eye',
      cards: [
        { id: 1, title: 'Hasad Protection', content: '<div class="arabic-text text-lg text-center text-gray-900">Coming Soon - Protection from evil eye</div>' }
      ]
    },
    jinnAttacks: {
      title: 'Against Jinn Attacks',
      cards: [
        { id: 1, title: 'Jinn Protection', content: '<div class="arabic-text text-lg text-center text-gray-900">Coming Soon - Protection from jinn</div>' }
      ]
    },
    sihrMagic: {
      title: 'Sihr/Magic Types',
      cards: sihrTypes
    },
    travelProtection: {
      title: 'Travel & Outdoor Protection',
      cards: travelProtection
    },
    familyProtection: {
      title: 'Family & Home Protection',
      cards: familyProtection
    },
    jinnEntry: {
      title: 'Entry - How Jinn Gain Access',
      cards: jinnEntry
    },
    jinnSustained: {
      title: 'Sustained - How Jinn Maintain Influence',
      cards: jinnSustained
    },
    jinnExpelled: {
      title: 'Expelled - Signs of Jinn Expulsion',
      cards: jinnExpelled
    },
    jinnKnowledge: {
      title: 'Additional Knowledge - Sihr Types & Authority',
      cards: jinnKnowledge
    },
    spiritualRemedies: {
      title: 'Preparing Spiritual Remedies',
      cards: spiritualRemedies
    },
    diagnosisHelp: {
      title: 'Diagnosis and Help',
      cards: selfDiagnosis
    },
    raqi: {
      title: 'Raqi - Visiting Ruqyah Practitioners',
      cards: [] // Will be handled by RaqiGuideViewer component
    },
    spiritualAfflictionsGuide: {
      title: 'Spiritual Afflictions Guide',
      cards: spiritualAfflictionsGuide
    }
  }

  const handleSelectCategory = (categoryId) => {
    if (categoryId === 'ruqyahVerses') {
      setCurrentScreen('ruqyahSubmenu')
    } else if (categoryId === 'personalProtection') {
      setCurrentScreen('personalProtectionSubmenu')
    } else if (categoryId === 'immediateHelp') {
      setCurrentScreen('immediateHelpSubmenu')
    } else {
      setSelectedCategory(categoryId)
      setCurrentScreen('cards')
    }
  }

  const handleSelectMorning = () => {
    setCurrentScreen('morningAdhkar')
  }

  const handleSelectEvening = () => {
    setCurrentScreen('morningAdhkar')
  }

  const handleSelectShifa = () => {
    setCurrentScreen('shifaPage')
  }

  const handleSelectChild = () => {
    setCurrentScreen('childPage')
  }

  const handleBackFromMorningAdhkar = () => {
    setCurrentScreen('menu')
  }

  const handleBackFromShifaPage = () => {
    setCurrentScreen('menu')
  }

  const handleBackFromChildPage = () => {
    setCurrentScreen('menu')
  }

  const handleSelectRuqyahOption = (optionId) => {
    setSelectedRuqyahOption(optionId)
    setSelectedCategory(optionId)
    setCurrentScreen('cards')
  }

  const handleToggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('ruqyahDarkMode', newDarkMode.toString())
  }

  const handleTogglePageView = () => {
    const newPageView = !isPageView
    setIsPageView(newPageView)
    localStorage.setItem('ruqyahPageView', newPageView.toString())
  }

  const handleToggleTranslations = () => {
    const newShowTranslations = !showTranslations
    setShowTranslations(newShowTranslations)
    localStorage.setItem('ruqyahShowTranslations', newShowTranslations.toString())
  }

  const handleSelectEvilEyeOption = (optionId) => {
    setSelectedEvilEyeOption(optionId)
    setSelectedCategory(optionId)
    setCurrentScreen('cards')
  }

  const handleSelectPersonalProtectionOption = (optionId) => {
    if (optionId === 'evilEye') {
      setCurrentScreen('evilEyeSubmenu')
    } else if (optionId === 'jinnAttacks') {
      setCurrentScreen('jinnAttacksSubmenu')
    } else if (optionId === 'personalProtection') {
      setSelectedPersonalProtectionOption(optionId)
      setCurrentScreen('personalProtectionViewer')
    } else {
      setSelectedPersonalProtectionOption(optionId)
      setSelectedCategory(optionId)
      setCurrentScreen('cards')
    }
  }

  const handleSelectJinnAttacksOption = (optionId) => {
    setSelectedJinnAttacksOption(optionId)
    setSelectedCategory(optionId)
    setCurrentScreen('cards')
  }

  const handleSelectImmediateHelpOption = (optionId) => {
    setSelectedImmediateHelpOption(optionId)
    setSelectedCategory(optionId)
    setCurrentScreen('cards')
  }

  const handleOpenSpiritualAfflictionsGuide = () => {
    setCurrentScreen('spiritualAfflictionsGuide')
  }

  const handleOpenRuqyahGuide = () => {
    setCurrentScreen('ruqyahGuide')
  }

  const navigateToSection = (sectionId, returnLocation) => {
    setNavigationHistory([...navigationHistory, returnLocation])
    
    // Handle special cases that go to submenus instead of cards
    if (sectionId === 'ruqyahVerses') {
      setCurrentScreen('ruqyahSubmenu')
    } else {
      setSelectedCategory(sectionId)
      setCurrentScreen('cards')
    }
  }

  const navigateBack = () => {
    if (navigationHistory.length > 0) {
      const previousLocation = navigationHistory[navigationHistory.length - 1]
      setNavigationHistory(navigationHistory.slice(0, -1))
      
      // Navigate back to previous location
      setSelectedCategory(previousLocation.category)
      setCurrentScreen(previousLocation.screen)
      
      // Store the card index and scroll position for CardViewer to use
      if (previousLocation.cardIndex) {
        localStorage.setItem('returnToCardIndex', previousLocation.cardIndex.toString())
      }
      if (previousLocation.scrollPosition !== undefined) {
        localStorage.setItem('returnScrollPosition', previousLocation.scrollPosition.toString())
      }
    } else {
    }
  }

  const handleExitApp = () => {
    const CapacitorApp = window.Capacitor?.Plugins?.App;
    if (CapacitorApp) {
      CapacitorApp.exitApp()
    } else {
      // For web, just close the window (if possible)
      window.close()
    }
  }

  const handleCancelExit = () => {
    setShowExitDialog(false)
  }

  const handleOpenSettings = () => {
    setShowSettingsPopup(true)
  }

  const handleCloseSettings = () => {
    setShowSettingsPopup(false)
  }

  const handleFontChange = (fontId) => {
    setSelectedFont(fontId)
    localStorage.setItem('arabicFont', fontId)
    document.documentElement.style.setProperty('--arabic-font-family', `'${fontId}'`)
  }
  
  const handleFontSizeChange = (size) => {
    setArabicFontSize(size)
    localStorage.setItem('arabicFontSize', size.toString())
    document.documentElement.style.setProperty('--arabic-font-size', `${size}%`)
  }

  // Set initial font and font size on app load
  useEffect(() => {
    document.documentElement.style.setProperty('--arabic-font-family', `'${selectedFont}'`)
    document.documentElement.style.setProperty('--arabic-font-size', `${arabicFontSize}%`)
  }, [])

  const ExitDialog = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-bold text-gray-900 text-center mb-4">Quit?</h3>
        <p className="text-gray-600 text-center mb-6">Are you sure you want to exit the app?</p>
        <div className="flex space-x-4">
          <button
            onClick={handleCancelExit}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExitApp}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  )

  if (currentScreen === 'menu') {
    return (
      <>
        <MenuScreen onSelectCategory={handleSelectCategory} onOpenSettings={handleOpenSettings} onSelectMorning={handleSelectMorning} onSelectEvening={handleSelectEvening} onSelectShifa={handleSelectShifa} onSelectChild={handleSelectChild} />
        {showExitDialog && <ExitDialog />}
        <SettingsPopup 
          isOpen={showSettingsPopup}
          onClose={handleCloseSettings}
          selectedFont={selectedFont}
          onFontChange={handleFontChange}
          arabicFontSize={arabicFontSize}
          onFontSizeChange={handleFontSizeChange}
        />
      </>
    )
  }

  if (currentScreen === 'morningAdhkar') {
    return (
      <MorningAdhkar onBack={handleBackFromMorningAdhkar} selectedFont={selectedFont} isDarkMode={isDarkMode} />
    )
  }

  if (currentScreen === 'shifaPage') {
    return (
      <ShifaPage onBack={handleBackFromShifaPage} selectedFont={selectedFont} isDarkMode={isDarkMode} />
    )
  }

  if (currentScreen === 'childPage') {
    return (
      <ChildPage onBack={handleBackFromChildPage} selectedFont={selectedFont} isDarkMode={isDarkMode} />
    )
  }

  if (currentScreen === 'ruqyahSubmenu') {
    return (
      <>
        <RuqyahSubmenu
          onSelectOption={handleSelectRuqyahOption}
          onBack={navigationHistory.length > 0 ? navigateBack : handleBackToMenu}
          onOpenGuide={handleOpenRuqyahGuide}
          showReturnButton={navigationHistory.length > 0}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
          isPageView={isPageView}
          onTogglePageView={handleTogglePageView}
          showTranslations={showTranslations}
          onToggleTranslations={handleToggleTranslations}
          onOpenSettings={handleOpenSettings}
        />
        <SettingsPopup 
          isOpen={showSettingsPopup}
          onClose={handleCloseSettings}
          selectedFont={selectedFont}
          onFontChange={handleFontChange}
          arabicFontSize={arabicFontSize}
          onFontSizeChange={handleFontSizeChange}
        />
      </>
    )
  }

  if (currentScreen === 'ruqyahGuide') {
    return (
      <RuqyahGuide onBack={handleBackToRuqyahSubmenuFromGuide} />
    )
  }

  if (currentScreen === 'evilEyeSubmenu') {
    return (
      <EvilEyeSubmenu
        onSelectOption={handleSelectEvilEyeOption}
        onBack={handleBackToMenu}
      />
    )
  }

  if (currentScreen === 'personalProtectionSubmenu') {
    return (
      <PersonalProtectionSubmenu
        onSelectOption={handleSelectPersonalProtectionOption}
        onBack={handleBackToMenu}
      />
    )
  }

  if (currentScreen === 'jinnAttacksSubmenu') {
    return (
      <JinnAttacksSubmenu
        onSelectOption={handleSelectJinnAttacksOption}
        onBack={handleBackToMenu}
      />
    )
  }

  if (currentScreen === 'immediateHelpSubmenu') {
    return (
      <ImmediateHelpSubmenu
        onSelectOption={handleSelectImmediateHelpOption}
        onBack={handleBackToMenu}
        onOpenGuide={handleOpenSpiritualAfflictionsGuide}
      />
    )
  }

  if (currentScreen === 'spiritualAfflictionsGuide') {
    return (
      <SpiritualAfflictionsGuideViewer onBack={handleBackToImmediateHelpSubmenuFromGuide} isDarkMode={isDarkMode} />
    )
  }

  if (currentScreen === 'personalProtectionViewer') {
    return (
      <PersonalProtectionViewer onBack={handleBackToPersonalProtectionSubmenu} isDarkMode={isDarkMode} />
    )
  }

  if (currentScreen === 'cards' && selectedCategory) {
    const category = categoryData[selectedCategory]
    let onBackFunction = handleBackToMenu
    
    if (selectedRuqyahOption) {
      onBackFunction = handleBackToRuqyahSubmenu
    } else if (selectedEvilEyeOption) {
      onBackFunction = handleBackToEvilEyeSubmenu
    } else if (selectedPersonalProtectionOption) {
      onBackFunction = handleBackToPersonalProtectionSubmenu
    } else if (selectedJinnAttacksOption) {
      onBackFunction = handleBackToJinnAttacksSubmenu
    } else if (selectedImmediateHelpOption) {
      onBackFunction = handleBackToImmediateHelpSubmenu
    }
    
    // Special handling for raqi guide - use HTML file viewer
    if (selectedCategory === 'raqi') {
      return (
        <RaqiGuideViewer
          onBack={onBackFunction}
          isDarkMode={isDarkMode}
        />
      )
    }
    
    // Special handling for whatIsRuqyah - use HTML file viewer
    if (selectedCategory === 'whatIsRuqyah') {
      return (
        <WhatIsRuqyahViewer
          onBack={onBackFunction}
          isDarkMode={isDarkMode}
        />
      )
    }
    
    // Special handling for diagnosis help - use HTML file viewer
    if (selectedCategory === 'diagnosisHelp') {
      const handleNavigateToRuqyah = () => {
        setSelectedImmediateHelpOption(null)
        setSelectedCategory('shortRuqyah')
        setSelectedRuqyahOption('shortRuqyah')
        setCurrentScreen('cards')
      }
      
      return (
        <SelfDiagnosisViewer
          onBack={onBackFunction}
          isDarkMode={isDarkMode}
          onNavigateToRuqyah={handleNavigateToRuqyah}
        />
      )
    }
    
    // Special handling for sihr types - use HTML file viewer
    if (selectedCategory === 'sihrMagic') {
      return (
        <SihrTypesViewer
          onBack={onBackFunction}
          isDarkMode={isDarkMode}
        />
      )
    }
    
    // Check if this is Complete Ruqyah Verses, Manzil, or Short Ruqyah and page view is enabled
    if ((selectedCategory === 'completeRuqyah' || selectedCategory === 'manzil' || selectedCategory === 'shortRuqyah') && isPageView) {
      // Check if we need to return to a specific location
      const returnTo = localStorage.getItem('returnTo')
      const returnSection = localStorage.getItem('returnSection')
      let finalOnBackFunction = onBackFunction
      let backButtonText = undefined
      
      if (returnTo && selectedCategory === 'shortRuqyah') {
        backButtonText = "← Back to Self-Diagnosis"
        finalOnBackFunction = () => {
          // Navigate back to the specific location (don't clear localStorage yet)
          if (returnTo === 'diagnosisHelp') {
            setSelectedCategory('diagnosisHelp')
            setSelectedImmediateHelpOption('diagnosisHelp')
            setCurrentScreen('cards')
            // Note: scrolling and localStorage clearing is handled by SelfDiagnosisViewer component
          }
        }
      }
      
      return (
        <PageViewer
          cards={category.cards}
          categoryTitle={category.title}
          onBack={finalOnBackFunction}
          isDarkMode={isDarkMode}
          showTranslations={(selectedCategory === 'manzil' || selectedCategory === 'shortRuqyah' || selectedCategory === 'completeRuqyah') ? showTranslations : true}
          fullWidth={selectedCategory === 'manzil' || selectedCategory === 'completeRuqyah'}
          backButtonText={backButtonText}
        />
      )
    }
    
    // Check if we need to return to a specific location
    const returnTo = localStorage.getItem('returnTo')
    const returnSection = localStorage.getItem('returnSection')
    let finalOnBackFunction = onBackFunction
    
    if (returnTo && selectedCategory === 'shortRuqyah') {
      finalOnBackFunction = () => {
        // Navigate back to the specific location (don't clear localStorage yet)
        if (returnTo === 'diagnosisHelp') {
          setSelectedCategory('diagnosisHelp')
          setSelectedImmediateHelpOption('diagnosisHelp')
          setCurrentScreen('cards')
          // Note: scrolling and localStorage clearing is handled by SelfDiagnosisViewer component
        }
      }
    }
    
    return (
      <CardViewer
        ref={cardViewerRef}
        cards={category.cards}
        categoryTitle={category.title}
        onBack={finalOnBackFunction}
        navigateToSection={navigateToSection}
        navigateBack={navigateBack}
        hasReturnPath={navigationHistory.length > 0}
        isDarkMode={isDarkMode}
        showTranslations={(selectedCategory === 'manzil' || selectedCategory === 'shortRuqyah' || selectedCategory === 'completeRuqyah') ? showTranslations : true}
      />
    )
  }

  // Fallback
  return <MenuScreen onSelectCategory={handleSelectCategory} />
}

export default App