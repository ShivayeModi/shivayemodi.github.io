/* ============================================================
   TERMINAL THEME - Main JavaScript
   ============================================================ */

(function() {
  "use strict";

  // ---- Typing Animation ----
  const roles = [
    "Software Engineer",
    "CAD Developer",
    "AI Enthusiast",
    "a Physics grad turned software developer"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingEl = document.getElementById("typing-text");

  function typeRole() {
    if (!typingEl) return;
    const current = roles[roleIndex];

    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(typeRole, delay);
  }

  typeRole();

  // ---- Navbar Scroll Effect ----
  const navbar = document.getElementById("navbar");
  function handleNavScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", handleNavScroll);

  // ---- Active Nav Link ----
  const sections = document.querySelectorAll(".section, .hero");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    let current = "";
    sections.forEach(function(section) {
      var top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach(function(link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", updateActiveNav);

  // ---- Mobile Nav Toggle ----
  var navToggle = document.getElementById("nav-toggle");
  var navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function() {
      navMenu.classList.toggle("active");
    });

    navLinks.forEach(function(link) {
      link.addEventListener("click", function() {
        navMenu.classList.remove("active");
      });
    });
  }

  // ---- Scroll Reveal ----
  var revealElements = document.querySelectorAll(
    ".terminal-window, .timeline-item, .project-card, .skill-category"
  );

  revealElements.forEach(function(el) {
    el.classList.add("reveal");
  });

  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(function(el) {
    revealObserver.observe(el);
  });

  // ---- Visitor Counter ----
  (async function() {
    var el = document.getElementById("visitor-count");
    if (!el) return;
    try {
      var domain = encodeURIComponent(window.location.hostname);
      var timezone = encodeURIComponent(Intl.DateTimeFormat().resolvedOptions().timeZone);
      var res = await fetch("https://visitor.6developer.com/visit?domain=" + domain + "&timezone=" + timezone);
      var data = await res.json();
      el.textContent = data.totalCount;
    } catch (e) {
      el.textContent = "N/A";
    }
  })();

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener("click", function(e) {
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

})();
