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
  // NAVBAR SCROLL EFFECT
  // Mengubah style navbar saat scroll
  // ==========================================
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ==========================================
  // FITUR INTERAKTIF #1: Dark / Light Mode Toggle
  // Memanfaatkan DOM untuk toggle class dan localStorage
  // ==========================================
  const toggleBtn = document.getElementById("darkModeToggle");
  const body = document.body;

  // Sinkronisasi tombol dengan status saat ini (karena body sudah di-set oleh inline script di HTML)
  if (toggleBtn) {
    toggleBtn.textContent = body.classList.contains("dark-mode")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";

    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      // Animasi transisi background manual saat klik tombol agar halus
      body.style.transition = "background-color 0.3s ease, color 0.3s ease";

      if (body.classList.contains("dark-mode")) {
        toggleBtn.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
      } else {
        toggleBtn.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
      }
    });
  }

  // ==========================================
  // FITUR INTERAKTIF #2: Scroll-to-Top Button
  // DOM Manipulation: Show/hide button based on scroll position
  // ==========================================
  const scrollTopBtn = document.getElementById("scrollToTopBtn");

  if (scrollTopBtn) {
    const toggleScrollButton = () => {
      // DOM Manipulation: Mengakses scrollTop property
      const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
      // DOM Manipulation: Mengubah style display
      scrollTopBtn.style.display = scrolled > 100 ? "block" : "none";
    };

    window.addEventListener("scroll", toggleScrollButton);

    scrollTopBtn.addEventListener("click", () => {
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
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // DOM Manipulation: Mengakses elemen input
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");
      let isValid = true;

      // Remove previous validation states
      // DOM Manipulation: Menghapus class dari multiple elements
      [nameInput, emailInput, messageInput].forEach((input) => {
        if (input) input.classList.remove("is-invalid");
      });

      // Validate name
      if (!nameInput.value.trim()) {
        nameInput.classList.add("is-invalid");
        isValid = false;
      }

      // Validate email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
        emailInput.classList.add("is-invalid");
        isValid = false;
      }

      // Validate message
      if (messageInput && !messageInput.value.trim()) {
        messageInput.classList.add("is-invalid");
        isValid = false;
      }

      if (isValid) {
        alert("Terima kasih! Pesan Anda telah kami terima.");
        contactForm.reset();
      }
    });
  }

});
