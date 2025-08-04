import { useState } from 'react'

function App() {
  const [currentCard, setCurrentCard] = useState(1)
  const [repetitionCounts, setRepetitionCounts] = useState({})
  const totalCards = 32

  const nextCard = () => {
    setCurrentCard(prev => (prev < totalCards ? prev + 1 : prev))
  }

  const prevCard = () => {
    setCurrentCard(prev => (prev > 1 ? prev - 1 : prev))
  }

  const getCardContent = (cardNumber) => {
    if (cardNumber === 1) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">Al-Fatiha (The Opening)</h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-3 sm:space-y-4 md:space-y-5 text-gray-900">
            <p className="mb-4 sm:mb-5 text-green-800 font-semibold">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
            <p className="flex justify-between"><span>الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ</span><span className="text-sm text-gray-500 ml-4">﴿١﴾</span></p>
            <p className="flex justify-between"><span>الرَّحْمَنِ الرَّحِيمِ</span><span className="text-sm text-gray-500 ml-4">﴿٢﴾</span></p>
            <p className="flex justify-between"><span>مَالِكِ يَوْمِ الدِّينِ</span><span className="text-sm text-gray-500 ml-4">﴿٣﴾</span></p>
            <p className="flex justify-between"><span>إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ</span><span className="text-sm text-gray-500 ml-4">﴿٤﴾</span></p>
            <p className="flex justify-between"><span>اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ</span><span className="text-sm text-gray-500 ml-4">﴿٥﴾</span></p>
            <p className="flex justify-between"><span>صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ</span><span className="text-sm text-gray-500 ml-4">﴿٦﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 2) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">Al-Baqarah (1 to 5)</h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-3 sm:space-y-4 md:space-y-5 text-gray-900">
            <p className="mb-4 sm:mb-5 text-green-800 font-semibold">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
            <p className="flex justify-between"><span>الم</span><span className="text-sm text-gray-500 ml-4">﴿١﴾</span></p>
            <p className="flex justify-between"><span>ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِّلْمُتَّقِينَ</span><span className="text-sm text-gray-500 ml-4">﴿٢﴾</span></p>
            <p className="flex justify-between"><span>الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ</span><span className="text-sm text-gray-500 ml-4">﴿٣﴾</span></p>
            <p className="flex justify-between"><span>وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ</span><span className="text-sm text-gray-500 ml-4">﴿٤﴾</span></p>
            <p className="flex justify-between"><span>أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ</span><span className="text-sm text-gray-500 ml-4">﴿٥﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 3) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">
            Al-Baqarah (<span className="text-red-500">6 - 10</span>)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-3 sm:space-y-4 md:space-y-5 text-gray-900">
            <p className="flex justify-between"><span>إِنَّ الَّذِينَ كَفَرُوا سَوَاءٌ عَلَيْهِمْ أَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ</span><span className="text-sm text-gray-500 ml-4">﴿٦﴾</span></p>
            <p className="flex justify-between"><span>خَتَمَ اللَّهُ عَلَىٰ قُلُوبِهِمْ وَعَلَىٰ سَمْعِهِمْ وَعَلَىٰ أَبْصَارِهِمْ غِشَاوَةٌ وَلَهُمْ عَذَابٌ عَظِيمٌ</span><span className="text-sm text-gray-500 ml-4">﴿٧﴾</span></p>
            <p className="flex justify-between"><span>وَمِنَ النَّاسِ مَن يَقُولُ آمَنَّا بِاللَّهِ وَبِالْيَوْمِ الْآخِرِ وَمَا هُم بِمُؤْمِنِينَ</span><span className="text-sm text-gray-500 ml-4">﴿٨﴾</span></p>
            <p className="flex justify-between"><span>يُخَادِعُونَ اللَّهَ وَالَّذِينَ آمَنُوا وَمَا يَخْدَعُونَ إِلَّا أَنفُسَهُمْ وَمَا يَشْعُرُونَ</span><span className="text-sm text-gray-500 ml-4">﴿٩﴾</span></p>
            <p className="flex justify-between"><span>فِي قُلُوبِهِم مَّرَضٌ فَزَادَهُمُ اللَّهُ مَرَضًا وَلَهُمْ عَذَابٌ أَلِيمٌ بِمَا كَانُوا يَكْذِبُونَ</span><span className="text-sm text-gray-500 ml-4">﴿١٠﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 4) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">
            Al-Baqarah (<span className="text-red-500">102 & 108</span>)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-6 sm:space-y-7 md:space-y-8 text-gray-900" style={{lineHeight: '2.5'}}>
            <p className="flex justify-between"><span>وَاتَّبَعُوا مَا تَتْلُو الشَّيَاطِينُ عَلَىٰ مُلْكِ سُلَيْمَانَ وَمَا كَفَرَ سُلَيْمَانُ وَلَٰكِنَّ الشَّيَاطِينَ كَفَرُوا يُعَلِّمُونَ النَّاسَ السِّحْرَ وَمَا أُنزِلَ عَلَى الْمَلَكَيْنِ بِبَابِلَ هَارُوتَ وَمَارُوتَ وَمَا يُعَلِّمَانِ مِنْ أَحَدٍ حَتَّىٰ يَقُولَا إِنَّمَا نَحْنُ فِتْنَةٌ فَلَا تَكْفُرْ فَيَتَعَلَّمُونَ مِنْهُمَا مَا يُفَرِّقُونَ بِهِ بَيْنَ الْمَرْءِ وَزَوْجِهِ وَمَا هُم بِضَارِّينَ بِهِ مِنْ أَحَدٍ إِلَّا بِإِذْنِ اللَّهِ وَيَتَعَلَّمُونَ مَا يَضُرُّهُمْ وَلَا يَنفَعُهُمْ وَلَقَدْ عَلِمُوا لَمَنِ اشْتَرَاهُ مَا لَهُ فِي الْآخِرَةِ مِنْ خَلَاقٍ وَلَبِئْسَ مَا شَرَوْا بِهِ أَنفُسَهُمْ لَوْ كَانُوا يَعْلَمُونَ</span><span className="text-sm text-gray-500 ml-4">﴿١٠٢﴾</span></p>
            <p className="flex justify-between"><span>أَمْ تُرِيدُونَ أَن تَسْأَلُوا رَسُولَكُمْ كَمَا سُئِلَ مُوسَىٰ مِن قَبْلُ وَمَن يَتَبَدَّلِ الْكُفْرَ بِالْإِيمَانِ فَقَدْ ضَلَّ سَوَاءَ السَّبِيلِ</span><span className="text-sm text-gray-500 ml-4">﴿١٠٨﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 5) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">
            Ayat Al-Kursi (<span className="text-black">255</span>)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-6 sm:space-y-7 md:space-y-8 text-gray-900" style={{lineHeight: '2.5'}}>
            <p className="flex justify-between"><span>اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ</span><span className="text-sm text-gray-500 ml-4">﴿٢٥٥﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 6) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">
            Al-Baqarah (256 & 257)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-6 sm:space-y-7 md:space-y-8 text-gray-900" style={{lineHeight: '2.5'}}>
            <p className="flex justify-between"><span>لَا إِكْرَاهَ فِي الدِّينِ قَد تَّبَيَّنَ الرُّشْدُ مِنَ الْغَيِّ فَمَن يَكْفُرْ بِالطَّاغُوتِ وَيُؤْمِن بِاللَّهِ فَقَدِ اسْتَمْسَكَ بِالْعُرْوَةِ الْوُثْقَىٰ لَا انفِصَامَ لَهَا وَاللَّهُ سَمِيعٌ عَلِيمٌ</span><span className="text-sm text-gray-500 ml-4">﴿٢٥٦﴾</span></p>
            <p className="flex justify-between"><span>اللَّهُ وَلِيُّ الَّذِينَ آمَنُوا يُخْرِجُهُم مِّنَ الظُّلُمَاتِ إِلَى النُّورِ وَالَّذِينَ كَفَرُوا أَوْلِيَاؤُهُمُ الطَّاغُوتُ يُخْرِجُونَهُم مِّنَ النُّورِ إِلَى الظُّلُمَاتِ أُولَٰئِكَ أَصْحَابُ النَّارِ هُمْ فِيهَا خَالِدُونَ</span><span className="text-sm text-gray-500 ml-4">﴿٢٥٧﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 7) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">
            Al-Baqarah (284)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-6 sm:space-y-7 md:space-y-8 text-gray-900" style={{lineHeight: '2.5'}}>
            <p className="flex justify-between"><span>لِّلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ وَإِن تُبْدُوا مَا فِي أَنفُسِكُمْ أَوْ تُخْفُوهُ يُحَاسِبْكُم بِهِ اللَّهُ فَيَغْفِرُ لِمَن يَشَاءُ وَيُعَذِّبُ مَن يَشَاءُ وَاللَّهُ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ</span><span className="text-sm text-gray-500 ml-4">﴿٢٨٤﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 8) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">
            Al-Baqarah (285)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-6 sm:space-y-7 md:space-y-8 text-gray-900" style={{lineHeight: '2.5'}}>
            <p className="flex justify-between"><span>آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ وَقَالُوا سَمِعْنَا وَأَطَعْنَا غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ</span><span className="text-sm text-gray-500 ml-4">﴿٢٨٥﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 9) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">
            Al-Baqarah (286)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-6 sm:space-y-7 md:space-y-8 text-gray-900" style={{lineHeight: '2.5'}}>
            <p className="flex justify-between"><span>لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ</span><span className="text-sm text-gray-500 ml-4">﴿٢٨٦﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 10) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">
            Ali Imran (18 - <span className="text-red-500">19</span>)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-6 sm:space-y-7 md:space-y-8 text-gray-900" style={{lineHeight: '2.5'}}>
            <p className="flex justify-between"><span>شَهِدَ اللَّهُ أَنَّهُ لَا إِلَٰهَ إِلَّا هُوَ وَالْمَلَائِكَةُ وَأُولُو الْعِلْمِ قَائِمًا بِالْقِسْطِ لَا إِلَٰهَ إِلَّا هُوَ الْعَزِيزُ الْحَكِيمُ</span><span className="text-sm text-gray-500 ml-4">﴿١٨﴾</span></p>
            <p className="flex justify-between"><span>إِنَّ الدِّينَ عِندَ اللَّهِ الْإِسْلَامُ وَمَا اخْتَلَفَ الَّذِينَ أُوتُوا الْكِتَابَ إِلَّا مِن بَعْدِ مَا جَاءَهُمُ الْعِلْمُ بَغْيًا بَيْنَهُمْ وَمَن يَكْفُرْ بِآيَاتِ اللَّهِ فَإِنَّ اللَّهَ سَرِيعُ الْحِسَابِ</span><span className="text-sm text-gray-500 ml-4">﴿١٩﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 11) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">
            Ali Imran (26 - 27)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-6 sm:space-y-7 md:space-y-8 text-gray-900" style={{lineHeight: '2.5'}}>
            <p className="flex justify-between"><span>قُلِ اللَّهُمَّ مَالِكَ الْمُلْكِ تُؤْتِي الْمُلْكَ مَن تَشَاءُ وَتَنزِعُ الْمُلْكَ مِمَّن تَشَاءُ وَتُعِزُّ مَن تَشَاءُ وَتُذِلُّ مَن تَشَاءُ بِيَدِكَ الْخَيْرُ إِنَّكَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ</span><span className="text-sm text-gray-500 ml-4">﴿٢٦﴾</span></p>
            <p className="flex justify-between"><span>تُولِجُ اللَّيْلَ فِي النَّهَارِ وَتُولِجُ النَّهَارَ فِي اللَّيْلِ وَتُخْرِجُ الْحَيَّ مِنَ الْمَيِّتِ وَتُخْرِجُ الْمَيِّتَ مِنَ الْحَيِّ وَتَرْزُقُ مَن تَشَاءُ بِغَيْرِ حِسَابٍ</span><span className="text-sm text-gray-500 ml-4">﴿٢٧﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 12) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-green-600">
            Al-An'am (103)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-6 sm:space-y-7 md:space-y-8 text-gray-900" style={{lineHeight: '2.5'}}>
            <p className="flex justify-between"><span>لَا تُدْرِكُهُ الْأَبْصَارُ وَهُوَ يُدْرِكُ الْأَبْصَارَ وَهُوَ اللَّطِيفُ الْخَبِيرُ</span><span className="text-sm text-gray-500 ml-4">﴿١٠٣﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 13) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">
            Al-A'raf (54 - 56)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-6 sm:space-y-7 md:space-y-8 text-gray-900" style={{lineHeight: '2.5'}}>
            <p className="flex justify-between"><span>إِنَّ رَبَّكُمُ اللَّهُ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ فِي سِتَّةِ أَيَّامٍ ثُمَّ اسْتَوَىٰ عَلَى الْعَرْشِ يُغْشِي اللَّيْلَ النَّهَارَ يَطْلُبُهُ حَثِيثًا وَالشَّمْسَ وَالْقَمَرَ وَالنُّجُومَ مُسَخَّرَاتٍ بِأَمْرِهِ أَلَا لَهُ الْخَلْقُ وَالْأَمْرُ تَبَارَكَ اللَّهُ رَبُّ الْعَالَمِينَ</span><span className="text-sm text-gray-500 ml-4">﴿٥٤﴾</span></p>
            <p className="flex justify-between"><span>ادْعُوا رَبَّكُم تَضَرُّعًا وَخُفْيَةً إِنَّهُ لَا يُحِبُّ الْمُعْتَدِينَ</span><span className="text-sm text-gray-500 ml-4">﴿٥٥﴾</span></p>
            <p className="flex justify-between"><span>وَلَا تُفْسِدُوا فِي الْأَرْضِ بَعْدَ إِصْلَاحِهَا وَادْعُوهُ خَوْفًا وَطَمَعًا إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ</span><span className="text-sm text-gray-500 ml-4">﴿٥٦﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 14) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-gray-800">
            Al-A'raf (<span className="text-green-500">117 - 122</span>)
          </h2>
          <div className="arabic-text text-base sm:text-lg md:text-xl space-y-2 sm:space-y-3 md:space-y-4 text-gray-900" style={{lineHeight: '1.8'}}>
            <p className="flex justify-between"><span>وَأَوْحَيْنَا إِلَىٰ مُوسَىٰ أَنْ أَلْقِ عَصَاكَ فَإِذَا هِيَ تَلْقَفُ مَا يَأْفِكُونَ</span><span className="text-sm text-gray-500 ml-4">﴿١١٧﴾</span></p>
            <p className="flex justify-between"><span>وَأَلْقُوا مَا فِي أَيْمَانِهِمْ فَإِذَا هِيَ تَقْاب سِحْرَهُمْ</span><span className="text-sm text-gray-500 ml-4">﴿١١٨﴾</span></p>
            <p className="flex justify-between"><span>فَوَقَعَ الْحَقُّ وَبَطَلَ مَا كَانُوا يَعْمَلُونَ</span><span className="text-sm text-gray-500 ml-4">﴿١١٩﴾</span></p>
            <p className="flex justify-between"><span>فَغُلِبُوا هُنَالِكَ وَانقَلَبُوا صَاغِرِينَ</span><span className="text-sm text-gray-500 ml-4">﴿١٢٠﴾</span></p>
            <p className="flex justify-between"><span>وَأُلْقِيَ السَّحَرَةُ سَاجِدِينَ</span><span className="text-sm text-gray-500 ml-4">﴿١٢١﴾</span></p>
            <p className="flex justify-between"><span>قَالُوا آمَنَّا بِرَبِّ الْعَالَمِينَ</span><span className="text-sm text-gray-500 ml-4">﴿١٢٢﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 15) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">
            Al-Anfal (<span className="text-green-500">17</span>)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-6 sm:space-y-7 md:space-y-8 text-gray-900" style={{lineHeight: '2.5'}}>
            <p className="flex justify-between"><span>فَلَمْ تَقْتُلُوهُمْ وَلَٰكِنَّ اللَّهَ قَتَلَهُمْ وَمَا رَمَيْتَ إِذْ رَمَيْتَ وَلَٰكِنَّ اللَّهَ رَمَىٰ وَلِيُبْلِيَ الْمُؤْمِنِينَ بَلَاءً حَسَنًا إِنَّ اللَّهَ سَمِيعٌ عَلِيمٌ</span><span className="text-sm text-gray-500 ml-4">﴿١٧﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 16) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">
            Yunus (<span className="text-green-500">79 - 82</span>)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-6 sm:space-y-7 md:space-y-8 text-gray-900" style={{lineHeight: '2.5'}}>
            <p className="flex justify-between"><span>وَقَالَ فِرْعَوْنُ ائْتُونِي بِكُلِّ سَاحِرٍ عَلِيمٍ</span><span className="text-sm text-gray-500 ml-4">﴿٧٩﴾</span></p>
            <p className="flex justify-between"><span>فَلَمَّا جَاءَ السَّحَرَةُ قَالَ مُوسَىٰ أَلْقُوا مَا أَنتُم مُلْقُونَ</span><span className="text-sm text-gray-500 ml-4">﴿٨٠﴾</span></p>
            <p className="flex justify-between"><span>فَلَمَّا أَلْقَوْا قَالَ مُوسَىٰ مَا جِئْتُم بِهِ السِّحْرُ إِنَّ اللَّهَ سَيُبْطِلُهُ إِنَّ اللَّهَ لَا يُصْلِحُ عَمَلَ الْمُفْسِدِينَ</span><span className="text-sm text-gray-500 ml-4">﴿٨١﴾</span></p>
            <p className="flex justify-between"><span>وَيُحِقُّ اللَّهُ الْحَقَّ بِكَلِمَاتِهِ وَلَوْ كَرِهَ الْمُجْرِمُونَ</span><span className="text-sm text-gray-500 ml-4">﴿٨٢﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 17) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">
            Hud (<span className="text-green-500">56</span>)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-6 sm:space-y-7 md:space-y-8 text-gray-900" style={{lineHeight: '2.5'}}>
            <p className="flex justify-between"><span>إِنِّي تَوَكَّلْتُ عَلَى اللَّهِ رَبِّي وَرَبِّكُم مَا مِن دَابَّةٍ إِلَّا هُوَ آخِذٌ بِنَاصِيَتِهَا إِنَّ رَبِّي عَلَىٰ صِرَاطٍ مُسْتَقِيمٍ</span><span className="text-sm text-gray-500 ml-4">﴿٥٦﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 18) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">
            An-Nahl (<span className="text-green-500">26</span>)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-6 sm:space-y-7 md:space-y-8 text-gray-900" style={{lineHeight: '2.5'}}>
            <p className="flex justify-between"><span>قَدْ مَكَرَ الَّذِينَ مِن قَبْلِهِمْ فَأَتَى اللَّهُ بُنْيَانَهُم مِّنَ الْقَوَاعِدِ فَخَرَّ عَلَيْهِمُ السَّقْفُ مِن فَوْقِهِمْ وَأَتَاهُمُ الْعَذَابُ مِنْ حَيْثُ لَا يَشْعُرُونَ</span><span className="text-sm text-gray-500 ml-4">﴿٢٦﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 19) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-gray-800">
            Taha (<span className="text-green-500">65 - 69</span>)
          </h2>
          <div className="arabic-text text-base sm:text-lg md:text-xl space-y-2 sm:space-y-3 md:space-y-4 text-gray-900" style={{lineHeight: '1.8'}}>
            <p className="flex justify-between"><span>قَالُوا يَا مُوسَىٰ إِمَّا أَن تُلْقِيَ وَإِمَّا أَن نَكُونَ أَوَّلَ مَنْ أَلْقَىٰ</span><span className="text-sm text-gray-500 ml-4">﴿٦٥﴾</span></p>
            <p className="flex justify-between"><span>قَالَ بَلْ أَلْقُوا فَإِذَا حِبَالُهُمْ وَعِصِيُّهُم يُخَيَّلُ إِلَيْهِ مِن سِحْرِهِمْ أَنَّهَا تَسْعَىٰ</span><span className="text-sm text-gray-500 ml-4">﴿٦٦﴾</span></p>
            <p className="flex justify-between"><span>فَأَوْجَسَ فِي نَفْسِهِ خِيفَةً مُوسَىٰ</span><span className="text-sm text-gray-500 ml-4">﴿٦٧﴾</span></p>
            <p className="flex justify-between"><span>قُلْنَا لَا تَخَفْ إِنَّكَ أَنتَ الْأَعْلَىٰ</span><span className="text-sm text-gray-500 ml-4">﴿٦٨﴾</span></p>
            <p className="flex justify-between"><span>وَأَلْقِ مَا فِي يَمِينِكَ تَلْقَفْ مَا صَنَعُوا إِنَّمَا صَنَعُوا كَيْدُ سَاحِرٍ وَلَا يُفْلِحُ السَّاحِرُ حَيْثُ أَتَى</span><span className="text-sm text-gray-500 ml-4">﴿٦٩﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 20) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">
            Al-Isra (110 - 111)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-6 sm:space-y-7 md:space-y-8 text-gray-900" style={{lineHeight: '2.5'}}>
            <p className="flex justify-between"><span>قُلِ ادْعُوا اللَّهَ أَوِ ادْعُوا الرَّحْمَٰنَ أَيًّا مَا تَدْعُوا فَلَهُ الْأَسْمَاءُ الْحُسْنَىٰ وَلَا تَجْهَرْ بِصَلَاتِكَ وَلَا تُخَافِتْ بِهَا وَابْتَغِ بَيْنَ ذَٰلِكَ سَبِيلًا</span><span className="text-sm text-gray-500 ml-4">﴿١١٠﴾</span></p>
            <p className="flex justify-between"><span>وَقُلِ الْحَمْدُ لِلَّهِ الَّذِي لَمْ يَتَّخِذْ وَلَدًا وَلَمْ يَكُن لَّهُ شَرِيكٌ فِي الْمُلْكِ وَلَمْ يَكُن لَّهُ وَلِيٌّ مِّنَ الذُّلِّ وَكَبِّرْهُ تَكْبِيرًا</span><span className="text-sm text-gray-500 ml-4">﴿١١١﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 21) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-gray-800">
            Al-Mu'minoon (115 - 118)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-4 sm:space-y-5 md:space-y-6 text-gray-900" style={{lineHeight: '2.2'}}>
            <p className="flex justify-between"><span>أَفَحَسِبْتُمْ أَنَّمَا خَلَقْنَاكُمْ عَبَثًا وَأَنَّكُمْ إِلَيْنَا لَا تُرْجَعُونَ</span><span className="text-sm text-gray-500 ml-4">﴿١١٥﴾</span></p>
            <p className="flex justify-between"><span>فَتَعَالَى اللَّهُ الْمَلِكُ الْحَقُّ لَا إِلَٰهَ إِلَّا هُوَ رَبُّ الْعَرْشِ الْكَرِيمِ</span><span className="text-sm text-gray-500 ml-4">﴿١١٦﴾</span></p>
            <p className="flex justify-between"><span>وَمَن يَدْعُ مَعَ اللَّهِ إِلَٰهًا آخَرَ لَا بُرْهَانَ لَهُ بِهِ فَإِنَّمَا حِسَابُهُ عِندَ رَبِّهِ إِنَّهُ لَا يُفْلِحُ الْكَافِرُونَ</span><span className="text-sm text-gray-500 ml-4">﴿١١٧﴾</span></p>
            <p className="flex justify-between"><span>وَقُل رَّبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ</span><span className="text-sm text-gray-500 ml-4">﴿١١٨﴾</span></p>
          </div>
        </div>
      )
    }
    if (cardNumber === 22) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">
            Yasin (<span className="text-green-500">9</span>)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-6 sm:space-y-7 md:space-y-8 text-gray-900" style={{lineHeight: '2.5'}}>
            <p className="text-center">وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا وَمِنْ خَلْفِهِمْ سَدًّا فَأَغْشَيْنَاهُمْ فَهُمْ لَا يُبْصِرُونَ ﴿٩﴾</p>
          </div>
        </div>
      )
    }
    if (cardNumber === 23) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">
            As-Safaat (1 - 11)
          </h2>
          <div className="arabic-text text-base sm:text-lg md:text-xl space-y-3 sm:space-y-4 md:space-y-5 text-gray-900" style={{lineHeight: '2.0'}}>
            <p className="text-center">وَالصَّافَّاتِ صَفًّا ﴿١﴾ فَالزَّاجِرَاتِ زَجْرًا ﴿٢﴾ فَالتَّالِيَاتِ ذِكْرًا ﴿٣﴾</p>
            <p className="text-center">إِنَّ إِلَٰهَكُمْ لَوَاحِدٌ ﴿٤﴾</p>
            <p className="text-center">رَّبُّ السَّمَاوَاتِ وَالْأَرْضِ وَمَا بَيْنَهُمَا وَرَبُّ الْمَشَارِقِ ﴿٥﴾</p>
            <p className="text-center">إِنَّا زَيَّنَّا السَّمَاءَ الدُّنْيَا بِزِينَةٍ الْكَوَاكِبِ ﴿٦﴾ وَحِفْظًا مِّن كُلِّ شَيْطَانٍ مَّارِدٍ ﴿٧﴾</p>
            <p className="text-center">لَا يَسَّمَعُونَ إِلَى الْمَلَإِ الْأَعْلَىٰ وَيُقْذَفُونَ مِن كُلِّ جَانِبٍ ﴿٨﴾</p>
            <p className="text-center">دُحُورًا وَلَهُمْ عَذَابٌ وَاصِبٌ ﴿٩﴾ إِلَّا مَن خَطِفَ الْخَطْفَةَ فَأَتْبَعَهُ شِهَابٌ ثَاقِبٌ ﴿١٠﴾</p>
            <p className="text-center">فَاسْتَفْتِهِمْ أَهُمْ أَشَدُّ خَلْقًا أَم مَّنْ خَلَقْنَا إِنَّا خَلَقْنَاهُم مِّن طِينٍ لَّازِبٍ ﴿١١﴾</p>
          </div>
        </div>
      )
    }
    if (cardNumber === 24) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 overflow-y-auto max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">
            Al-Ahqaf (<span className="text-red-500">29 - 32</span>)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-3 sm:space-y-4 md:space-y-4 text-gray-900" style={{lineHeight: '2.0'}}>
            <p className="text-center">وَإِذْ صَرَفْنَا إِلَيْكَ نَفَرًا مِّنَ الْجِنِّ يَسْتَمِعُونَ الْقُرْآنَ فَلَمَّا حَضَرُوهُ قَالُوا أَنصِتُوا فَلَمَّا قُضِيَ وَلَّوْا إِلَىٰ قَوْمِهِم مُّنذِرِينَ ﴿٢٩﴾</p>
            <p className="text-center">قَالُوا يَا قَوْمَنَا إِنَّا سَمِعْنَا كِتَابًا أُنزِلَ مِن بَعْدِ مُوسَىٰ مُصَدِّقًا لِّمَا بَيْنَ يَدَيْهِ يَهْدِي إِلَى الْحَقِّ وَإِلَىٰ طَرِيقٍ مُّسْتَقِيمٍ ﴿٣٠﴾</p>
            <p className="text-center">يَا قَوْمَنَا أَجِيبُوا دَاعِيَ اللَّهِ وَآمِنُوا بِهِ يَغْفِرْ لَكُم مِّن ذُنُوبِكُمْ وَيُجِرْكُم مِّن عَذَابٍ أَلِيمٍ ﴿٣١﴾</p>
            <p className="text-center">وَمَن لَا يُجِبْ دَاعِيَ اللَّهِ فَلَيْسَ بِمُعْجِزٍ فِي الْأَرْضِ وَلَيْسَ لَهُ مِن دُونِهِ أَولِيَاءُ أُولَٰئِكَ فِي ضَلَالٍ مُّبِينٍ ﴿٣٢﴾</p>
          </div>
        </div>
      )
    }
    if (cardNumber === 25) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-gray-800">
            Ar-Rahman (33 - 40)
          </h2>
          <div className="arabic-text text-base sm:text-lg md:text-xl space-y-3 text-gray-900" style={{lineHeight: '1.8', textAlign: 'right'}}>
            <p>يَا مَعْشَرَ الْجِنِّ وَالْإِنسِ إِنِ اسْتَطَعْتُمْ أَن تَنفُذُوا مِنْ أَقْطَارِ السَّمَاوَاتِ وَالْأَرْضِ فَانفُذُوا لَا تَنفُذُونَ إِلَّا بِسُلْطَانٍ ﴿٣٣﴾</p>
            <p>يُرْسَلُ عَلَيْكُمَا شُوَاظٌ مِّن نَّارٍ وَنُحَاسٌ فَلَا تَنتَصِرَانِ ﴿٣٤﴾ فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ ﴿٣٥﴾</p>
            <p>فَإِذَا انشَقَّتِ السَّمَاءُ فَكَانَتْ وَرْدَةً كَالدِّهَانِ ﴿٣٦﴾</p>
            <p>فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ ﴿٣٧﴾ فَيَوْمَئِذٍ لَا يُسْأَلُ عَن ذَنبِهِ إِنسٌ وَلَا جَانٌّ ﴿٣٨﴾</p>
            <p>فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ ﴿٣٩﴾</p>
            <p>يُعْرَفُ الْمُجْرِمُونَ بِسِيمَاهُمْ فَيُؤْخَذُ بِالنَّوَاصِي وَالْأَقْدَامِ ﴿٤٠﴾</p>
          </div>
        </div>
      )
    }
    if (cardNumber === 26) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-gray-800">
            Al-Hashr (21 - 24)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-4 sm:space-y-5 text-gray-900" style={{lineHeight: '1.9'}}>
            <p className="text-center">لَوْ أَنزَلْنَا هَٰذَا الْقُرْآنَ عَلَىٰ جَبَلٍ لَّرَأَيْتَهُ خَاشِعًا مُّتَصَدِّعًا مِّنْ خَشْيَةِ اللَّهِ وَتِلْكَ الْأَمْثَالُ نَضْرِبُهَا لِلنَّاسِ لَعَلَّهُمْ يَتَفَكَّرُونَ ﴿٢١﴾</p>
            <p className="text-center">هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ عَالِمُ الْغَيْبِ وَالشَّهَادَةِ هُوَ الرَّحْمَٰنُ الرَّحِيمُ ﴿٢٢﴾</p>
            <p className="text-center">هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْمَلِكُ الْقُدُّوسُ السَّلَامُ الْمُؤْمِنُ الْمُهَيْمِنُ الْعَزِيزُ الْجَبَّارُ الْمُتَكَبِّرُ سُبْحَانَ اللَّهِ عَمَّا يُشْرِكُونَ ﴿٢٣﴾</p>
            <p className="text-center">هُوَ اللَّهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ لَهُ الْأَسْمَاءُ الْحُسْنَىٰ يُسَبِّحُ لَهُ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ وَهُوَ الْعَزِيزُ الْحَكِيمُ ﴿٢٤﴾</p>
          </div>
        </div>
      )
    }
    if (cardNumber === 27) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-gray-800">
            Al-Jinn (1 - 4, <span className="text-red-500">5 - 9</span>)
          </h2>
          <div className="arabic-text text-base sm:text-lg md:text-xl space-y-3 text-gray-900" style={{lineHeight: '1.8'}}>
            <p className="text-center">قُلْ أُوحِيَ إِلَيَّ أَنَّهُ اسْتَمَعَ نَفَرٌ مِّنَ الْجِنِّ فَقَالُوا إِنَّا سَمِعْنَا قُرْآنًا عَجَبًا ﴿١﴾</p>
            <p className="text-center">يَهْدِي إِلَى الرُّشْدِ فَآمَنَّا بِهِ وَلَن نُّشْرِكَ بِرَبِّنَا أَحَدًا ﴿٢﴾</p>
            <p className="text-center">وَأَنَّهُ تَعَالَىٰ جَدُّ رَبِّنَا مَا اتَّخَذَ صَاحِبَةً وَلَا وَلَدًا ﴿٣﴾ وَأَنَّهُ كَانَ يَقُولُ سَفِيهُنَا عَلَى اللَّهِ شَطَطًا ﴿٤﴾</p>
            <p className="text-center">وَأَنَّا ظَنَنَّا أَن لَّن تَقُولَ الْإِنسُ وَالْجِنُّ عَلَى اللَّهِ كَذِبًا ﴿٥﴾</p>
            <p className="text-center">وَأَنَّهُ كَانَ رِجَالٌ مِّنَ الْإِنسِ يَعُوذُونَ بِرِجَالٍ مِّنَ الْجِنِّ فَزَادُوهُمْ رَهَقًا ﴿٦﴾</p>
            <p className="text-center">وَأَنَّهُمْ ظَنُّوا كَمَا ظَنَنتُمْ أَن لَّن يَبْعَثَ اللَّهُ أَحَدًا ﴿٧﴾</p>
            <p className="text-center">وَأَنَّا لَمَسْنَا السَّمَاءَ فَوَجَدْنَاهَا مُلِئَتْ حَرَسًا شَدِيدًا وَشُهُبًا ﴿٨﴾</p>
            <p className="text-center">وَأَنَّا كُنَّا نَقْعُدُ مِنْهَا مَقَاعِدَ لِلسَّمْعِ فَمَن يَسْتَمِعِ الْآنَ يَجِدْ لَهُ شِهَابًا رَّصَدًا ﴿٩﴾</p>
          </div>
        </div>
      )
    }
    if (cardNumber === 28) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-5 text-gray-800">
            Al-Fil (The Elephant)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-4 sm:space-y-5 text-gray-900" style={{lineHeight: '2.0'}}>
            <p className="text-center">أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ ﴿١﴾</p>
            <p className="text-center">أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ ﴿٢﴾</p>
            <p className="text-center">وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ ﴿٣﴾</p>
            <p className="text-center">تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ ﴿٤﴾</p>
            <p className="text-center">فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ ﴿٥﴾</p>
          </div>
        </div>
      )
    }
    if (cardNumber === 29) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-5 text-gray-800">
            Al-Kafiroon (The Disbelievers)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-4 sm:space-y-5 text-gray-900" style={{lineHeight: '2.0'}}>
            <p className="text-center">قُلْ يَا أَيُّهَا الْكَافِرُونَ ﴿١﴾</p>
            <p className="text-center">لَا أَعْبُدُ مَا تَعْبُدُونَ ﴿٢﴾</p>
            <p className="text-center">وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ ﴿٣﴾</p>
            <p className="text-center">وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ ﴿٤﴾</p>
            <p className="text-center">وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ ﴿٥﴾</p>
            <p className="text-center">لَكُمْ دِينُكُمْ وَلِيَ دِينِ ﴿٦﴾</p>
          </div>
        </div>
      )
    }
    if (cardNumber === 30) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-5 text-gray-800">
            Al-Ikhlas (The Sincerity)
          </h2>
          <div className="arabic-text text-xl sm:text-2xl md:text-3xl space-y-5 sm:space-y-6 text-gray-900" style={{lineHeight: '2.2'}}>
            <p className="text-center">قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾</p>
            <p className="text-center">اللَّهُ الصَّمَدُ ﴿٢﴾</p>
            <p className="text-center">لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾</p>
            <p className="text-center">وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾</p>
          </div>
        </div>
      )
    }
    if (cardNumber === 31) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-5 text-gray-800">
            Al-Falaq (The Daybreak)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-4 sm:space-y-5 text-gray-900" style={{lineHeight: '2.0'}}>
            <p className="text-center">قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾</p>
            <p className="text-center">مِن شَرِّ مَا خَلَقَ ﴿٢﴾</p>
            <p className="text-center">وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾</p>
            <p className="text-center">وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾</p>
            <p className="text-center">وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾</p>
          </div>
        </div>
      )
    }
    if (cardNumber === 32) {
      return (
        <div className="text-center p-4 sm:p-6 md:p-8 max-h-full w-full">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-5 text-gray-800">
            An-Nas (Mankind)
          </h2>
          <div className="arabic-text text-lg sm:text-xl md:text-2xl space-y-4 sm:space-y-5 text-gray-900" style={{lineHeight: '2.0'}}>
            <p className="text-center">قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾</p>
            <p className="text-center">مَلِكِ النَّاسِ ﴿٢﴾</p>
            <p className="text-center">إِلَٰهِ النَّاسِ ﴿٣﴾</p>
            <p className="text-center">مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾</p>
            <p className="text-center">الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾</p>
            <p className="text-center">مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾</p>
          </div>
        </div>
      )
    }
    return <span className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-800">{cardNumber}</span>
  }

  const incrementCount = () => {
    setRepetitionCounts(prev => ({
      ...prev,
      [currentCard]: (prev[currentCard] || 0) + 1
    }))
  }

  const clearCount = () => {
    setRepetitionCounts(prev => ({
      ...prev,
      [currentCard]: 0
    }))
  }

  const getCurrentCount = () => {
    return repetitionCounts[currentCard] || 0
  }

  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
        <div className="text-center mb-4">
          <span className="text-white font-medium text-lg sm:text-xl">
            {currentCard} / {totalCards}
          </span>
        </div>
        <div className="w-full h-[80vh] sm:h-96 md:h-[500px] bg-white rounded-lg shadow-xl flex items-center justify-center">
          {getCardContent(currentCard)}
        </div>
        
        <div className="flex justify-between items-center mt-4 sm:mt-6 gap-2">
          <button 
            onClick={prevCard}
            disabled={currentCard === 1}
            className="px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white text-red-500 rounded-lg shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={incrementCount}
              className="px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 touch-manipulation"
            >
              Count
            </button>
            <span className="px-3 py-2 sm:px-4 sm:py-3 bg-white text-gray-800 rounded-lg shadow-md text-sm sm:text-base font-medium min-w-[50px] text-center">
              {getCurrentCount()}
            </span>
            <button 
              onClick={clearCount}
              className="px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 touch-manipulation"
            >
              Clear
            </button>
          </div>
          
          <button 
            onClick={nextCard}
            disabled={currentCard === totalCards}
            className="px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-white text-red-500 rounded-lg shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default App