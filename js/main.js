function fadeIn(element) {
    element.style.opacity = 1;
    element.style.pointerEvents = 'all';
    element.style.transform = 'none';
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

function go() {
    revealIntroContent();
}

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    go();
} else {
    document.addEventListener('DOMContentLoaded', (event) => {
        go();
    });
}
