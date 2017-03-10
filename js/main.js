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
        newBg.style.opacity = 1;
    })
};
