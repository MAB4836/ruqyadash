import React from 'react'

const ChildPage = ({ onBack, selectedFont, isDarkMode }) => {
  return (
    <div className={`min-h-screen p-0 md:p-4 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-blue-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
      <div className="w-full md:max-w-4xl md:mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-4 md:px-0">
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

        {/* Book Page Container */}
        <div className={`shadow-2xl md:rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800 md:border border-gray-600' : 'bg-white md:border border-blue-200'}`}>
          {/* Page Header */}
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Child Ruqyah Guide</h1>
            <p className="text-purple-100 text-sm md:text-base">
              Step-by-step Prophetic healing sequence for children
            </p>
          </div>

          {/* Content */}
          <div className="p-4 md:p-8 space-y-6 md:space-y-8">
            
            {/* Intention */}
            <div className="md:border-l-4 md:border-purple-400 md:pl-6">
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Step 1: Intention (Niyyah)</h3>
              
              <div className={`rounded-lg p-4 mb-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-center text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  Make the intention in your heart that this ruqyah is for healing by Allah's permission.
                </p>
              </div>
            </div>

            {/* Du'a 1 */}
            <div className="md:border-l-4 md:border-purple-400 md:pl-6">
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Step 2: Placing Hand on the Sick Area</h3>
              
              <div className={`rounded-lg p-4 mb-3 relative ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-center text-2xl leading-loose ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`} style={{ fontFamily: selectedFont }}>
                  بِسْمِ اللَّهِ<br/>
                  أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ
                </p>
                <span className="absolute -bottom-1 left-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                  7×
                </span>
              </div>
              
              <p className={`text-sm italic mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Transliteration:</strong> Bismillāh. A'ūdhu billāhi wa qudratihi min sharri mā ajidu wa uḥādhir.
              </p>
              
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Translation:</strong> In the Name of Allah. I seek refuge in Allah and His Power from the evil of what I feel and what I fear.
              </p>
              
              <div className={`rounded-lg p-4 border ${isDarkMode ? 'bg-purple-900/15 border-purple-700/30' : 'bg-purple-50/15 border-purple-200/30'}`}>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-purple-200' : 'text-purple-800'}`}>
                  <strong>Source:</strong> Muslim (2202) – Prophet ﷺ instructed to repeat 7 times.<br/>
                  <strong>Usage:</strong> Place your hand gently on the painful area. If using water or oil, recite over it and sprinkle a few drops around the child.
                </p>
              </div>
            </div>

            {/* Du'a 2 */}
            <div className="md:border-l-4 md:border-purple-400 md:pl-6">
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Step 3: Comprehensive Healing Du'ā</h3>
              
              <div className={`rounded-lg p-4 mb-3 relative ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-right text-2xl leading-loose ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`} style={{ fontFamily: selectedFont }}>
                  اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ، اشْفِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا
                </p>
                <span className="absolute -bottom-1 left-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                  3-7×
                </span>
              </div>
              
              <p className={`text-sm italic mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Transliteration:</strong> Allāhumma rabba-n-nās, adhhibi-l-ba's, ishfi anta-sh-Shāfī, lā shifā'a illā shifā'uk, shifā'an lā yughadiru saqaman.
              </p>
              
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Translation:</strong> O Allah, Lord of mankind, remove the suffering, heal (him/her), for You are the Healer. There is no cure except Your cure – a cure that leaves behind no illness.
              </p>
              
              <div className={`rounded-lg p-4 border ${isDarkMode ? 'bg-purple-900/15 border-purple-700/30' : 'bg-purple-50/15 border-purple-200/30'}`}>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-purple-200' : 'text-purple-800'}`}>
                  <strong>Source:</strong> Bukhārī (5743), Muslim (2191)<br/>
                  <strong>Usage:</strong> Recite over water or oil. The child can drink a little or you can anoint their forehead and hands. Repeat 3–7 times.
                </p>
              </div>
            </div>

            {/* Du'a 3 */}
            <div className="md:border-l-4 md:border-purple-400 md:pl-6">
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Step 4: Protection for Children (Ḥasan & Ḥusayn)</h3>
              
              <div className={`rounded-lg p-4 mb-3 relative ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-center text-2xl leading-loose ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`} style={{ fontFamily: selectedFont }}>
                  أُعِيذُكَ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ
                </p>
                <span className="absolute -bottom-1 left-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                  3×
                </span>
              </div>
              
              <p className={`text-sm italic mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Transliteration:</strong> U'īdhuka bi-kalimāti Allāhi-t-tāmmati min kulli shayṭānin wa hāmmatin wa min kulli 'aynin lāmmah.
              </p>
              
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Translation:</strong> I seek protection for you in the perfect words of Allah from every devil, poisonous creature, and from every harmful eye.
              </p>
              
              <div className={`rounded-lg p-4 border ${isDarkMode ? 'bg-purple-900/15 border-purple-700/30' : 'bg-purple-50/15 border-purple-200/30'}`}>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-purple-200' : 'text-purple-800'}`}>
                  <strong>Source:</strong> Abu Dawūd (1527), At-Tirmidhī (2055)<br/>
                  <strong>Usage:</strong> Recite over water and let the child drink a little, or lightly rub a few drops on their chest/back. Repeat 3 times.
                </p>
              </div>
            </div>

            {/* Du'a 4 */}
            <div className="md:border-l-4 md:border-purple-400 md:pl-6">
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Step 5: General Ruqyah for Sickness or Harm</h3>
              
              <div className={`rounded-lg p-4 mb-3 relative ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-center text-2xl leading-loose ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`} style={{ fontFamily: selectedFont }}>
                  بِسْمِ اللهِ أَرْقِيكَ مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ
                </p>
                <span className="absolute -bottom-1 left-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                  3-7×
                </span>
              </div>
              
              <p className={`text-sm italic mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Transliteration:</strong> Bismillāh arqīka min kulli shay'in yu'dhīka.
              </p>
              
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Translation:</strong> In the Name of Allah, I perform ruqyah for you from everything that harms you.
              </p>
              
              <div className={`rounded-lg p-4 border ${isDarkMode ? 'bg-purple-900/15 border-purple-700/30' : 'bg-purple-50/15 border-purple-200/30'}`}>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-purple-200' : 'text-purple-800'}`}>
                  <strong>Source:</strong> Sunnah practice / general ruqyah<br/>
                  <strong>Usage:</strong> Recite over water or oil. Sprinkle or anoint lightly over the child's body. Repeat 3–7 times.
                </p>
              </div>
            </div>

            {/* Closing */}
            <div className="md:border-l-4 md:border-purple-400 md:pl-6">
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Step 6: Closing Du'ā</h3>
              
              <div className={`rounded-lg p-4 mb-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-center text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  Make a personal supplication asking Allah for complete healing and protection. This can be in your own words.
                </p>
              </div>
            </div>

            {/* Quick Notes Section */}
            <div className={`rounded-lg p-6 mt-8 border ${isDarkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>Quick Notes</h3>
              <div className={`space-y-3 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                <p className="flex items-start">
                  <span className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>•</span>
                  <span>Always start with Bismillāh before beginning any step.</span>
                </p>
                <p className="flex items-start">
                  <span className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>•</span>
                  <span>Repeat the du'ā's with belief and sincerity.</span>
                </p>
                <p className="flex items-start">
                  <span className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>•</span>
                  <span>Can be done daily until healing occurs.</span>
                </p>
                <p className="flex items-start">
                  <span className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>•</span>
                  <span>Combine multiple du'ā's in one session for persistent illness.</span>
                </p>
                <p className="flex items-start">
                  <span className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>•</span>
                  <span>Maintain gentleness and patience when treating children.</span>
                </p>
                <p className="flex items-start">
                  <span className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>•</span>
                  <span>These supplications complement medical treatment and should not replace it.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChildPage