// YesMadam CLM Pitch Presentation JavaScript

let currentSlide = 1;
const totalSlides = 12;
let charts = {};

// Initialize presentation
function initPresentation() {
    console.log('Initializing presentation...');
    updateSlideDisplay();
    updateProgressBar();
    updateNavigationButtons();
    setupEventListeners();
    setupKeyboardNavigation();
    setupTouchNavigation();
    setupChartDefaults();
}

function setupEventListeners() {
    // Navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    console.log('Setting up navigation buttons...', { prevBtn, nextBtn });
    
    if (prevBtn) {
        prevBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Previous button clicked');
            previousSlide();
        };
    }
    
    if (nextBtn) {
        nextBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Next button clicked');
            nextSlide();
        };
    }

    // Slide indicators
    const indicators = document.querySelectorAll('.indicator');
    console.log('Setting up indicators...', indicators.length);
    
    indicators.forEach((indicator, index) => {
        const slideNumber = index + 1;
        indicator.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(`Indicator ${slideNumber} clicked`);
            goToSlide(slideNumber);
        };
        indicator.style.cursor = 'pointer';
    });

    // Timeline markers for slide 6
    const markers = document.querySelectorAll('.marker');
    markers.forEach((marker, index) => {
        marker.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            highlightPhase(index + 1);
        };
        marker.style.cursor = 'pointer';
    });

    // Phase hover effects
    const phases = document.querySelectorAll('.phase');
    phases.forEach((phase, index) => {
        phase.onmouseenter = function() {
            highlightPhase(index + 1);
        };
        phase.onmouseleave = function() {
            resetPhases();
        };
    });
}

function nextSlide() {
    console.log('nextSlide called, current:', currentSlide);
    if (currentSlide < totalSlides) {
        goToSlide(currentSlide + 1);
    }
}

function previousSlide() {
    console.log('previousSlide called, current:', currentSlide);
    if (currentSlide > 1) {
        goToSlide(currentSlide - 1);
    }
}

function goToSlide(slideNumber) {
    console.log(`goToSlide called with slideNumber: ${slideNumber}`);
    
    if (slideNumber < 1 || slideNumber > totalSlides) {
        console.log('Invalid slide number');
        return;
    }
    
    // Hide current slide
    const currentSlideElement = document.querySelector('.slide.active');
    if (currentSlideElement) {
        currentSlideElement.classList.remove('active');
        console.log('Removed active from current slide');
    }
    
    // Show new slide
    const newSlideElement = document.querySelector(`[data-slide="${slideNumber}"]`);
    if (newSlideElement) {
        newSlideElement.classList.add('active');
        console.log(`Added active to slide ${slideNumber}`);
    } else {
        console.error(`Could not find slide element for slide ${slideNumber}`);
    }
    
    currentSlide = slideNumber;
    updateSlideDisplay();
    updateProgressBar();
    updateNavigationButtons();
    
    // Initialize charts for specific slides
    setTimeout(() => {
        if (slideNumber === 2) initializeMarketChart();
        if (slideNumber === 4) initializeAchievementsChart();
        if (slideNumber === 7) initializeROIChart();
    }, 100);
}

function updateSlideDisplay() {
    const currentSlideElement = document.getElementById('currentSlide');
    const totalSlidesElement = document.getElementById('totalSlides');
    
    if (currentSlideElement) currentSlideElement.textContent = currentSlide;
    if (totalSlidesElement) totalSlidesElement.textContent = totalSlides;
    
    // Update indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index + 1 === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const progress = (currentSlide / totalSlides) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 1;
        prevBtn.style.opacity = currentSlide === 1 ? '0.3' : '1';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlide === totalSlides;
        nextBtn.style.opacity = currentSlide === totalSlides ? '0.3' : '1';
    }
}

function highlightPhase(phaseNumber) {
    console.log(`Highlighting phase ${phaseNumber}`);
    
    const phases = document.querySelectorAll('.phase');
    phases.forEach((phase, index) => {
        if (index + 1 === phaseNumber) {
            phase.classList.add('active');
        } else {
            phase.classList.remove('active');
        }
    });
    
    const markers = document.querySelectorAll('.marker');
    markers.forEach((marker, index) => {
        if (index + 1 === phaseNumber) {
            marker.classList.add('active');
        } else {
            marker.classList.remove('active');
        }
    });
}

function resetPhases() {
    const phases = document.querySelectorAll('.phase');
    phases.forEach((phase, index) => {
        if (index === 0) {
            phase.classList.add('active');
        } else {
            phase.classList.remove('active');
        }
    });
    
    const markers = document.querySelectorAll('.marker');
    markers.forEach((marker, index) => {
        if (index === 0) {
            marker.classList.add('active');
        } else {
            marker.classList.remove('active');
        }
    });
}

function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                previousSlide();
                break;
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ': // Space bar
                e.preventDefault();
                nextSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides);
                break;
        }
    });
}

function setupTouchNavigation() {
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }
        
        startX = 0;
        startY = 0;
    });
}

