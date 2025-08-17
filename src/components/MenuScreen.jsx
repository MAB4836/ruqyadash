import React from 'react'

const MenuScreen = ({ onSelectCategory, onOpenSettings, onSelectMorning, onSelectEvening, onSelectShifa, onSelectChild }) => {
  
  const menuOptions = [
    {
      id: 'immediateHelp',
      title: 'Immediate Help',
      description: 'A step-by-step self-diagnosis guide to identify spiritual affliction and safe immediate actions.'
    },
    {
      id: 'ruqyahVerses',
      title: 'Ruqyah Toolkit',
      description: 'Essential Quranic verses for spiritual protection'
    },
    {
      id: 'personalProtection',
      title: 'Personal Protection',
      description: 'Comprehensive protection guidance for all situations'
    },
    {
      id: 'sihrMagic',
      title: 'Sihr/Magic',
      description: 'Most common types of Sihr'
    }
  ]

  return (
    <div className="min-h-screen bg-red-500 flex flex-col p-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto pt-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-2">
          Islamic Protection App
        </h1>
        
        <div className="text-center mb-4 relative">
          <p className="text-white text-sm opacity-75">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <button
            onClick={onOpenSettings}
            className="absolute -top-1 right-0 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
            aria-label="Settings"
          >
            <svg 
              className="w-4 h-4 text-white opacity-60" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4 mb-6">
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
        
        <div className="flex justify-center space-x-2 sm:space-x-4 px-4 sm:px-0">
          <button 
            onClick={onSelectMorning}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-2xl px-3 sm:px-6 py-4 transition-all duration-200 transform hover:scale-105 touch-manipulation flex-1 sm:flex-none sm:min-w-24 max-w-20 sm:max-w-none"
          >
            <span className="text-xs sm:text-sm font-semibold">Morning</span>
          </button>
          <button 
            onClick={onSelectShifa}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-2xl px-3 sm:px-6 py-4 transition-all duration-200 transform hover:scale-105 touch-manipulation flex-1 sm:flex-none sm:min-w-24 max-w-20 sm:max-w-none"
          >
            <span className="text-xs sm:text-sm font-semibold">Shifa</span>
          </button>
          <button 
            onClick={onSelectChild}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-2xl px-3 sm:px-6 py-4 transition-all duration-200 transform hover:scale-105 touch-manipulation flex-1 sm:flex-none sm:min-w-24 max-w-20 sm:max-w-none"
          >
            <span className="text-xs sm:text-sm font-semibold">Child</span>
          </button>
          <button 
            onClick={onSelectEvening}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-2xl px-3 sm:px-6 py-4 transition-all duration-200 transform hover:scale-105 touch-manipulation flex-1 sm:flex-none sm:min-w-24 max-w-20 sm:max-w-none"
          >
            <span className="text-xs sm:text-sm font-semibold">Evening</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuScreen