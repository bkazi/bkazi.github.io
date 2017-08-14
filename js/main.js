function fadeIn(element) {
    element.style.opacity = 1;
    element.style.pointerEvents = 'all';
    element.style.transform = 'none';
}

function lazyLoadImg() {
    const lazyBg = document.querySelector('.js-lazy-load');
    
    const onTransitionEnd = () => {
        lazyBg.remove();
        newBg.classList.remove('fade-in');
        newBg.style.willChange = '';
        newBg.removeEventListener('transitionend', onTransitionEnd);
    };

    const newBg = document.createElement('div');
    newBg.classList.add('background');
    newBg.classList.add('fade-in');
    newBg.style.willChange = 'opacity';
    newBg.addEventListener('transitionend', onTransitionEnd);
    newBg.style.backgroundImage = `url(${lazyBg.dataset.img})`;

    // Load image to make sure it's in cache
    const img = new Image();
    img.src = lazyBg.dataset.img;
    img.onload = () => {
        lazyBg.insertAdjacentElement('afterend', newBg);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => fadeIn(newBg));
        });
    };
}

function revealIntroContent() {
    const delay = 700;
    const introContent = document.querySelector('.intro__content');

    const heading1 = introContent.querySelector('h1');
    const heading2 = introContent.querySelector('h2');
    const p = introContent.querySelector('p');
    const resumeLink = introContent.querySelector('.intro__resume-link');
    const introLinks = introContent.querySelector('.intro__links').children;

    const fadeIn1 = fadeIn.bind(null, heading1);
    const fadeIn2 = fadeIn.bind(null, heading2);
    const fadeIn3 = fadeIn.bind(null, p);
    const fadeIn4 = fadeIn.bind(null, resumeLink);

    requestAnimationFrame(() => {
        requestAnimationFrame(fadeIn1);
    });

    setTimeout(fadeIn2, delay);
    setTimeout(fadeIn3, delay * 2);
    setTimeout(fadeIn4, delay * 3);
    setTimeout(() => {
        for (let i = 0; i < introLinks.length; i++) {
            setTimeout(() => {
                fadeIn(introLinks[i]);
            }, 200 * i);
        }
    }, delay * 4);
}

window.onload = () => {
    lazyLoadImg();
    revealIntroContent();
}
