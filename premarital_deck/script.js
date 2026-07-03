document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const slideNumDisplay = document.querySelector('.slide-number');
  const flowSteps = document.querySelectorAll('.flow-step');
  const flowLines = document.querySelectorAll('.flow-line');
  
  let currentSlideIndex = 0;
  const totalSlides = slides.length;

  // Initialize slides
  updateSlides();

  // Navigation functions
  function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
      currentSlideIndex++;
      updateSlides();
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      updateSlides();
    }
  }

  // Update layout and active states
  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'previous', 'next');
      if (index === currentSlideIndex) {
        slide.classList.add('active');
        // Trigger specific slide animations
        handleSlideActivation(slide);
      } else if (index < currentSlideIndex) {
        slide.classList.add('previous');
      } else {
        slide.classList.add('next');
      }
    });

    // Update buttons
    prevBtn.disabled = currentSlideIndex === 0;
    nextBtn.disabled = currentSlideIndex === totalSlides - 1;

    // Update slide number display
    slideNumDisplay.textContent = `${currentSlideIndex + 1} / ${totalSlides}`;

    // Update Flow Tracker
    updateFlowTracker();
  }

  // Flow Tracker state controller
  function updateFlowTracker() {
    const activeSlide = slides[currentSlideIndex];
    const currentHour = parseInt(activeSlide.getAttribute('data-hour') || '0');

    flowSteps.forEach(step => {
      const stepHour = parseInt(step.getAttribute('data-hour-step'));
      step.classList.remove('active', 'completed');
      
      if (currentHour === 0) {
        // Cover slide: none active or completed
      } else if (stepHour === currentHour) {
        step.classList.add('active');
      } else if (stepHour < currentHour) {
        step.classList.add('completed');
      }
    });

    flowLines.forEach((line, index) => {
      const lineHour = index + 1; // line 1 connects Hour 1 & Hour 2, etc.
      line.classList.remove('completed');
      if (currentHour > lineHour) {
        line.classList.add('completed');
      }
    });
  }

  // Handle specific animations/logic when a slide is active
  function handleSlideActivation(slide) {
    // If it is the chart slide (Slide 9)
    if (slide.id === 'slide-chart') {
      animateDonutChart();
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    }
  });

  // Click buttons
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Flow tracker click-to-navigate
  flowSteps.forEach(step => {
    step.addEventListener('click', () => {
      const targetHour = parseInt(step.getAttribute('data-hour-step'));
      // Find first slide of that hour
      const targetSlideIndex = Array.from(slides).findIndex(s => parseInt(s.getAttribute('data-hour') || '0') === targetHour);
      if (targetSlideIndex !== -1) {
        currentSlideIndex = targetSlideIndex;
        updateSlides();
      }
    });
  });

  // Start Button on Title Slide
  const startBtn = document.getElementById('start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      nextSlide();
    });
  }

  // INTERACTIVE: Love Languages toggle cards
  const loveCards = document.querySelectorAll('.love-languages-grid .love-card:not([data-conflict-card])');
  const loveDetailTitle = document.getElementById('love-detail-title');
  const loveDetailMal = document.getElementById('love-detail-mal');
  const loveDetailEng = document.getElementById('love-detail-eng');

  loveCards.forEach(card => {
    card.addEventListener('click', () => {
      loveCards.forEach(c => c.classList.remove('active-card'));
      card.classList.add('active-card');

      const title = card.getAttribute('data-title');
      const mal = card.getAttribute('data-mal');
      const eng = card.getAttribute('data-eng');

      loveDetailTitle.textContent = title;
      loveDetailMal.textContent = mal;
      loveDetailEng.textContent = eng;

      // Pulse animation effect on description box
      const descBox = document.getElementById('love-desc-box');
      descBox.style.animation = 'none';
      descBox.offsetHeight; /* trigger reflow */
      descBox.style.animation = 'pulseGlow 0.5s ease-out';
    });
  });

  // INTERACTIVE: Conflict Styles toggle cards
  const conflictCards = document.querySelectorAll('[data-conflict-card]');
  const conflictDetailTitle = document.getElementById('conflict-detail-title');
  const conflictDetailMal = document.getElementById('conflict-detail-mal');
  const conflictDetailEng = document.getElementById('conflict-detail-eng');
  const conflictDescBox = document.getElementById('conflict-desc-box');

  conflictCards.forEach(card => {
    card.addEventListener('click', () => {
      conflictCards.forEach(c => c.classList.remove('active-card'));
      card.classList.add('active-card');

      const title = card.getAttribute('data-title');
      const mal = card.getAttribute('data-mal');
      const eng = card.getAttribute('data-eng');

      conflictDetailTitle.textContent = title;
      conflictDetailMal.textContent = mal;
      conflictDetailEng.textContent = eng;

      // Pulse animation effect
      conflictDescBox.style.animation = 'none';
      conflictDescBox.offsetHeight; /* trigger reflow */
      conflictDescBox.style.animation = 'pulseGlow 0.5s ease-out';
    });
  });

  // INTERACTIVE: Custom checkbox table
  const checkboxes = document.querySelectorAll('.custom-checkbox');
  checkboxes.forEach(cb => {
    cb.addEventListener('click', () => {
      cb.classList.toggle('checked');
    });
  });

  // SVG Donut Chart Logic
  const chartSegments = document.querySelectorAll('.donut-segment');
  const chartLegendItems = document.querySelectorAll('.chart-legend-item');
  const donutCenterNum = document.querySelector('.donut-center-num');
  const donutCenterLbl = document.querySelector('.donut-center-lbl');

  function animateDonutChart() {
    chartSegments.forEach(segment => {
      const percentage = parseFloat(segment.getAttribute('data-pct'));
      const circumference = 238.76;
      const dashLength = (percentage / 100) * circumference;
      
      // First reset
      segment.style.strokeDasharray = `0 ${circumference}`;
      
      // Delay slightly for transition
      setTimeout(() => {
        segment.style.transition = 'stroke-dasharray 1.2s ease-out, stroke-width 0.3s';
        segment.style.strokeDasharray = `${dashLength} ${circumference}`;
      }, 100);
    });
  }

  // Donut chart hover/click interactives
  chartSegments.forEach(segment => {
    segment.addEventListener('mouseenter', () => highlightSegment(segment.id));
    segment.addEventListener('mouseleave', resetSegmentHighlight);
    segment.addEventListener('click', () => highlightSegment(segment.id, true));
  });

  chartLegendItems.forEach(item => {
    item.addEventListener('mouseenter', () => highlightSegment(item.getAttribute('data-segment')));
    item.addEventListener('mouseleave', resetSegmentHighlight);
    item.addEventListener('click', () => highlightSegment(item.getAttribute('data-segment'), true));
  });

  function highlightSegment(id, persist = false) {
    chartSegments.forEach(segment => {
      if (segment.id === id) {
        segment.style.strokeWidth = '30';
        segment.style.filter = 'drop-shadow(0px 0px 8px rgba(255,255,255,0.4))';
        
        const pct = segment.getAttribute('data-pct');
        const name = segment.getAttribute('data-name');
        donutCenterNum.textContent = `${pct}%`;
        donutCenterLbl.textContent = name;
        
        // Highlight corresponding legend item
        chartLegendItems.forEach(item => {
          if (item.getAttribute('data-segment') === id) {
            item.classList.add('highlighted');
          } else {
            item.classList.remove('highlighted');
          }
        });
      } else {
        segment.style.strokeWidth = '24';
        segment.style.filter = 'none';
      }
    });
  }

  function resetSegmentHighlight() {
    chartSegments.forEach(segment => {
      segment.style.strokeWidth = '24';
      segment.style.filter = 'none';
    });
    
    chartLegendItems.forEach(item => item.classList.remove('highlighted'));
    
    donutCenterNum.textContent = '100%';
    donutCenterLbl.textContent = 'ദാമ്പത്യവിജയം';
  }
});

// Dynamic animation style definition for description boxes
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes pulseGlow {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(138, 43, 226, 0.4); }
    70% { transform: scale(1.01); box-shadow: 0 0 15px 5px rgba(138, 43, 226, 0.2); }
    100% { transform: scale(1); box-shadow: none; }
  }
`;
document.head.appendChild(styleSheet);