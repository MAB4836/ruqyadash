import React from 'react'

const SettingsPopup = ({ isOpen, onClose, selectedFont, onFontChange, arabicFontSize, onFontSizeChange }) => {
  if (!isOpen) return null

  const fontOptions = [
    { id: 'KSARegular_B', name: 'KSA Regular', filename: 'KSARegular_B.ttf' },
    { id: 'MUHAMMADIBold', name: 'Muhammad Bold', filename: 'MUHAMMADIBold.ttf' },
    { id: 'Naskh-Nastaleeq', name: 'Naskh Nastaleeq', filename: 'Naskh-Nastaleeq-IndoPak-QWBW.ttf' },
    { id: 'PDMS_SALEEM', name: 'PDMS Saleem Quran', filename: 'PDMS_SALEEM_QURANFONTQESHIP_0.ttf' },
    { id: 'Quraniconstwo', name: 'Quran Icons Two', filename: 'Quraniconstwo.ttf' }
  ]

  const handleFontSelect = (fontId) => {
    onFontChange(fontId)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            aria-label="Close settings"
          >
            ×
          </button>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Arabic Font Size</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Small</span>
              <span className="text-sm text-gray-600">Large</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="70"
                max="150"
                step="10"
                value={arabicFontSize}
                onChange={(e) => onFontSizeChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((arabicFontSize - 70) / (150 - 70)) * 100}%, #E5E7EB ${((arabicFontSize - 70) / (150 - 70)) * 100}%, #E5E7EB 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>70%</span>
                <span>110%</span>
                <span>150%</span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-600">Current: {arabicFontSize}%</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div 
                className="arabic-text text-gray-700"
                style={{ 
                  fontFamily: `'${selectedFont}', 'Amiri Quran', serif`,
                  fontSize: `${arabicFontSize}%`
                }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Preview at {arabicFontSize}% size
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Arabic Font</h3>
          <div className="space-y-3">
            {fontOptions.map((font) => (
              <div key={font.id} className="border border-gray-200 rounded-lg p-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="arabicFont"
                    value={font.id}
                    checked={selectedFont === font.id}
                    onChange={() => handleFontSelect(font.id)}
                    className="mr-3 text-blue-500"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 mb-2">{font.name}</div>
                    <div 
                      className="arabic-text text-lg text-gray-700"
                      style={{ fontFamily: `'${font.id}', 'Amiri Quran', serif` }}
                    >
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      In the name of Allah, the Most Gracious, the Most Merciful
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPopup