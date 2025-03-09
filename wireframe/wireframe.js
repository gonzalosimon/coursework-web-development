(function () {
  'use strict';

  const timelineData = [
    {
      year: 2000,
      title: "Launch of Broadband Internet",
      content: "The year 2000 marked a major turning point for internet connectivity in England with the introduction of broadband services. Unlike traditional dial-up connections, broadband allowed for 'always-on' internet access, significantly improving speeds and reliability. Internet Service Providers (ISPs) such as BT and NTL began rolling out broadband connections to consumers, offering speeds of up to 512 Kbps, which at the time was revolutionary. This advancement paved the way for a more seamless online experience, allowing businesses, educational institutions, and households to embrace digital technology at an unprecedented scale. The broadband rollout set the foundation for the rapid digital transformation that would follow in the coming decades.",
    },
    {
      year: 2001,
      title: "Expansion of Internet Service Providers",
      content: "Major ISPs expanded their broadband services, increasing competition and lowering costs. The government encouraged investment in digital infrastructure to support national economic growth.",
    },
  ];

  document.addEventListener("DOMContentLoaded", function () {
    const timelineList = document.getElementById('timeline-list');

    if (!timelineList) {
      console.error("Element with ID 'timeline-list' not found.");
      return;
    }

    timelineData.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div>
          <time>${item.year}</time>
          <strong>${item.title}</strong>
          <p>${item.content}</p>
        </div>
      `;
      timelineList.appendChild(li);
    });

    var items = document.querySelectorAll("#timeline-list li");

    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function callbackFunc() {
      items.forEach(item => {
        if (isElementInViewport(item)) {
          item.classList.add("in-view");
        }
      });
    }

    // Event listeners
    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);
  });

})();
