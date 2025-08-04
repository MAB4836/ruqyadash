import React from 'react'

const MenuScreen = ({ onSelectCategory }) => {
  const menuOptions = [
    {
      id: 'ruqyahVerses',
      title: 'Ruqyah Verses',
      description: 'Essential Quranic verses for spiritual protection'
    },
    {
      id: 'suspectHouse',
      title: 'Entering Suspect Places',
      description: 'Protection when entering potentially harmful places'
    },
    {
      id: 'personalProtection',
      title: 'Personal Protection',
      description: 'Daily protection du\'a and morning/evening adhkar'
    },
    {
      id: 'evilEye',
      title: 'Against Evil Eye',
      description: 'Protection from hasad and envious looks'
    },
    {
      id: 'jinnAttacks',
      title: 'Against Jinn Attacks',
      description: 'Protection from jinn interference and whispers'
    },
    {
      id: 'sihrMagic',
      title: 'Sihr/Magic',
      description: 'Most common types of Sihr'
    }
  ]

  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8">
          Islamic Protection App
        </h1>
        
        <div className="space-y-4">
          {menuOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelectCategory(option.id)}
              className="w-full bg-blue-400 hover:bg-blue-500 text-white rounded-lg shadow-lg p-4 sm:p-6 transition-all duration-200 transform hover:scale-105 touch-manipulation"
            >
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold">{option.title}</h3>
                <p className="text-sm sm:text-base opacity-90 mt-1">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-white text-sm opacity-75">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>
      </div>
    </div>
  )
}

export default MenuScreen