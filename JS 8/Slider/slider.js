const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let autoScrollInterval;

// Update the active dot based on the current slide
function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentSlide) {
            dot.classList.add('active');
        }
    });
}

// Change the slide based on direction
function changeSlide(direction) {
    const totalSlides = slideItems.length;
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
}

// Add event listeners for arrow buttons
leftArrow.addEventListener('click', () => changeSlide(-1));
rightArrow.addEventListener('click', () => changeSlide(1));

// Add event listeners for dot clicks
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    });
});

// Start the automatic slide change every 3 seconds
function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        changeSlide(1);
    }, 3000);
}

// Stop the automatic slide change
function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Initial call to set up auto scroll
startAutoScroll();

// Smooth transition between the last and first slide
function smoothTransition() {
    if (currentSlide === slideItems.length - 1) {
        setTimeout(() => {
            slides.style.transition = 'none';
            slides.style.transform = 'translateX(0%)';
            currentSlide = 0;
        }, 500);
        setTimeout(() => {
            slides.style.transition = 'transform 0.5s ease-in-out';
        }, 0);
    }
}

// Call smoothTransition after every change
function handleSlideChange() {
    smoothTransition();
    updateDots();
}

// Call handleSlideChange after the interval to apply smooth transition
setInterval(handleSlideChange, 3000);
