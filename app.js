// YesMadam CLM Pitch Presentation JavaScript - Updated for 11 slides

let currentSlide = 1;
const totalSlides = 11;
let charts = {};

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing YesMadam CLM presentation...');
    initPresentation();
});

function initPresentation() {
    console.log('Setting up presentation with', totalSlides, 'slides');
    updateSlideDisplay();
    updateProgressBar();
    updateNavigationButtons();
    setupEventListeners();
    setupKeyboardNavigation();
    setupTouchNavigation();
    setupChartDefaults();
    addInteractiveEffects();
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

    // Slide indicators - Updated for 11 slides
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

    // Timeline markers for slide 6 (roadmap)
    const markers = document.querySelectorAll('.marker');
    markers.forEach((marker, index) => {
        marker.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            highlightPhase(index + 1);
        };
        marker.style.cursor = 'pointer';
    });

    // Phase hover effects for roadmap
    const phases = document.querySelectorAll('.phase');
    phases.forEach((phase, index) => {
        phase.addEventListener('mouseenter', function() {
            highlightPhase(index + 1);
        });
        phase.addEventListener('mouseleave', function() {
            resetPhases();
        });
    });

    // Card hover effects
    const cards = document.querySelectorAll('.value-prop-card, .metric-card, .benefit-card, .advantage-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                previousSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides);
                break;
            case 'Escape':
                e.preventDefault();
                // Could add fullscreen exit or other functionality
                break;
        }
    });
}

function setupTouchNavigation() {
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startTime = Date.now();
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const endTime = Date.now();
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        const diffTime = endTime - startTime;
        
        // Only register swipe if it was quick and mostly horizontal
        if (diffTime < 300 && Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide(); // Swipe left = next slide
            } else {
                previousSlide(); // Swipe right = previous slide
            }
        }
        
        startX = 0;
        startY = 0;
        startTime = 0;
    }, { passive: true });
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        goToSlide(currentSlide + 1);
    }
}

function previousSlide() {
    if (currentSlide > 1) {
        goToSlide(currentSlide - 1);
    }
}

function goToSlide(slideNumber) {
    if (slideNumber < 1 || slideNumber > totalSlides) {
        console.warn('Invalid slide number:', slideNumber);
        return;
    }
    
    console.log(`Going to slide ${slideNumber}`);
    
    // Hide current slide
    const currentSlideElement = document.querySelector('.slide.active');
    if (currentSlideElement) {
        currentSlideElement.classList.remove('active');
    }
    
    // Show new slide
    const newSlideElement = document.querySelector(`[data-slide="${slideNumber}"]`);
    if (newSlideElement) {
        newSlideElement.classList.add('active');
        currentSlide = slideNumber;
        updateSlideDisplay();
        updateProgressBar();
        updateNavigationButtons();
        
        // Initialize any slide-specific functionality
        initializeSlideSpecificContent(slideNumber);
    } else {
        console.error('Slide not found:', slideNumber);
    }
}

function updateSlideDisplay() {
    const currentSlideElement = document.getElementById('currentSlide');
    const totalSlidesElement = document.getElementById('totalSlides');
    
    if (currentSlideElement) {
        currentSlideElement.textContent = currentSlide;
    }
    if (totalSlidesElement) {
        totalSlidesElement.textContent = totalSlides;
    }
    
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
        progressBar.style.width = progress + '%';
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide <= 1;
        prevBtn.style.opacity = currentSlide <= 1 ? '0.5' : '1';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlide >= totalSlides;
        nextBtn.style.opacity = currentSlide >= totalSlides ? '0.5' : '1';
    }
}

function setupChartDefaults() {
    // Set up Chart.js defaults for consistent styling
    if (typeof Chart !== 'undefined') {
        Chart.defaults.color = '#E0E0E0';
        Chart.defaults.borderColor = '#333333';
        Chart.defaults.backgroundColor = 'rgba(233, 30, 99, 0.1)';
        Chart.defaults.plugins.legend.labels.color = '#E0E0E0';
        Chart.defaults.scales.linear.ticks.color = '#B0B0B0';
        Chart.defaults.scales.linear.grid.color = 'rgba(255, 255, 255, 0.1)';
    }
}

function addInteractiveEffects() {
    // Add pulse animation to key metrics
    const stats = document.querySelectorAll('.stat, .cost-highlight, .return-highlight, .roi-percentage');
    stats.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        stat.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Add hover effects to contact links
    const links = document.querySelectorAll('.portfolio-link');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add intersection observer for slide animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideIn 0.6s ease-out';
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.slide-content').forEach(content => {
            observer.observe(content);
        });
    }
}

function initializeSlideSpecificContent(slideNumber) {
    console.log('Initializing content for slide:', slideNumber);
    
    switch(slideNumber) {
        case 6: // Roadmap slide
            initializeRoadmapInteractions();
            break;
        case 7: // ROI slide
            initializeROICalculations();
            break;
        default:
            // No specific initialization needed
            break;
    }
}

function initializeRoadmapInteractions() {
    const phases = document.querySelectorAll('.phase');
    phases.forEach((phase, index) => {
        phase.addEventListener('click', function() {
            highlightPhase(index + 1);
        });
    });
}

function highlightPhase(phaseNumber) {
    console.log('Highlighting phase:', phaseNumber);
    
    const phases = document.querySelectorAll('.phase');
    phases.forEach((phase, index) => {
        if (index + 1 === phaseNumber) {
            phase.style.borderColor = '#E91E63';
            phase.style.boxShadow = '0 8px 16px rgba(233, 30, 99, 0.2)';
            phase.style.transform = 'translateY(-8px)';
        } else {
            phase.style.borderColor = '#333333';
            phase.style.boxShadow = 'none';
            phase.style.transform = 'translateY(0)';
        }
    });
}

function resetPhases() {
    const phases = document.querySelectorAll('.phase');
    phases.forEach(phase => {
        phase.style.borderColor = '#333333';
        phase.style.boxShadow = 'none';
        phase.style.transform = 'translateY(0)';
    });
}

function initializeROICalculations() {
    // Add any ROI-specific interactivity here
    const roiItems = document.querySelectorAll('.roi-item');
    roiItems.forEach(item => {
        item.addEventListener('click', function() {
            // Could show detailed calculation breakdown
            console.log('ROI item clicked:', this.textContent);
        });
    });
}

// Utility functions
function animateNumber(element, start, end, duration = 1000) {
    const startTime = performance.now();
    const range = end - start;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + (range * progress);
        
        element.textContent = Math.round(current);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: var(--yesmadam-primary);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Global functions for inline onclick handlers
window.nextSlide = nextSlide;
window.previousSlide = previousSlide;
window.goToSlide = goToSlide;

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}

@keyframes slideIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.notification {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
`;
document.head.appendChild(style);

console.log('YesMadam CLM Presentation JavaScript loaded successfully');