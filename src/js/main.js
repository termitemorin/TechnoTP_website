// TechnoTP — Main JavaScript

(function () {
  "use strict";

  let currentLang = "fr";

  // --- Language Toggle ---
  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Update active indicator
    document.querySelectorAll(".lang-option").forEach((opt) => {
      opt.classList.toggle("active", opt.dataset.lang === lang);
    });
  }

  // --- Navbar scroll effect ---
  function handleNavScroll() {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // --- Mobile menu ---
  function setupHamburger() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("open");
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });
  }

  // --- Scroll animations ---
  function setupScrollAnimations() {
    const elements = document.querySelectorAll(
      ".service-card, .why-card, .founder-card, .contact-wrapper, .about-intro"
    );

    elements.forEach((el) => el.classList.add("fade-in"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // --- Email obfuscation ---
  function deobfuscateEmails() {
    document.querySelectorAll(".obf-email").forEach((el) => {
      const encoded = el.getAttribute("data-e");
      if (!encoded) return;
      const email = atob(encoded);
      el.href = "mailto:" + email;
      // Update visible text if it contains the [at] placeholder
      if (el.textContent.includes("[at]")) {
        el.textContent = email;
      }
    });
  }

  // --- Init ---
  document.addEventListener("DOMContentLoaded", () => {
    // Language toggle
    const langToggle = document.getElementById("langToggle");
    langToggle.addEventListener("click", () => {
      const newLang = currentLang === "fr" ? "en" : "fr";
      setLanguage(newLang);
    });

    // Navbar
    window.addEventListener("scroll", handleNavScroll, { passive: true });
    handleNavScroll();

    // Mobile menu
    setupHamburger();

    // Scroll animations
    setupScrollAnimations();

    // Email obfuscation
    deobfuscateEmails();

    // Set initial language
    setLanguage("fr");
  });
})();
