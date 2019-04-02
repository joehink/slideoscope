function loadSlideoscope(slideoscope) {
    // Define variable to track the current slide index
    let index = 0;
    // Define variable to track if a slide animation is in progress
    let animationInProgress = false;
    // Select all slides within this slideoscope
    const slides = slideoscope.querySelectorAll('.slideoscope-slide');
    // Select screen container within this slideoscope
    const screenContainer = slideoscope.querySelector('.slideoscope-screen-container');
    // Select screen within this slideoscope
    const screen = slideoscope.querySelector('.slideoscope-screen');
    // Select back arrow within this slideoscope
    const backArrow = slideoscope.querySelector('.slideoscope-back');
    // Select next arrow within this slideoscope
    const nextArrow = slideoscope.querySelector('.slideoscope-next');

    function setCurrentSlide() {
        // Remove the 'current' class from all slides
        slides.forEach(function(slide) { slide.classList.remove('current') });
        // Add the 'current' class to the current slide
        slides[index].classList.add('current');
        // Scroll the queue to the current slide
        slides[index].scrollIntoView({behavior: "smooth", block: "nearest"});
    }

    function back() {
        if (index > 0 && !animationInProgress) {
            // Animation is about to begin
            animationInProgress = true;
            // Decrement index by one
            index--;
            // Add 'slide-right' class to screen. This triggers the sliding animation
            screen.classList.add('slide-right');
            // Set slide at index as current slide
            setCurrentSlide();
            // Create a new div element
            const prevScreen = document.createElement('div');
            // Give prevScreen the classes to slide right and look like a screen
            prevScreen.classList.add('slide-right', 'slideoscope-screen');
            // Give prevScreen the background of slide at index
            prevScreen.style.background = 'url(' + slides[index].dataset.src + ') center top/contain no-repeat';
            // Prepend prevScreen to screenContainer
            screenContainer.prepend(prevScreen);
            // After animation is finished (500ms)
            setTimeout(() => {
                // Remove prevScreen
                prevScreen.remove();
                // Remove 'slide-right' class from screen
                screen.classList.remove('slide-right');
                // Set the background of the screen to equal the background of slide at index
                screen.style.background = 'url(' + slides[index].dataset.src + ') center top/contain no-repeat';
                // Animation is over
                animationInProgress = false;
            }, 500);
        }
    }

    function next() {
        if (index < slides.length - 1 && !animationInProgress) {
            // Animation is about to begin
            animationInProgress = true;
            // Increment index by one
            index++;
            // Add 'slide-left' class to screen. This triggers the sliding animation
            screen.classList.add('slide-left');
            // Set slide at index as current slide
            setCurrentSlide();
            // Create a new div element
            const nextScreen = document.createElement('div');
            // Give nextScreen the classes to slide left and look like a screen
            nextScreen.classList.add('slide-left', 'slideoscope-screen');
            // Give nextScreen the background of slide at index
            nextScreen.style.background = 'url(' + slides[index].dataset.src + ') center top/contain no-repeat';
            // Append nextScreen to screenContainer
            screenContainer.append(nextScreen);
            // After animation is finished (500ms)
            setTimeout(() => {
                // Remove nextScreen
                nextScreen.remove();
                // Remove 'slide-left' class from screen
                screen.classList.remove('slide-left');
                // Set the background of the screen to equal the background of slide at index
                screen.style.background = 'url(' + slides[index].dataset.src + ') center top/contain no-repeat';
                // Animation is over
                animationInProgress = false;
            }, 500);
        }
    }


    // For each slide
    slides.forEach(function(slide, slideIndex) {
        // Set the slide background to equal the value of the data-src attribute
        slide.style.background = 'url(' + slide.dataset.src + ') center top/cover no-repeat';

        // When a slide is clicked
        slide.addEventListener('click', function() { 
            // Set index to equal the index of that slide
            index = slideIndex; 
            // Set the background of the screen to equal the background of slide at index
            screen.style.background = 'url(' + slides[index].dataset.src + ') center top/contain no-repeat';
            // Set clicked slide as current slide
            setCurrentSlide();
        });
    });

    // Set slide at index as current slide
    slides[index].classList.add('current');
    // Set the background of the screen to equal the background of slide at index
    screen.style.background = 'url(' + slides[index].dataset.src + ') center top/contain no-repeat';
    // When the back arrow is pressed, call the back function
    backArrow.addEventListener('click', back);
    // When the next arrow is pressed, call the next function
    nextArrow.addEventListener('click', next);
}



// When the page first loads
window.onload = function() {
    // Select all slideoscopes on the page
    const slideoscopes = document.querySelectorAll('.slideoscope');
    // For each slideoscope 
    slideoscopes.forEach(function(slideoscope) {
        // Load all of the images for that slideoscope
        loadSlideoscope(slideoscope);
    });
}