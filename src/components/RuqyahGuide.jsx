import React from 'react'

const RuqyahGuide = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 md:p-10">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
              Choosing the Right Ruqyah Set
            </h1>
            <div className="w-16 h-1 bg-blue-500 mx-auto mb-6"></div>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              In this app, you'll find three collections of Quranic verses — each with its own purpose and ideal use. All are authentic, rooted in well-known Islamic practice, and can be read aloud for protection and healing.
            </p>

            <div className="space-y-8">
              <div className="border-l-4 border-blue-500 pl-6 bg-blue-50 py-4 pr-4 rounded-r-lg">
                <h2 className="text-xl font-bold text-blue-900 mb-3">
                  1. Short Ruqyah <span className="text-sm font-normal text-blue-700">(Quick daily protection – 7 verses)</span>
                </h2>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">When to use:</h4>
                    <ul className="text-gray-700 space-y-1 ml-4">
                      <li>• As part of your morning and evening adhkar</li>
                      <li>• Before sleeping</li>
                      <li>• In urgent situations (fear, sudden anxiety, bad dreams, suspected evil influence)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Why:</h4>
                    <p className="text-gray-700">Short but powerful set covering key verses like Al-Fatiha, Ayat al-Kursi, and the last verses of Al-Baqarah.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">How:</h4>
                    <p className="text-gray-700">Recite slowly, with focus, repeating as needed. You can blow lightly over yourself or loved ones after reciting.</p>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-6 bg-green-50 py-4 pr-4 rounded-r-lg">
                <h2 className="text-xl font-bold text-green-900 mb-3">
                  2. Manzil Verses <span className="text-sm font-normal text-green-700">(Traditional 33-verse protection set)</span>
                </h2>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">When to use:</h4>
                    <ul className="text-gray-700 space-y-1 ml-4">
                      <li>• Daily recitation for ongoing protection from sihr (magic), jinn, and evil eye</li>
                      <li>• When building spiritual resilience, even if no symptoms are present</li>
                      <li>• Can also be used as a full ruqyah set for treatment — many have done so successfully, including the compiler himself who, by Allah's permission, used these verses to cure himself from affliction</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Why:</h4>
                    <p className="text-gray-700">A time-tested collection recited by scholars and households for centuries, known for both prevention and cure.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">How:</h4>
                    <p className="text-gray-700">Recite the full set once in the morning and once in the evening. Read with focus, reflection, and firm trust in Allah — knowing with certainty that He alone grants shifa (healing).</p>
                  </div>
                  
                  <div className="bg-green-100 p-3 rounded mt-4">
                    <p className="text-green-800 text-sm">
                      <strong>Note:</strong> If the Full Ruqyah feels too long or overwhelming, the Manzil can be used instead — it has been effective for many, bi idhnillah.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-6 bg-purple-50 py-4 pr-4 rounded-r-lg">
                <h2 className="text-xl font-bold text-purple-900 mb-3">
                  3. Full Ruqyah Verses <span className="text-sm font-normal text-purple-700">(Comprehensive healing set – 32 cards)</span>
                </h2>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">When to use:</h4>
                    <ul className="text-gray-700 space-y-1 ml-4">
                      <li>• If you suspect or have confirmed spiritual affliction (sihr, jinn possession, severe evil eye)</li>
                      <li>• When symptoms are severe or persistent, or when you wish to "step up" from the Manzil for a more intensive approach</li>
                      <li>• During self-ruqyah sessions or when reading over water/olive oil for treatment</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">Why:</h4>
                    <p className="text-gray-700">Covers a wider range of relevant verses than Manzil, including specific ayahs against magic and disbelief, reminders of Allah's power, and calls for His help.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">How:</h4>
                    <ul className="text-gray-700 space-y-1 ml-4">
                      <li>• Sit facing Qiblah, in wudhu</li>
                      <li>• Recite each verse with strong conviction</li>
                      <li>• Blow over water, oil, or directly over yourself</li>
                      <li>• Repeat daily until symptoms improve — ideally combined with supplications, dhikr, and lifestyle purification</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Summary Table</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-2 font-semibold text-gray-900">Set</th>
                        <th className="text-left py-2 font-semibold text-gray-900">Main Use</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-2">
                      <tr className="border-b border-gray-200">
                        <td className="py-3 font-medium text-blue-700">Short Ruqyah</td>
                        <td className="py-3 text-gray-700">Quick daily protection, emergencies, and regular spiritual upkeep. Ideal as a light daily practice, and a first step for new readers.</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 font-medium text-green-700">Manzil Verses</td>
                        <td className="py-3 text-gray-700">Ongoing protection and healing. Suitable for prevention, early symptoms, or as a complete ruqyah for those who prefer a concise but proven set.</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium text-purple-700">Full Ruqyah</td>
                        <td className="py-3 text-gray-700">Intensive healing for severe or persistent affliction. Ideal as a "step up" from Manzil if symptoms do not improve, or for comprehensive treatment.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-700">
                <strong>Throughout this guide, you will see repeated reminders to rule out medical causes first.</strong> Spiritual and physical health often overlap — Islam encourages us to seek both spiritual remedies and medical treatment where needed.
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center mt-8">
            <button
              onClick={onBack}
              className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-6 py-3 transition-all duration-200 font-medium"
            >
              ← Back to Ruqyah Options
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RuqyahGuide