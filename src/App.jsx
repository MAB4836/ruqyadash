import React, { useState, useEffect, useCallback } from 'react'
import MenuScreen from './components/MenuScreen'
import RuqyahSubmenu from './components/RuqyahSubmenu'
import EvilEyeSubmenu from './components/EvilEyeSubmenu'
import PersonalProtectionSubmenu from './components/PersonalProtectionSubmenu'
import JinnAttacksSubmenu from './components/JinnAttacksSubmenu'
import ImmediateHelpSubmenu from './components/ImmediateHelpSubmenu'
import CardViewer from './components/CardViewer'
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
  const [selectedFont, setSelectedFont] = useState(() => {
    return localStorage.getItem('arabicFont') || 'KSARegular_B'
  })

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
          currentScreen === 'immediateHelpSubmenu') {
        handleBackToMenu();
      } 
      else if (currentScreen === 'cards') {
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
    handleBackToEvilEyeSubmenu,
    handleBackToPersonalProtectionSubmenu,
    handleBackToJinnAttacksSubmenu,
    handleBackToImmediateHelpSubmenu,
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
      title: 'Short Ruqyah',
      cards: shortRuqyah
    },
    manzil: {
      title: 'Manzil',
      cards: manzilVerses
    },
    completeRuqyah: {
      title: 'Complete Ruqyah Verses',
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
      cards: [
        { id: 1, title: 'Coming Soon', content: '<div class="text-lg text-center text-gray-900">Raqi guidance coming soon</div>' }
      ]
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

  const handleSelectRuqyahOption = (optionId) => {
    setSelectedRuqyahOption(optionId)
    setSelectedCategory(optionId)
    setCurrentScreen('cards')
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

  // Set initial font on app load
  useEffect(() => {
    document.documentElement.style.setProperty('--arabic-font-family', `'${selectedFont}'`)
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
        <MenuScreen onSelectCategory={handleSelectCategory} onOpenSettings={handleOpenSettings} />
        {showExitDialog && <ExitDialog />}
        <SettingsPopup 
          isOpen={showSettingsPopup}
          onClose={handleCloseSettings}
          selectedFont={selectedFont}
          onFontChange={handleFontChange}
        />
      </>
    )
  }

  if (currentScreen === 'ruqyahSubmenu') {
    return (
      <RuqyahSubmenu
        onSelectOption={handleSelectRuqyahOption}
        onBack={handleBackToMenu}
      />
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
      />
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
    
    return (
      <CardViewer
        cards={category.cards}
        categoryTitle={category.title}
        onBack={onBackFunction}
      />
    )
  }

  // Fallback
  return <MenuScreen onSelectCategory={handleSelectCategory} />
}

export default App