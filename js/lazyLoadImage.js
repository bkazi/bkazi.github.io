function lazyLoadImg() {
    const fadeIn = (element) => {
        element.style.opacity = 1;
        element.style.pointerEvents = 'all';
        element.style.transform = 'none';
    };

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

lazyLoadImg();