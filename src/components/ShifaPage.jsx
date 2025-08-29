import React from 'react'

const ShifaPage = ({ onBack, selectedFont, isDarkMode }) => {
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
          <div className="bg-gradient-to-r from-green-400 to-teal-400 text-white p-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Shifā' - Healing Du'ās</h1>
            <p className="text-green-100 text-sm md:text-base">
              Authentic supplications from the Prophet ﷺ for healing and protection
            </p>
          </div>

          {/* Content */}
          <div className="p-4 md:p-8 space-y-6 md:space-y-8">
            
            {/* Du'a 1 */}
            <div className="md:border-l-4 md:border-green-400 md:pl-6">
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>1. General Healing Du'ā</h3>
              
              <div className={`rounded-lg p-4 mb-3 relative ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-center text-2xl leading-loose ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`} style={{ fontFamily: selectedFont }}>
                  بِسْمِ اللَّهِ أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ
                </p>
                <span className="absolute -bottom-1 left-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                  7×
                </span>
              </div>
              
              <p className={`text-sm italic mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Transliteration:</strong> Bismillāh. A'ūdhu billāhi wa qudratihi min sharri mā ajidu wa uḥādhir.
              </p>
              
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Translation:</strong> In the Name of Allah. I seek refuge in Allah and His Power from the evil of what I feel and what I fear.
              </p>
              
              <div className={`rounded-lg p-4 border ${isDarkMode ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200'}`}>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>
                  <strong>Reference:</strong> Muslim (2202)<br/>
                  <strong>Instructions:</strong> Place your hand on the sick area and repeat 7 times. Can be used on adults or children.
                </p>
              </div>
            </div>

            {/* Du'a 2 */}
            <div className="md:border-l-4 md:border-green-400 md:pl-6">
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>2. The Prophet's Healing Du'ā</h3>
              
              <div className={`rounded-lg p-4 mb-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-right text-2xl leading-loose ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`} style={{ fontFamily: selectedFont }}>
                  اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ، اشْفِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا
                </p>
              </div>
              
              <p className={`text-sm italic mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Transliteration:</strong> Allāhumma rabba-n-nās, adhhibi-l-ba's, ishfi anta-sh-Shāfī, lā shifā'a illā shifā'uk, shifā'an lā yughadiru saqaman.
              </p>
              
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Translation:</strong> O Allah, Lord of mankind, remove the suffering, heal (him/her), for You are the Healer. There is no cure except Your cure – a cure that leaves behind no illness.
              </p>
              
              <div className={`rounded-lg p-4 border ${isDarkMode ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200'}`}>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>
                  <strong>Reference:</strong> Bukhārī (5743), Muslim (2191)<br/>
                  <strong>Instructions:</strong> Recite for anyone sick, adult or child. Can be said over water or oil for ruqyah.
                </p>
              </div>
            </div>

            {/* Du'a 3 */}
            <div className="md:border-l-4 md:border-green-400 md:pl-6">
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>3. Protection for Children</h3>
              
              <div className={`rounded-lg p-4 mb-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-center text-2xl leading-loose ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`} style={{ fontFamily: selectedFont }}>
                  أُعِيذُكَ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ
                </p>
              </div>
              
              <p className={`text-sm italic mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Transliteration:</strong> U'īdhuka bi-kalimāti Allāhi-t-tāmmati min kulli shayṭānin wa hāmmatin wa min kulli 'aynin lāmmah.
              </p>
              
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Translation:</strong> I seek protection for you in the perfect words of Allah from every devil, poisonous creature, and from every harmful eye.
              </p>
              
              <div className={`rounded-lg p-4 border ${isDarkMode ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200'}`}>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>
                  <strong>Reference:</strong> Abu Dawūd (1527), At-Tirmidhī (2055)<br/>
                  <strong>Instructions:</strong> Specifically for children. The Prophet ﷺ used this for Ḥasan and Ḥusayn (ra). Can also be said over water for the child to drink.
                </p>
              </div>
            </div>

            {/* Du'a 4 */}
            <div className="md:border-l-4 md:border-green-400 md:pl-6">
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>4. General Ruqyah for Protection</h3>
              
              <div className={`rounded-lg p-4 mb-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-center text-2xl leading-loose ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`} style={{ fontFamily: selectedFont }}>
                  بِسْمِ اللهِ أَرْقِيكَ مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ
                </p>
              </div>
              
              <p className={`text-sm italic mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Transliteration:</strong> Bismillāh arqīka min kulli shay'in yu'dhīka.
              </p>
              
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Translation:</strong> In the Name of Allah, I perform ruqyah for you from everything that harms you.
              </p>
              
              <div className={`rounded-lg p-4 border ${isDarkMode ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200'}`}>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>
                  <strong>Reference:</strong> Sunnah practice<br/>
                  <strong>Instructions:</strong> Can be recited over the child or adult. Also suitable for general protection from illness.
                </p>
              </div>
            </div>

            {/* Practical Advice Section */}
            <div className={`rounded-lg p-6 mt-8 border ${isDarkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>Practical Guidelines</h3>
              <div className={`space-y-3 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                <p className="flex items-start">
                  <span className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>•</span>
                  <span>These du'ās can be recited at any time when someone is sick or needs healing.</span>
                </p>
                <p className="flex items-start">
                  <span className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>•</span>
                  <span>Place your hand gently on the affected area while reciting (if appropriate).</span>
                </p>
                <p className="flex items-start">
                  <span className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>•</span>
                  <span>You can blow lightly after reciting each du'ā.</span>
                </p>
                <p className="flex items-start">
                  <span className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>•</span>
                  <span>These can be recited over water, which can then be drunk or used for washing.</span>
                </p>
                <p className="flex items-start">
                  <span className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>•</span>
                  <span>Always maintain sincere intention and trust in Allah's healing power.</span>
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

export default ShifaPage