function loadSlideoscope(slideoscope) {
    // Define variable to track the current slide index
    let index = 0;
    // Define variable to track if a slide animation is in progress
    let animationInProgress = false;
    // Select all slides within this slideoscope
    const slides = slideoscope.querySelectorAll('.slide');
    // Select screen container within this slideoscope
    const screenContainer = slideoscope.querySelector('.screen-container');
    // Select screen within this slideoscope
    const screen = slideoscope.querySelector('.screen');
    // Select back arrow within this slideoscope
    const backArrow = slideoscope.querySelector('.back');
    // Select next arrow within this slideoscope
    const nextArrow = slideoscope.querySelector('.next');

    function back() {
        if (index > 0 && !animationInProgress) {
            animationInProgress = true;
            index--;

            screen.classList.add('slide-right');

            slides.forEach(function(slide) { slide.classList.remove('current') });
            slides[index].classList.add('current');
            slides[index].scrollIntoView({behavior: "smooth", block: "nearest"});

            const prevScreen = document.createElement('div');
            prevScreen.classList.add('slide-right', 'screen');
            prevScreen.style.background = 'url(' + slides[index].dataset.src + ') center top/contain no-repeat';
            screenContainer.prepend(prevScreen);
            setTimeout(() => {
                prevScreen.remove();
                screen.classList.remove('slide-right')
                screen.style.background = 'url(' + slides[index].dataset.src + ') center top/contain no-repeat';
                animationInProgress = false;
            }, 500);
        }
    }

    function next() {
        if (index < slides.length - 1 && !animationInProgress) {
            animationInProgress = true;
            index++;

            screen.classList.add('slide-left');

            slides.forEach(function(slide) { slide.classList.remove('current') });
            slides[index].classList.add('current');
            slides[index].scrollIntoView({behavior: "smooth", block: "nearest"});

            const nextScreen = document.createElement('div');
            nextScreen.classList.add('slide-left', 'screen');
            nextScreen.style.background = 'url(' + slides[index].dataset.src + ') center top/contain no-repeat';
            screenContainer.append(nextScreen);
            setTimeout(() => {
                nextScreen.remove();
                screen.classList.remove('slide-left')
                screen.style.background = 'url(' + slides[index].dataset.src + ') center top/contain no-repeat';
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
            slides.forEach(function(slide) { slide.classList.remove('current') });
            slides[index].classList.add('current');
            slides[index].scrollIntoView({behavior: "smooth", block: "nearest"});
        });
    });

    slides[index].classList.add('current');
    // Set the background of the screen to equal the background of slide at index
    screen.style.background = 'url(' + slides[index].dataset.src + ') center top/contain no-repeat';

    backArrow.addEventListener('click', back);
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