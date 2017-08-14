function fadeIn(element) {
    element.style.opacity = 1;
    element.style.pointerEvents = 'all';
    element.style.transform = 'none';
}

function lazyLoadImg() {
    const lazyBg = document.querySelector('.js-lazy-load');
    
    const onTransitionEnd = () => {
        lazyBg.remove();
        img.classList.remove('fade-in');
        img.style.willChange = '';
        img.removeEventListener('transitionend', onTransitionEnd);
    };

    const img = new Image();
    img.src = lazyBg.dataset.img;
    img.classList.add('background');
    img.classList.add('fade-in');
    img.style.willChange = 'opacity';
    img.addEventListener('transitionend', onTransitionEnd);
    img.onload = () => {
        lazyBg.insertAdjacentElement('afterend', img);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => fadeIn(img));
        });
    };
}

function revealIntroContent() {
    const delay = 600;
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

function pictureReveal() {
    const image = document.querySelector('.about__image');
    const text = document.querySelector('.about__text');
    const listenerText = () => {
        if (text.getBoundingClientRect().top - window.innerHeight <= -100) {
            fadeIn(text);
            document.removeEventListener('scroll', listenerText);
        }
    };

    const listenerImage = () => {
        if (image.getBoundingClientRect().top - window.innerHeight <= 0) {
            fadeIn(image);
            document.removeEventListener('scroll', listenerImage);
        }
    };

    if (text.getBoundingClientRect().top - window.innerHeight <= -100) {
        fadeIn(text);
    } 
    if (image.getBoundingClientRect().top - window.innerHeight <= 0) {
        fadeIn(image);
    } else {
        document.addEventListener('scroll', listenerText, {passive: true});
        document.addEventListener('scroll', listenerImage, {passive: true});
    }

}

window.onload = () => {
    lazyLoadImg();
    revealIntroContent();
    pictureReveal();
}
