// Wrap every letter in a span
var textWrapper = document.querySelector('.fwhite');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='fwhite'>$&</span>");

anime.timeline({loop: true})
    .add({
        targets: '.fwhite',
        translateX: [300,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 5000,
        delay: (el, i) => 500 + 30 * i
    }).add({
    targets: '.fwhite',
    translateX: [0,-850],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 1200,
    delay: (el, i) => 100 + 30 * i
});

