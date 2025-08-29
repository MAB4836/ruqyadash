import React from 'react'

const JinnAttacksSubmenu = ({ onSelectOption, onBack }) => {
  const submenuOptions = [
    {
      id: 'jinnEntry',
      title: 'Entry',
      description: 'How jinn enter and gain access to affect people'
    },
    {
      id: 'jinnSustained',
      title: 'Sustained',
      description: 'How jinn maintain their presence and influence'
    },
    {
      id: 'jinnExpelled',
      title: 'Expelled',
      description: 'Signs of weakening and complete jinn expulsion'
    },
    {
      id: 'jinnKnowledge',
      title: 'Additional Knowledge',
      description: 'Types of sihr and comprehensive understanding'
    }
  ]

  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Against Jinn Attacks
          </h1>
          <div className="text-center">
            <p className="text-white text-sm opacity-75">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          {submenuOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelectOption(option.id)}
              className="w-full bg-blue-400 hover:bg-blue-500 text-white rounded-lg shadow-lg p-4 sm:p-6 transition-all duration-200 transform hover:scale-105 touch-manipulation"
            >
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold">{option.title}</h3>
                <p className="text-sm sm:text-base opacity-90 mt-1">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
        
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={onBack}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg px-4 py-2 transition-all duration-200"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default JinnAttacksSubmenu