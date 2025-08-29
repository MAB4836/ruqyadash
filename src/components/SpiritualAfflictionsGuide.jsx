import React from 'react'

const SpiritualAfflictionsGuide = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 md:p-10">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
              Spiritual Afflictions Guide
            </h1>
            <div className="w-16 h-1 bg-blue-500 mx-auto mb-6"></div>
          </div>

          <div className="prose prose-gray max-w-none">
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
              <h2 className="text-xl font-bold text-blue-900 mb-4">Quick Guide: Am I Affected?</h2>
              <div className="space-y-3">
                <p className="text-blue-800 font-medium">If you think you might be affected by sihr (magic), evil eye, or jinn?</p>
                <p className="text-blue-700 font-medium">These cards give you:</p>
                <ul className="space-y-2 text-blue-700">
                  <li>• <strong>Key signs to look for</strong></li>
                  <li>• <strong>Safe first steps you can try today</strong></li>
                  <li>• <strong>When to seek medical or professional ruqyah help</strong></li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4 rounded-r">
                <p className="text-yellow-700"><strong>Remember:</strong> Many symptoms can also have medical causes — always check with a doctor.</p>
                <p className="text-yellow-700 mt-2 font-medium text-center">These Ruqyah steps can be taken in parallel with medical investigations.</p>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-6 bg-green-50 py-6 pr-6 mb-8 rounded-r-lg">
              <h2 className="text-xl font-bold text-green-900 mb-4">Introduction</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Spiritual afflictions such as sihr (magic), the evil eye, and jinn interference are real and mentioned in the Qur'an and Sunnah. However, they can be difficult to recognise because many symptoms overlap with medical or psychological conditions.
                </p>
                
                <div className="bg-green-100 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-3">This guide is designed to help you:</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>• Understand the most common symptoms linked to spiritual affliction</li>
                    <li>• Avoid jumping to conclusions without proper assessment</li>
                    <li>• Take safe, immediate steps you can do yourself</li>
                    <li>• Know when and how to seek further help from a qualified raqi or medical professional</li>
                  </ul>
                </div>
                
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-6 bg-purple-50 py-6 pr-6 mb-8 rounded-r-lg">
              <h2 className="text-xl font-bold text-purple-900 mb-4">How to Use This Guide</h2>
              <div className="space-y-4">
                <div className="bg-purple-100 p-4 rounded-lg">
                  <h4 className="font-bold text-purple-800 mb-3">Step-by-Step Process:</h4>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <span className="font-bold text-2xl mr-3 text-purple-800">1.</span>
                      <div className="text-purple-700">
                        <p className="font-semibold mb-1">Start with symptom assessment</p>
                        <p>Look through the symptoms described in the "Diagnosis and Help" section to see if anything matches your experience.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="font-bold text-2xl mr-3 text-purple-800">2.</span>
                      <div className="text-purple-700">
                        <p className="font-semibold mb-1">Try safe, immediate steps</p>
                        <p>Read the safety and self-test recommendations to try immediate ruqyah actions that you can perform yourself.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <span className="font-bold text-2xl mr-3 text-purple-800">3.</span>
                      <div className="text-purple-700">
                        <p className="font-semibold mb-1">Seek further guidance if needed</p>
                        <p>Refer to the app's dedicated sections on "Types of Sihr" and "Choosing a Raqi" if you need deeper information.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-3">Related Sections in App:</h4>
                  <div className="grid sm:grid-cols-1 gap-3">
                    <div className="bg-white p-3 rounded border-l-4 border-blue-400">
                      <h5 className="font-semibold text-blue-800">Sihr/Magic</h5>
                      <p className="text-gray-600 text-sm">Different types of magic and their effects</p>
                    </div>
                    <div className="bg-white p-3 rounded border-l-4 border-green-400">
                      <h5 className="font-semibold text-green-800">Diagnosis and Help</h5>
                      <p className="text-gray-600 text-sm">Comprehensive self-assessment guide</p>
                    </div>
                    <div className="bg-white p-3 rounded border-l-4 border-purple-400">
                      <h5 className="font-semibold text-purple-800">Ruqyah Verses</h5>
                      <p className="text-gray-600 text-sm">Essential verses for protection and healing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-bold text-orange-900 mb-4">Getting Started</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Now that you understand the purpose and structure of this guidance, you're ready to begin your assessment. Remember to approach this process with patience, seeking Allah's guidance through du'a, and maintaining a balanced perspective that considers both spiritual and medical factors.
                </p>
                
                <div className="bg-orange-100 p-4 rounded">
                  <h4 className="font-bold text-orange-800 mb-2">Next Steps:</h4>
                  <ol className="space-y-2 text-orange-700">
                    <li>1. Return to the Immediate Help menu</li>
                    <li>2. Select "Diagnosis and Help" for detailed symptom assessment</li>
                    <li>3. Follow the step-by-step guidance provided there</li>
                    <li>4. Consult the other app sections as recommended</li>
                  </ol>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r mb-4">
              <p className="text-red-700"><strong>Throughout this guide, you will see repeated reminders to rule out medical causes first.</strong> Spiritual and physical health often overlap — Islam encourages us to seek both spiritual remedies and medical treatment where needed.</p>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Important Note:</h4>
              <p className="text-yellow-700">This guide is not a replacement for medical advice or treatment — it is a starting point to help you recognise possible signs and take beneficial action. Always prioritize professional medical consultation for persistent or concerning symptoms.</p>
            </div>
          </div>

          <div className="flex justify-center items-center mt-8">
            <button
              onClick={onBack}
              className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-6 py-3 transition-all duration-200 font-medium"
            >
              ← Back to Immediate Help
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpiritualAfflictionsGuide