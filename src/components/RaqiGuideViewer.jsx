import React, { useState, useEffect } from 'react'

const RaqiGuideViewer = ({ onBack, isDarkMode }) => {
  const [htmlContent, setHtmlContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadHtmlContent = async () => {
      try {
        const response = await fetch('/raqiGuide.html')
        if (!response.ok) {
          throw new Error(`Failed to load HTML file: ${response.status}`)
        }
        const html = await response.text()
        setHtmlContent(html)
      } catch (err) {
        setError(err.message)
        console.error('Error loading raqiGuide.html:', err)
      } finally {
        setLoading(false)
      }
    }

    loadHtmlContent()
  }, [])

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-blue-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
        <div className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Loading...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`min-h-screen p-2 md:p-4 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-blue-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
        <div className="w-full md:max-w-4xl md:mx-auto">
          <button
            onClick={onBack}
            className={`flex items-center mb-4 transition-colors ${isDarkMode ? 'text-blue-300 hover:text-blue-100' : 'text-blue-600 hover:text-blue-800'}`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-red-900 text-red-200' : 'bg-red-50 text-red-800'}`}>
            <h2 className="text-xl font-bold mb-2">Error Loading Content</h2>
            <p>Failed to load raqiGuide.html: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen p-2 md:p-4 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-blue-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
      <div className="w-full md:max-w-4xl md:mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
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

        {/* Content */}
        <div 
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  )
}

export default RaqiGuideViewer