function setupChartDefaults() {
    if (typeof Chart !== 'undefined') {
        Chart.defaults.font.family = 'FKGroteskNeue, Inter, sans-serif';
        Chart.defaults.font.size = 12;
        Chart.defaults.color = '#626c74';
        Chart.defaults.plugins.legend.display = true;
        Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(233, 30, 99, 0.9)';
        Chart.defaults.plugins.tooltip.titleColor = '#ffffff';
        Chart.defaults.plugins.tooltip.bodyColor = '#ffffff';
        Chart.defaults.plugins.tooltip.cornerRadius = 8;
    }
}

function initializeMarketChart() {
    const ctx = document.getElementById('marketChart');
    if (!ctx || charts.marketChart || typeof Chart === 'undefined') return;

    try {
        charts.marketChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['YesMadam Current', 'YesMadam Potential', 'Urban Company', 'Other Players'],
                datasets: [{
                    data: [200, 600, 1145, 3000],
                    backgroundColor: ['#E91E63', '#F8BBD9', '#AD1457', '#ECEBD5'],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 20, usePointStyle: true }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ₹' + context.parsed + 'Cr';
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.warn('Could not initialize market chart:', error);
    }
}

function initializeAchievementsChart() {
    const ctx = document.getElementById('achievementsChart');
    if (!ctx || charts.achievementsChart || typeof Chart === 'undefined') return;

    try {
        charts.achievementsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['ARPU Growth', 'Churn Reduction', 'LTV Improvement', 'Engagement Boost'],
                datasets: [{
                    label: 'Improvement %',
                    data: [39, 35, 157, 19],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'],
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: function(value) { return value + '%'; } },
                        grid: { color: 'rgba(0,0,0,0.1)' }
                    },
                    x: { grid: { display: false } }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + '% improvement';
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.warn('Could not initialize achievements chart:', error);
    }
}

function initializeROIChart() {
    const ctx = document.getElementById('roiChart');
    if (!ctx || charts.roiChart || typeof Chart === 'undefined') return;

    try {
        charts.roiChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Investment', 'ARPU Growth', 'Churn Reduction', 'CLTV Improvement', 'Total Returns'],
                datasets: [{
                    label: 'Amount (₹Cr)',
                    data: [-120, 60, 40, 100, 200],
                    backgroundColor: function(context) {
                        return context.parsed.y < 0 ? '#B4413C' : '#1FB8CD';
                    },
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: function(value) { return '₹' + Math.abs(value) + 'Cr'; } },
                        grid: { color: 'rgba(0,0,0,0.1)' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { maxRotation: 45, minRotation: 0 }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed.y;
                                const prefix = value < 0 ? 'Investment: -₹' : 'Returns: +₹';
                                return prefix + Math.abs(value) + 'Cr';
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.warn('Could not initialize ROI chart:', error);
    }
}

function addHoverEffects() {
    const cards = document.querySelectorAll('.value-prop-card, .metric-card, .advantage-card, .urgency-item');
    cards.forEach(card => {
        card.onmouseenter = function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            this.style.boxShadow = '0 15px 35px rgba(233, 30, 99, 0.2)';
        };
        
        card.onmouseleave = function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.04)';
        };
    });

    const stats = document.querySelectorAll('.big-stat, .stat, .metric-big');
    stats.forEach(stat => {
        stat.onmouseenter = function() {
            this.style.animation = 'pulse 1s infinite';
        };
        
        stat.onmouseleave = function() {
            this.style.animation = 'none';
        };
    });
}

function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .nav-btn {
            cursor: pointer !important;
            user-select: none;
        }
        
        .indicator {
            cursor: pointer !important;
            user-select: none;
        }
        
        .marker {
            cursor: pointer !important;
            user-select: none;
        }
    `;
    document.head.appendChild(style);
}

// Multiple initialization methods to ensure it works
function initialize() {
    console.log('Document ready state:', document.readyState);
    initPresentation();
    addHoverEffects();
    addStyles();
    
    console.log('Presentation Controls:');
    console.log('• Arrow keys or Space: Navigate slides');
    console.log('• Home/End: Jump to first/last slide');
    console.log('• Touch/Swipe: Navigate on mobile');
    console.log('• Click indicators: Jump to specific slide');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

// Backup initialization
setTimeout(initialize, 100);

// Handle window resize for chart responsiveness
window.addEventListener('resize', () => {
    Object.values(charts).forEach(chart => {
        if (chart && typeof chart.resize === 'function') {
            chart.resize();
        }
    });
});

// Global functions for console testing
window.goToSlide = goToSlide;
window.nextSlide = nextSlide;
window.previousSlide = previousSlide;

// Print functionality
window.preparePrintVersion = function() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.style.display = 'block';
        slide.style.pageBreakAfter = 'always';
        slide.style.height = 'auto';
        slide.style.minHeight = 'auto';
    });
    
    const nav = document.querySelector('.navigation-controls');
    const header = document.querySelector('.presentation-header');
    if (nav) nav.style.display = 'none';
    if (header) header.style.display = 'none';
    
    window.print();
    
    setTimeout(() => location.reload(), 1000);
};

// Fullscreen functionality
window.toggleFullscreen = function() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(console.log);
    } else {
        document.exitFullscreen();
    }
};

// Performance monitoring
window.addEventListener('load', () => {
    if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Presentation loaded in ${loadTime}ms`);
    }
});

// Smooth scroll
document.documentElement.style.scrollBehavior = 'smooth';
