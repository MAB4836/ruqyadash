import React from 'react'

const MorningAdhkar = ({ onBack, selectedFont }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Book Page Container */}
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden border border-blue-200">
          {/* Page Header */}
          <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white p-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Core Morning & Evening Adhkār</h1>
            <p className="text-blue-100 text-sm md:text-base">
              From Fajr until sunrise, and from 'Asr until sunset
            </p>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-8">
            
            {/* Āyah al-Kursī */}
            <div className="border-l-4 border-blue-400 pl-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Āyah al-Kursī [Surah al-Baqarah 2:255]</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-3 relative">
                <p className="text-right text-2xl leading-loose text-gray-800" style={{ fontFamily: selectedFont }}>
                  اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ
                </p>
                <span className="absolute -bottom-1 left-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  Once
                </span>
              </div>
              
              <p className="text-gray-700 text-sm italic mb-3">
                <strong>Transliteration:</strong> Allāhu lā ilāha illā huwa al-ḥayyu al-qayyūm, lā ta'khudhuhu sinatun wa lā nawm, lahu mā fī as-samāwāti wa mā fī al-arḍ, man dhā alladhī yashfa'u 'indahu illā bi-idhnih, ya'lamu mā bayna aydīhim wa mā khalfahum, wa lā yuḥīṭūna bi-shay'in min 'ilmihi illā bi-mā shā', wasi'a kursiyyuhu as-samāwāti wa al-arḍ, wa lā ya'ūduhu ḥifẓuhumā, wa huwa al-'aliyyu al-'aẓīm.
              </p>
              
              <p className="text-gray-700 text-sm mb-4">
                <strong>Translation:</strong> Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm leading-relaxed">
                  <strong>Source:</strong> Sahih al-Bukhari (2311) — Whoever recites it in the morning is protected until evening, and in the evening until morning.
                </p>
                <span className="absolute -bottom-1 left-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  Once
                </span>
              </div>
            </div>

            {/* Last Three Surahs */}
            <div className="border-l-4 border-blue-400 pl-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Last Three Surahs of The Quran</h3>
              <div className="bg-gray-50 rounded-lg p-6 mb-3 text-center">
                <p className="text-gray-700 font-semibold mb-2">Surah Ikhlas (112) — 3× times</p>
                <p className="text-gray-700 font-semibold mb-2">Surah Falaq (113) — 3× times</p>
                <p className="text-gray-700 font-semibold">Surah Nas (114) — 3× times</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-green-800 text-sm leading-relaxed">
                  <strong>Source:</strong> Abu Dawūd 5082, Tirmidhi 3575 — The Prophet ﷺ would recite them for protection.
                </p>
                <span className="absolute -bottom-1 left-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  Once
                </span>
              </div>
            </div>

            {/* Bismillāhilladhī lā yaḍurru... */}
            <div className="border-l-4 border-blue-400 pl-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Protection from Harm</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-3 relative">
                <p className="text-center text-2xl leading-loose text-gray-800" style={{ fontFamily: selectedFont }}>
                  بِسْمِ اللهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ العَلِيمُ
                </p>
                <span className="absolute -bottom-1 left-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  3×
                </span>
              </div>
              
              <p className="text-gray-700 text-sm italic mb-3">
                <strong>Transliteration:</strong> Bismillāhilladhī lā yaḍurru ma'a ismihī shay'un fī al-arḍi wa lā fī as-samā'i wa huwa as-samī'u al-'alīm.
              </p>
              
              <p className="text-gray-700 text-sm mb-4">
                <strong>Translation:</strong> In the name of Allah, with whose name nothing on earth or in the heavens can cause harm, and He is the All-Hearing, All-Knowing.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm leading-relaxed">
                  <strong>Source:</strong> Abu Dawūd 5088 — Guarantees protection from harm that day/night.
                </p>
                <span className="absolute -bottom-1 left-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  Once
                </span>
              </div>
            </div>

            {/* A'ūdhu bi-kalimātillāhi... */}
            <div className="border-l-4 border-blue-400 pl-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Seeking Refuge in Allah's Words</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-3 relative">
                <p className="text-center text-2xl leading-loose text-gray-800" style={{ fontFamily: selectedFont }}>
                  أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ
                </p>
                <span className="absolute -bottom-1 left-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  Once
                </span>
              </div>
              
              <p className="text-gray-700 text-sm italic mb-3">
                <strong>Transliteration:</strong> A'ūdhu bi-kalimātillāhi at-tāmmāti min sharri mā khalaq.
              </p>
              
              <p className="text-gray-700 text-sm mb-4">
                <strong>Translation:</strong> I seek refuge in the perfect words of Allah from the evil of what He has created.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm leading-relaxed">
                  <strong>Source:</strong> Muslim 2708 — Complete protection from evil.
                </p>
                <span className="absolute -bottom-1 left-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  Once
                </span>
              </div>
            </div>

            {/* Radītu billāhi rabban... */}
            <div className="border-l-4 border-blue-400 pl-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Declaration of Contentment</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-3 relative">
                <p className="text-center text-2xl leading-loose text-gray-800" style={{ fontFamily: selectedFont }}>
                  رَضِيتُ بِاللهِ رَبًّا وَبِالإِسْلَامِ دِينًا وَبِمُحَمَّدٍ نَبِيًّا
                </p>
                <span className="absolute -bottom-1 left-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  3×
                </span>
              </div>
              
              <p className="text-gray-700 text-sm italic mb-3">
                <strong>Transliteration:</strong> Radītu billāhi rabban wa bil-Islāmi dīnan wa bi-Muḥammadin nabiyyan.
              </p>
              
              <p className="text-gray-700 text-sm mb-4">
                <strong>Translation:</strong> I am pleased with Allah as my Lord, Islam as my religion, and Muhammad as my Prophet.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm leading-relaxed">
                  <strong>Source:</strong> Abu Dawūd 5072 — Allah will be pleased with whoever says it.
                </p>
                <span className="absolute -bottom-1 left-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  Once
                </span>
              </div>
            </div>

            {/* Sayyidul Istighfār */}
            <div className="border-l-4 border-blue-400 pl-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Sayyidul Istighfār (Master of Seeking Forgiveness)</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-3 relative">
                <p className="text-right text-2xl leading-loose text-gray-800" style={{ fontFamily: selectedFont }}>
                  اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ
                </p>
                <span className="absolute -bottom-1 left-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  Once
                </span>
              </div>
              
              <p className="text-gray-700 text-sm italic mb-3">
                <strong>Transliteration:</strong> Allāhumma anta rabbī lā ilāha illā ant, khalaqtanī wa ana 'abduk, wa ana 'alā 'ahdika wa wa'dika mā istaṭa't, a'ūdhu bika min sharri mā ṣana't, abū'u laka bi-ni'matika 'alayy, wa abū'u laka bi-dhanbī fa-ghfir lī fa-innahu lā yaghfiru adh-dhunūba illā ant.
              </p>
              
              <p className="text-gray-700 text-sm mb-4">
                <strong>Translation:</strong> O Allah, You are my Lord, there is no god except You. You created me and I am Your servant, and I am upon Your covenant and promise as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge Your blessing upon me and I acknowledge my sin, so forgive me, for indeed none forgives sins except You.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm leading-relaxed">
                  <strong>Source:</strong> Bukhari 6306 — Whoever says it in the morning with conviction and dies that day enters Jannah (and same for evening).
                </p>
                <span className="absolute -bottom-1 left-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  Once
                </span>
              </div>
            </div>

            {/* Lā ilāha illallāh waḥdahu... */}
            <div className="border-l-4 border-blue-400 pl-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Du'ā' for Praise and Protection</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-3 relative">
                <p className="text-center text-2xl leading-loose text-gray-800" style={{ fontFamily: selectedFont }}>
                  لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ المُلْكُ وَلَهُ الحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ
                </p>
                <span className="absolute -bottom-3 left-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  10× each morning/evening
                </span>
              </div>
              
              <p className="text-gray-700 text-sm italic mb-3 mt-6">
                <strong>Transliteration:</strong> Lā ilāha illallāh waḥdahu lā sharīka lah, lahul-mulku wa lahul-ḥamdu wa huwa 'alā kulli shay'in qadīr.
              </p>
              
              <p className="text-gray-700 text-sm mb-4">
                <strong>Translation:</strong> There is no god except Allah alone, without partner. To Him belongs the dominion and to Him belongs all praise, and He has power over all things.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm leading-relaxed">
                  <strong>Source:</strong> Muslim 2691 — Heavy reward, protection from shayṭān. Reciting this dhikr 100 times in a single day grants protection from Shayṭān, erases sins, and earns abundant reward (Sahih al-Bukhārī 3293, Sahih Muslim 2691). Scholars also recommend it as spiritual protection for those experiencing harm or influence from siḥr or jinn.
                </p>
                <span className="absolute -bottom-1 left-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  Once
                </span>
              </div>
            </div>

            {/* Practical Advice Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Practical Advice</h3>
              <div className="space-y-3 text-blue-800">
                <p className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>If you're busy, start with just Ayah al-Kursi + 3 Quls + Bismillāhilladhī... morning and evening.</span>
                </p>
                <p className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Add others over time gradually.</span>
                </p>
                <p className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Consistency is better than trying to read 20 adhkār for one week then stopping.</span>
                </p>
                <p className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Remember, the Prophet ﷺ often taught these as protection and connection with Allah, not as a checklist.</span>
                </p>
                <p className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Focus on understanding the meaning and feeling the connection with Allah during recitation.</span>
                </p>
                <span className="absolute -bottom-1 left-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  Once
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MorningAdhkar