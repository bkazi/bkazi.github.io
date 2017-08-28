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

function pictureReveal() {
    const image = document.querySelector('.about__image');
    const text = document.querySelector('.about__text');
    if (!image || !text) return;
    const listenerText = () => {
        const clientRect = text.getBoundingClientRect();
        if (clientRect.top > 0 && clientRect.top - window.innerHeight <= -100) {
            fadeIn(text);
            document.removeEventListener('scroll', listenerText);
        }
    };

    const listenerImage = () => {
        const clientRect = image.getBoundingClientRect();
        if (clientRect.top > 0 && clientRect.top - window.innerHeight <= 0) {
            fadeIn(image);
            document.removeEventListener('scroll', listenerImage);
        }
    };

    const clientRectImage = image.getBoundingClientRect();
    const clientRectText = text.getBoundingClientRect();
    if (clientRectText.top > 0 && clientRectText.top - window.innerHeight <= -100) {
        fadeIn(text);
    } 
    if (clientRectImage.top > 0 && image.getBoundingClientRect().top - window.innerHeight <= 0) {
        fadeIn(image);
    } else {
        document.addEventListener('scroll', listenerText, {passive: true});
        document.addEventListener('scroll', listenerImage, {passive: true});
    }
}

function routesListener() {
    const ids = ['writing', 'faq'];
    const map = new Map();

    const clickListener = (event) => {
        event.preventDefault();
        const selected = document.querySelector('.route.selected');
        const currPathname = location.pathname;
        const newPathname = new URL(event.target.href).pathname;
        history.pushState({}, '', newPathname);
        map.get(currPathname).classList.add('route-hidden');
        map.get(newPathname).classList.remove('hidden');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                map.get(currPathname).classList.add('hidden');
                map.get(newPathname).classList.remove('route-hidden');
            });
        });
        selected.classList.remove('selected');
        event.target.parentNode.classList.add('selected');
    };

    ids.forEach((id) => {
        const link = document.getElementById(id);
        const dom = document.querySelector(`.${id}`);
        map.set(new URL(link.href).pathname, dom);
        link.addEventListener('click', clickListener);
        return link;
    });
}

function go() {
    revealIntroContent();
    pictureReveal();
    routesListener();
}

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    go();
} else {
    document.addEventListener('DOMContentLoaded', (event) => {
        go();
    });
}
