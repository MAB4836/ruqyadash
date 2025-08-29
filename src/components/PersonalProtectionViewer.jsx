import React, { useEffect } from 'react'

const PersonalProtectionViewer = ({ onBack, isDarkMode }) => {
  useEffect(() => {
    // Load the HTML file content into an iframe
    const iframe = document.getElementById('personal-protection-iframe')
    if (iframe) {
      iframe.src = '/personalProtection.html'
    }
  }, [])

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header with back button */}
      <div className={`sticky top-0 z-10 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className={`flex items-center transition-colors ${isDarkMode ? 'text-blue-300 hover:text-blue-100' : 'text-blue-600 hover:text-blue-800'}`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
      </div>

      {/* iframe container */}
      <div className="w-full h-full">
        <iframe
          id="personal-protection-iframe"
          title="Personal Protection Guide"
          className="w-full min-h-screen border-0"
          style={{ height: 'calc(100vh - 73px)' }}
        />
      </div>
    </div>
  )
}

export default PersonalProtectionViewer