import React, { useState } from 'react'
import MenuScreen from './components/MenuScreen'
import RuqyahSubmenu from './components/RuqyahSubmenu'
import EvilEyeSubmenu from './components/EvilEyeSubmenu'
import PersonalProtectionSubmenu from './components/PersonalProtectionSubmenu'
import JinnAttacksSubmenu from './components/JinnAttacksSubmenu'
import CardViewer from './components/CardViewer'
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

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedRuqyahOption, setSelectedRuqyahOption] = useState(null)
  const [selectedEvilEyeOption, setSelectedEvilEyeOption] = useState(null)
  const [selectedPersonalProtectionOption, setSelectedPersonalProtectionOption] = useState(null)
  const [selectedJinnAttacksOption, setSelectedJinnAttacksOption] = useState(null)

  const categoryData = {
    whatIsRuqyah: {
      title: 'What is Ruqyah?',
      cards: whatIsRuqyah
    },
    shortRuqyah: {
      title: 'Short Ruqyah',
      cards: shortRuqyah
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
    }
  }

  const handleSelectCategory = (categoryId) => {
    if (categoryId === 'ruqyahVerses') {
      setCurrentScreen('ruqyahSubmenu')
    } else if (categoryId === 'evilEye') {
      setCurrentScreen('evilEyeSubmenu')
    } else if (categoryId === 'personalProtection') {
      setCurrentScreen('personalProtectionSubmenu')
    } else if (categoryId === 'jinnAttacks') {
      setCurrentScreen('jinnAttacksSubmenu')
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
    setSelectedPersonalProtectionOption(optionId)
    setSelectedCategory(optionId)
    setCurrentScreen('cards')
  }

  const handleSelectJinnAttacksOption = (optionId) => {
    setSelectedJinnAttacksOption(optionId)
    setSelectedCategory(optionId)
    setCurrentScreen('cards')
  }

  const handleBackToMenu = () => {
    setCurrentScreen('menu')
    setSelectedCategory(null)
    setSelectedRuqyahOption(null)
    setSelectedEvilEyeOption(null)
    setSelectedPersonalProtectionOption(null)
    setSelectedJinnAttacksOption(null)
  }

  const handleBackToRuqyahSubmenu = () => {
    setCurrentScreen('ruqyahSubmenu')
    setSelectedCategory(null)
    setSelectedRuqyahOption(null)
  }

  const handleBackToEvilEyeSubmenu = () => {
    setCurrentScreen('evilEyeSubmenu')
    setSelectedCategory(null)
    setSelectedEvilEyeOption(null)
  }

  const handleBackToPersonalProtectionSubmenu = () => {
    setCurrentScreen('personalProtectionSubmenu')
    setSelectedCategory(null)
    setSelectedPersonalProtectionOption(null)
  }

  const handleBackToJinnAttacksSubmenu = () => {
    setCurrentScreen('jinnAttacksSubmenu')
    setSelectedCategory(null)
    setSelectedJinnAttacksOption(null)
  }

  if (currentScreen === 'menu') {
    return <MenuScreen onSelectCategory={handleSelectCategory} />
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