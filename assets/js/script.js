/* ============================================ */
/* JAVASCRIPT INTERAKTIF (DOM Manipulation) */
/* Memenuhi persyaratan: Minimal 1 fitur interaktif */
/* ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // SCROLL ANIMATIONS - Intersection Observer
  // Menambahkan animasi smooth saat scroll
  // ==========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all elements with fade-in or slide-up classes
  document.querySelectorAll('.fade-in, .slide-up').forEach((element) => {
    observer.observe(element);
  });

  // ==========================================
  // CACHE DOM ELEMENTS FOR PERFORMANCE
  // ==========================================
  const DOM = {
    body: document.body,
    darkModeToggle: document.getElementById("darkModeToggle"),
    scrollTopBtn: document.getElementById("scrollToTopBtn"),
    contactForm: document.getElementById("contactForm")
  };

  // ==========================================
  // OPTIMIZED SCROLL HANDLER (Throttled)
  // Scroll-to-top button visibility
  // ==========================================
  let scrollTimeout;
  
  const handleScroll = () => {
    if (scrollTimeout) return;
    
    scrollTimeout = setTimeout(() => {
      const currentScroll = window.pageYOffset;
      
      // Scroll-to-top button visibility
      if (DOM.scrollTopBtn) {
        DOM.scrollTopBtn.style.display = currentScroll > 100 ? "block" : "none";
      }
      
      scrollTimeout = null;
    }, 100); // Throttle to every 100ms
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ==========================================
  // FITUR INTERAKTIF #1: Dark / Light Mode Toggle
  // Memanfaatkan DOM untuk toggle class dan localStorage
  // ==========================================
  if (DOM.darkModeToggle) {
    const icon = DOM.darkModeToggle.querySelector('i');
    
    // Fungsi untuk update icon berdasarkan mode saat ini
    const updateIcon = () => {
      const isDark = DOM.body.classList.contains("dark-mode");
      if (icon) {
        icon.className = isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
      }
      return isDark;
    };

    // Sinkronisasi icon dengan status awal
    updateIcon();

    DOM.darkModeToggle.addEventListener("click", () => {
      DOM.body.classList.toggle("dark-mode");
      const isDark = updateIcon();
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // ==========================================
  // FITUR INTERAKTIF #2: Scroll-to-Top Button
  // DOM Manipulation: Smooth scroll to top
  // ==========================================
  if (DOM.scrollTopBtn) {
    DOM.scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ==========================================
  // FITUR INTERAKTIF #3: Form Validation
  // DOM Manipulation: Form validation dengan classList
  // ==========================================
  if (DOM.contactForm) {
    const validators = {
      name: val => val.trim().length > 0,
      email: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      message: val => val.trim().length > 0
    };

    DOM.contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let isValid = true;

      // Validate all inputs
      Object.entries(validators).forEach(([id, validator]) => {
        const element = document.getElementById(id);
        if (!element) return;
        
        const valid = validator(element.value);
        element.classList.toggle("is-invalid", !valid);
        
        if (!valid) isValid = false;
      });

      if (isValid) {
        alert("Terima kasih! Pesan Anda telah kami terima.");
        DOM.contactForm.reset();
      }
    });
  }

});
