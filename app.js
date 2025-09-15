// YesMadam CLM Pitch Presentation JavaScript

let currentSlide = 1;
const totalSlides = 12; // updated from 10 to 12
let charts = {};

// Initialize presentation
function initPresentation() {
  updateSlideDisplay();
  updateProgressBar();
  updateNavigationButtons();
  setupEventListeners();
  setupKeyboardNavigation();
  setupTouchNavigation();
  setupChartDefaults();
}

function setupEventListeners() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (prevBtn) {
    prevBtn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      previousSlide();
    };
  }

  if (nextBtn) {
    nextBtn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      nextSlide();
    };
  }

  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach((indicator, index) => {
    const slideNumber = index + 1;
    indicator.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      goToSlide(slideNumber);
    };
    indicator.style.cursor = 'pointer';
  });
}

function setupKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') nextSlide();
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') previousSlide();
  });
}

function setupTouchNavigation() {
  let startX = 0;
  let startY = 0;

  document.addEventListener('touchstart', (e) => {
    startX = e.touches.clientX;
    startY = e.touches.clientY;
  });

  document.addEventListener('touchend', (e) => {
    if (!startX || !startY) return;
    const endX = e.changedTouches.clientX;
    const endY = e.changedTouches.clientY;
    const dx = endX - startX;
    const dy = endY - startY;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
      if (dx < 0) nextSlide();
      else previousSlide();
    }
    startX = 0;
    startY = 0;
  });
}

function setupChartDefaults() {
  if (window.Chart && Chart.defaults) {
    Chart.defaults.font.family = 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif';
    Chart.defaults.color = '#333';
  }
}

function updateSlideDisplay() {
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide) => slide.classList.remove('active'));
  const active = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
  if (active) active.classList.add('active');
  const current = document.getElementById('currentSlide');
  if (current) current.textContent = String(currentSlide);
  const total = document.getElementById('totalSlides');
  if (total) total.textContent = String(totalSlides);
  updateIndicators();
}

function updateIndicators() {
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index + 1 === currentSlide);
  });
}

function updateProgressBar() {
  const progress = document.getElementById('progressBar');
  if (!progress) return;
  const pct = ((currentSlide - 1) / (totalSlides - 1)) * 100;
  progress.style.width = `${pct}%`;
}

function updateNavigationButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.disabled = currentSlide === 1;
  if (nextBtn) nextBtn.disabled = currentSlide === totalSlides;
}

function nextSlide() {
  if (currentSlide < totalSlides) {
    currentSlide += 1;
    updateSlideDisplay();
    updateProgressBar();
    updateNavigationButtons();
  }
}

function previousSlide() {
  if (currentSlide > 1) {
    currentSlide -= 1;
    updateSlideDisplay();
    updateProgressBar();
    updateNavigationButtons();
  }
}

function goToSlide(n) {
  if (n >= 1 && n <= totalSlides) {
    currentSlide = n;
    updateSlideDisplay();
    updateProgressBar();
    updateNavigationButtons();
  }
}

document.addEventListener('DOMContentLoaded', initPresentation);
