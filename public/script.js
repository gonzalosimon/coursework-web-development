(function () {
  'use strict';

  // Select all timeline list items (which EJS would have rendered)
  var items = document.querySelectorAll('.timeline li');

  // Helper function to check if an element is visible in the viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Callback to add an 'in-view' CSS class if an element is in viewport
  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add('in-view');
      }
    }
  }

  // Register event listeners
  window.addEventListener('load', callbackFunc);
  window.addEventListener('resize', callbackFunc);
  window.addEventListener('scroll', callbackFunc);

})();
