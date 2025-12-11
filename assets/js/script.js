document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });

  const DOM = {
    body: document.body,
    darkModeToggle: document.getElementById("darkModeToggle"),
    scrollTopBtn: document.getElementById("scrollToTopBtn"),
    contactForm: document.getElementById("contactForm")
  };

  // Scroll-to-top button visibility with class toggle
  if (DOM.scrollTopBtn) {
    window.addEventListener('scroll', () => {
      DOM.scrollTopBtn.classList.toggle('visible', window.scrollY > 100);
    }, { passive: true });
  }


  // FITUR INTERAKTIF #1: Dark / Light Mode Toggle
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

  // FITUR INTERAKTIF #2: Scroll-to-Top Button
  if (DOM.scrollTopBtn) {
    DOM.scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // FITUR INTERAKTIF #3: Form Validation
  if (DOM.contactForm) {
    const validators = {
      name: val => val.trim().length > 0,
      email: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      message: val => val.trim().length > 0
    };

    DOM.contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let isValid = true;

      Object.entries(validators).forEach(([id, validator]) => {
        const element = document.getElementById(id);
        if (!element) return;
        
        const valid = validator(element.value);
        element.classList.toggle("is-invalid", !valid);
        
        if (!valid) isValid = false;
      });

      if (isValid) {
        alert("Terima kasih! Pesan Anda telah kami makan.");
        DOM.contactForm.reset();
      }
    });
  }

});
