document.addEventListener('DOMContentLoaded', () => {
  // Slide Navigation Configuration
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const startBtn = document.getElementById('start-btn');
  const currentSlideNumEl = document.getElementById('current-slide-num');
  const totalSlidesNumEl = document.getElementById('total-slides-num');
  
  let currentSlideIndex = 0;
  const totalSlides = slides.length;
  totalSlidesNumEl.textContent = totalSlides;

  function showSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    
    slides.forEach((slide, i) => {
      slide.classList.remove('active', 'previous');
      if (i === index) {
        slide.classList.add('active');
      } else if (i < index) {
        slide.classList.add('previous');
      }
    });

    currentSlideIndex = index;
    currentSlideNumEl.textContent = currentSlideIndex + 1;

    // Enable/disable navigation buttons
    prevBtn.disabled = (currentSlideIndex === 0);
    nextBtn.disabled = (currentSlideIndex === totalSlides - 1);

    // Trigger Donut Chart Animation if on slide 14
    if (slides[currentSlideIndex].id === 'slide-14') {
      animateDonutChart();
    }
  }

  // Event Listeners for Nav Buttons
  prevBtn.addEventListener('click', () => showSlide(currentSlideIndex - 1));
  nextBtn.addEventListener('click', () => showSlide(currentSlideIndex + 1));
  
  if (startBtn) {
    startBtn.addEventListener('click', () => showSlide(1));
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      if (currentSlideIndex < totalSlides - 1) {
        showSlide(currentSlideIndex + 1);
        e.preventDefault();
      }
    } else if (e.key === 'ArrowLeft') {
      if (currentSlideIndex > 0) {
        showSlide(currentSlideIndex - 1);
        e.preventDefault();
      }
    }
  });

  // Slide 4: Interactive Emotions Selection
  const emotionCards = document.querySelectorAll('[data-emotion]');
  const emotionTitleMal = document.getElementById('emotion-title-mal');
  const emotionDetailMal = document.getElementById('emotion-detail-mal');
  const emotionDetailEng = document.getElementById('emotion-detail-eng');
  const emotionDescBox = document.getElementById('emotion-desc-box');

  const emotionData = {
    tantrums: {
      title: "വാശി / ശാഠ്യം (Tantrums)",
      color: "var(--coral)",
      mal: "കുട്ടി അമിതമായി കരയുമ്പോഴും വാശി പിടിക്കുമ്പോഴും വഴക്കുപറയാതെ അവരെ ചേർത്തുപിടിച്ച് ശാന്തരാക്കുക. അവരോടൊപ്പം ഇരുന്ന് 'അമ്മ/അച്ഛൻ കൂടെയുണ്ട്' എന്ന സുരക്ഷിതത്വം നൽകുകയാണ് ആവശ്യം.",
      eng: "Avoid yelling when a child has a tantrum. Instead, practice co-regulation. Stay close and provide a calming presence to help them regulate their emotions."
    },
    silence: {
      title: "മൗനം / പേടി (Silence / Withdrawal)",
      color: "var(--violet)",
      mal: "കുട്ടി പെട്ടെന്ന് മിണ്ടാതാകുകയോ ഉൾവലിയുകയോ ചെയ്യുമ്പോൾ അവരെ നിർബന്ധിച്ചു സംസാരിപ്പിക്കരുത്. 'മോന് എന്ത് കാര്യവും അമ്മയോട് പറയാം' എന്ന് ധൈര്യം നൽകി താല്പര്യം കാണിക്കുക.",
      eng: "When a child withdraws into silence, do not force them to speak. Gently assure them that you are ready to listen whenever they feel comfortable sharing."
    },
    curiosity: {
      title: "ജിജ്ഞാസ (Curiosity / Questions)",
      color: "var(--marigold)",
      mal: "കുട്ടികൾ ചോദിക്കുന്ന ചോദ്യങ്ങളെ കളിയാക്കുകയോ തള്ളിക്കളയുകയോ ചെയ്യരുത്. അവരുടെ ചിന്താശേഷി വളർത്താൻ ലളിതമായി ഉത്തരം നൽകുക, അല്ലെങ്കിൽ ഒന്നിച്ച് ഉത്തരം കണ്ടെത്തുക.",
      eng: "Never ignore or dismiss a child's endless questions. Value their curiosity by answering simply or researching the answers together to build their thinking skills."
    },
    excitement: {
      title: "അമിത സന്തോഷം (High Energy / Excitement)",
      color: "var(--mint)",
      mal: "അമിതമായ എനർജിയും സന്തോഷവും കാണിക്കുമ്പോൾ അതിനെ തടയാതെ സജീവമായി പങ്കുചേരുക. അവരോടൊപ്പം കളികളിൽ ഏർപ്പെടുകയും അവരുടെ സന്തോഷത്തെ പങ്കുവെക്കുകയും ചെയ്യുക.",
      eng: "When children display intense excitement, join in their joy. Play together and share their energy positively to reinforce their happy emotions."
    }
  };

  emotionCards.forEach(card => {
    card.addEventListener('click', () => {
      emotionCards.forEach(c => c.classList.remove('active-card'));
      card.classList.add('active-card');

      const emotion = card.getAttribute('data-emotion');
      const data = emotionData[emotion];

      emotionTitleMal.textContent = data.title;
      emotionTitleMal.style.color = data.color;
      emotionDetailMal.textContent = data.mal;
      emotionDetailEng.textContent = data.eng;
      emotionDescBox.style.borderLeftColor = data.color;
    });
  });

  // Slide 12: Interactive Love Languages Selection
  const loveCards = document.querySelectorAll('[data-lang]');
  const loveTitleMal = document.getElementById('love-title-mal');
  const loveDetailMal = document.getElementById('love-detail-mal');
  const loveDetailEng = document.getElementById('love-detail-eng');
  const loveDescBox = document.getElementById('love-desc-box');

  const loveLanguagesData = {
    words: {
      title: "അഭിനന്ദന വാക്കുകൾ (Words of Affirmation)",
      color: "var(--coral)",
      mal: "കുട്ടികളുടെ ചെറിയ നേട്ടങ്ങളെപ്പോലും പ്രോത്സാഹിപ്പിച്ചു സംസാരിക്കുക. \"മോൻ ഇന്ന് നന്നായി കളിപ്പാട്ടങ്ങൾ ഒതുക്കിവെച്ചു, അമ്മയ്ക്ക് ഒരുപാട് ഇഷ്ടമായി\" എന്ന വാചകങ്ങൾ അവരുടെ ആത്മവിശ്വാസം വളർത്തും.",
      eng: "Praise their specific efforts. Expressions like \"I loved how beautifully you put away your toys today\" build positive self-esteem and encourage healthy behaviors."
    },
    time: {
      title: "ഗുണനിലവാരമുള്ള സമയം (Quality Time)",
      color: "var(--violet)",
      mal: "ദിവസവും കുറഞ്ഞത് 15 മിനിറ്റെങ്കിലും ഫോണോ മറ്റ് ജോലികളോ മാറ്റിവെച്ച് കുട്ടികൾക്ക് മാത്രമായി നൽകുക. അവരുടെ കൂടെ കളിക്കുകയോ കഥകൾ പറയുകയോ ചെയ്യുക.",
      eng: "Spend at least 15 minutes of undivided attention daily. Play their favorite game or tell stories together without screens or work distractions."
    },
    gifts: {
      title: "സമ്മാനങ്ങൾ നൽകൽ (Receiving Gifts)",
      color: "var(--marigold)",
      mal: "വിലകൂടിയ കളിപ്പാട്ടങ്ങൾ വാങ്ങുന്നതിന് പകരം അവരുടെ നേട്ടങ്ങൾക്കോ അല്ലെങ്കിൽ വെറുതെയോ ചെറിയ സമ്മാനങ്ങൾ കരുതുക. സ്നേഹപൂർവ്വം നൽകുന്ന ഒരു ചെറിയ ചോക്ലേറ്റ് പോലും കുട്ടിയെ സന്തോഷിപ്പിക്കും.",
      eng: "It's not about expensive toys. Even small, meaningful gifts like a simple drawing kit or a chocolate given with love show your children that you are thinking of them."
    },
    touch: {
      title: "സ്നേഹസ്പർശനം (Physical Touch)",
      color: "var(--mint)",
      mal: "കുട്ടികൾ സ്കൂൾ വിട്ടു വരുമ്പോഴും രാത്രി ഉറങ്ങാൻ കിടക്കുമ്പോഴും ചുംബിക്കുകയോ കെട്ടിപ്പിടിക്കുകയോ ചെയ്യുക. സ്നേഹത്തോടെയുള്ള സ്പർശനം അവർക്ക് വലിയ വൈകാരിക സുരക്ഷിതത്വം നൽകുന്നു.",
      eng: "Hugs, high-fives, and bedtime kisses release warm emotional security. Gentle physical contact communicates safety and love far better than spoken words."
    }
  };

  loveCards.forEach(card => {
    card.addEventListener('click', () => {
      loveCards.forEach(c => c.classList.remove('active-card'));
      card.classList.add('active-card');

      const lang = card.getAttribute('data-lang');
      const data = loveLanguagesData[lang];

      loveTitleMal.textContent = data.title;
      loveTitleMal.style.color = data.color;
      loveDetailMal.textContent = data.mal;
      loveDetailEng.textContent = data.eng;
      loveDescBox.style.borderLeftColor = data.color;
    });
  });

  // Slide 14: Interactive Donut Chart & Legend
  const segments = document.querySelectorAll('.donut-segment');
  const legendItems = document.querySelectorAll('.chart-legend-item');
  const donutNum = document.getElementById('donut-num');
  const donutLbl = document.getElementById('donut-lbl');
  
  const chartDetailTitle = document.getElementById('chart-detail-title');
  const chartDetailEng = document.getElementById('chart-detail-eng');
  const chartDetailDesc = document.getElementById('chart-detail-desc');

  const chartSegmentsData = [
    {
      pct: "50%",
      lbl: "Active Play",
      title: "ഓപ്പൺ കളി / വ്യായാമം",
      eng: "Active Play & Exercise",
      desc: "ഫോണുകളും ടിവികളും പൂർണ്ണമായി ഒഴിവാക്കി പുറത്തു പോയി ഓടി കളിക്കാനും മറ്റുള്ള കുട്ടികളുമായി ഇടപഴകാനും ഉള്ള സമയം. ഇത് അവരുടെ സാമൂഹികവും ശാരീരികവുമായ വളർച്ചയെ സഹായിക്കുന്നു."
    },
    {
      pct: "20%",
      lbl: "Creative Learn",
      title: "ക്രിയേറ്റീവ് ലേണിംഗ്",
      eng: "Educational Screen Time",
      desc: "ഡിജിറ്റൽ സ്ക്രീൻ ഉപയോഗിക്കുമ്പോൾ വെറുതെ വീഡിയോകൾ കാണാതെ പെയിന്റിംഗ്, കോഡിംഗ് ഗെയിമുകൾ അല്ലെങ്കിൽ മറ്റ് വിജ്ഞാനപ്രദമായ കാര്യങ്ങൾ പഠിക്കാൻ കുട്ടികളെ പ്രോത്സാഹിപ്പിക്കുക."
    },
    {
      pct: "30%",
      lbl: "Family & Sleep",
      title: "കുടുംബ സമയം & ഉറക്കം",
      eng: "Family Bonding & Rest",
      desc: "കുടുംബത്തോടൊപ്പം കഥകൾ പറയുക, ഒരുമിച്ച് ഭക്ഷണം കഴിക്കുക, ആരോഗ്യകരമായ ഉറക്കം ഉറപ്പാക്കുക. ഇത് കുട്ടികളുടെ വൈകാരിക സുരക്ഷിതത്വം വർദ്ധിപ്പിക്കും."
    }
  ];

  function highlightSegment(index) {
    legendItems.forEach(item => item.classList.remove('highlighted'));
    if (legendItems[index]) {
      legendItems[index].classList.add('highlighted');
    }

    const data = chartSegmentsData[index];
    donutNum.textContent = data.pct;
    donutLbl.textContent = data.lbl;
    
    chartDetailTitle.textContent = data.title;
    chartDetailTitle.style.color = (index === 0) ? 'var(--mint)' : (index === 1 ? 'var(--marigold)' : 'var(--coral)');
    chartDetailEng.textContent = data.eng;
    chartDetailDesc.textContent = data.desc;
  }

  // Legend hovers
  legendItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => highlightSegment(index));
  });

  // SVG segments hovers
  segments.forEach((seg, i) => {
    if (i > 0) { // skip the background circle
      const index = i - 1;
      seg.addEventListener('mouseenter', () => highlightSegment(index));
    }
  });

  // Animate Donut Chart Segments on loading Slide 14
  function animateDonutChart() {
    segments.forEach((seg, i) => {
      if (i > 0) {
        const pct = parseInt(seg.getAttribute('data-pct'));
        const originalArray = seg.getAttribute('stroke-dasharray').split(' ');
        const targetDash = pct;
        const targetGap = 100 - pct;
        
        // Start from 0
        seg.style.strokeDasharray = `0 100`;
        
        // Force reflow
        seg.getBoundingClientRect();
        
        // Transition to target
        seg.style.transition = 'stroke-dasharray 1.2s ease-out';
        seg.style.strokeDasharray = `${targetDash} ${targetGap}`;
      }
    });
    highlightSegment(0);
  }

  // Slide 15: Weekly Checklist Custom Checkboxes
  const checkboxes = document.querySelectorAll('.custom-checkbox');
  checkboxes.forEach(box => {
    box.addEventListener('click', () => {
      box.classList.toggle('checked');
    });
  });
});
