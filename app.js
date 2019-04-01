function loadSlideoscope(slideoscope) {
    let index = 0;
    let animationInProgress = false;

    const slides = slideoscope.querySelectorAll('.slide');
    
    slides.forEach(function(slide) {
        slide.style.background = 'url(' + slide.dataset.src + ') center/cover no-repeat';
    });
}

window.onload = function() {
    const slideoscopes = document.querySelectorAll('.slideoscope');
    slideoscopes.forEach(function(slideoscope) {
        loadSlideoscope(slideoscope);
    })
}