var buildEls = document.querySelectorAll('.build');

function isElementInViewport (el) {
  var rect = el.getBoundingClientRect();
  return (
      (rect.top >= 0 || rect.top <= 25) && 
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 150
  );
}

function onTransitionEnd(evt) {
 evt.srcElement.classList.remove('build--animating'); 
}

var handler = function(event) {
  buildEls.forEach(function(element, index) {
    setTimeout(function() {
      if (!element.classList.contains('build--visible') && isElementInViewport(element)) {
        element.classList.add('build--animating');
        element.classList.add('build--visible');
        element.addEventListener('transitionend', onTransitionEnd);
      } 
    }, 250 * index);
  });
}

addEventListener('load', handler, {passive: true}); 
addEventListener('scroll', handler, {passive: true}); 
addEventListener('resize', handler, {passive: true}); 