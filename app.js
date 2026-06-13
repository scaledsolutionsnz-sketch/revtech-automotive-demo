/* Revtech Automotive — shared interactions */
(function () {
  "use strict";

  // Intro overlay
  window.addEventListener("load", function () {
    var intro = document.querySelector(".intro");
    if (intro) {
      setTimeout(function () { intro.classList.add("gone"); }, 1250);
    }
  });

  // Nav scroll state
  var shell = document.querySelector(".nav-shell");
  if (shell) {
    var onScroll = function () {
      if (window.scrollY > 30) shell.classList.add("scrolled");
      else shell.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () { links.classList.toggle("open"); });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // Rolling hero
  var slides = document.querySelectorAll(".hero-slide");
  if (slides.length > 1) {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      var i = 0;
      setInterval(function () {
        slides[i].classList.remove("active");
        i = (i + 1) % slides.length;
        slides[i].classList.add("active");
      }, 6000);
    }
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }
})();
