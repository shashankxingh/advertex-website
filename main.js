document.addEventListener('DOMContentLoaded', () => {

  // =========================================
  // 1. STICKY NAVIGATION
  // =========================================
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // =========================================
  // 2. MOBILE MENU TOGGLE
  // =========================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      document.body.classList.toggle('no-scroll', isOpen);
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  }

  // =========================================
  // 3. SCROLL REVEAL ANIMATIONS
  // =========================================
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      } else {
        entry.target.classList.remove('revealed');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });

  // =========================================
  // 4. TESTIMONIAL CAROUSEL
  // =========================================
  const track = document.getElementById('testimonial-track');
  const dotsContainer = document.getElementById('slider-dots');

  if (track && dotsContainer) {
    const dots = dotsContainer.querySelectorAll('.dot');
    let currentIndex = 0;
    const slideCount = dots.length;
    let autoSlideInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    const updateSlider = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
      currentIndex = index;
    };

    const nextSlide = () => {
      updateSlider((currentIndex + 1) % slideCount);
    };

    const prevSlide = () => {
      updateSlider((currentIndex - 1 + slideCount) % slideCount);
    };

    // Dot click navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        updateSlider(index);
        resetInterval();
      });
    });

    // Auto-rotate
    const startInterval = () => {
      autoSlideInterval = setInterval(nextSlide, 5000);
    };

    const resetInterval = () => {
      clearInterval(autoSlideInterval);
      startInterval();
    };

    // Pause on hover
    const slider = track.closest('.testimonial-slider');
    if (slider) {
      slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
      slider.addEventListener('mouseleave', startInterval);
    }

    // Touch/swipe support
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(autoSlideInterval);
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
      startInterval();
    }, { passive: true });

    startInterval();
  }

  // =========================================
  // 5. ACTIVE NAV LINK HIGHLIGHTING
  // =========================================
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });

  // =========================================
  // 6. SMOOTH SCROLL FOR ANCHOR LINKS
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 20;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // =========================================
  // 7. PORTFOLIO FILTER (for portfolio page)
  // =========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
          const category = card.dataset.category;
          if (filter === 'all' || category === filter) {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.display = '';
              requestAnimationFrame(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
              });
            }, 150);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }



  // =========================================
  // 9. FAQ ACCORDION
  // =========================================
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all other open FAQs
        document.querySelectorAll('.faq-item').forEach(faq => {
          faq.classList.remove('active');
        });

        // Toggle current FAQ
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

});
