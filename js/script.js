document.addEventListener('DOMContentLoaded', function() {

  // ========================================
  // Feature A: Interactive Dynamic Recipe Filtering
  // ========================================
  function initRecipeFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const recipeCards = document.querySelectorAll('.recipe-card');

    if (filterButtons.length === 0 || recipeCards.length === 0) return;

    filterButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        // Update active button state
        filterButtons.forEach(function(btn) {
          btn.classList.remove('active');
        });
        button.classList.add('active');

        const filter = button.dataset.filter;

        recipeCards.forEach(function(card) {
          if (filter === 'all' || card.dataset.region === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // ========================================
  // Feature B: "Add to Favorites" with LocalStorage Persistence
  // ========================================
  function initFavorites() {
    let favorites = [];

    // Load favorites from LocalStorage, ignoring missing or malformed data
    try {
      const stored = JSON.parse(localStorage.getItem('tastes_of_africa_favorites'));
      favorites = Array.isArray(stored) ? stored : [];
    } catch (e) {
      favorites = [];
    }

    // Save favorites; storage can be full or blocked in private browsing
    function saveFavorites() {
      try {
        localStorage.setItem('tastes_of_africa_favorites', JSON.stringify(favorites));
      } catch (e) {
        console.warn('Favorites could not be saved:', e);
      }
    }

    // Keep the button's appearance and screen reader text in sync
    function updateFavoriteButton(button, isFavorite) {
      const name = button.dataset.name;
      button.classList.toggle('favorited', isFavorite);
      button.setAttribute('aria-pressed', String(isFavorite));
      button.setAttribute('aria-label', (isFavorite ? 'Remove ' : 'Add ') + name + (isFavorite ? ' from favorites' : ' to favorites'));
    }

    // Update header counter
    function updateCounter() {
      const counter = document.getElementById('favoritesCount');
      if (counter) {
        counter.textContent = favorites.length;
      }
    }

    // Initialize favorite buttons on page load
    function initFavoriteButtons() {
      const favoriteButtons = document.querySelectorAll('.btn-favorite');

      favoriteButtons.forEach(function(button) {
        const id = button.dataset.id;

        // Restore saved state
        updateFavoriteButton(button, favorites.includes(id));

        // Add click handler
        button.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();

          if (favorites.includes(id)) {
            // Remove from favorites
            favorites = favorites.filter(function(fav) {
              return fav !== id;
            });
            updateFavoriteButton(button, false);
          } else {
            // Add to favorites
            favorites.push(id);
            updateFavoriteButton(button, true);
          }

          // Save to LocalStorage
          saveFavorites();

          // Trigger pulse animation
          button.classList.add('pulse');
          setTimeout(function() {
            button.classList.remove('pulse');
          }, 600);

          // Update counter
          updateCounter();
        });
      });
    }

    // Initialize
    updateCounter();
    initFavoriteButtons();
  }

  // ========================================
  // Feature C: Contact Form Validation & Dynamic Confirmation
  // ========================================
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');
    const messageField = document.getElementById('userMessage');
    const charCount = document.getElementById('charCount');

    if (!form) return;

    // Mark a field invalid and show the reason beneath it
    function showFieldError(field, message) {
      const error = document.createElement('span');
      error.className = 'error-message';
      error.id = field.id + 'Error';
      error.textContent = message;
      field.after(error);

      field.classList.add('field-error');
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', error.id);
    }

    // Live character counter
    if (messageField && charCount) {
      messageField.addEventListener('input', function() {
        const length = messageField.value.trim().length;
        charCount.textContent = length + ' / 21 characters minimum';
        charCount.classList.toggle('is-valid', length > 20);
      });
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Clear previous errors
      const invalidFields = form.querySelectorAll('.field-error');
      invalidFields.forEach(function(field) {
        field.classList.remove('field-error');
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
      });
      form.querySelectorAll('.error-message').forEach(function(error) {
        error.remove();
      });

      let isValid = true;
      let firstInvalidField = null;

      // Validate Name
      const nameField = document.getElementById('userName');
      if (!nameField.value.trim()) {
        showFieldError(nameField, 'Please enter your name.');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = nameField;
      }

      // Validate Email
      const emailField = document.getElementById('userEmail');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailField.value.trim() || !emailRegex.test(emailField.value.trim())) {
        showFieldError(emailField, 'Please enter a valid email address.');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = emailField;
      }

      // Validate Country
      const countryField = document.getElementById('userCountry');
      if (!countryField.value.trim()) {
        showFieldError(countryField, 'Please enter your country.');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = countryField;
      }

      // Validate Subject
      const subjectField = document.getElementById('userSubject');
      if (!subjectField.value) {
        showFieldError(subjectField, 'Please select a subject.');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = subjectField;
      }

      // Validate Message (must exceed 20 characters)
      if (messageField.value.trim().length <= 20) {
        showFieldError(messageField, 'Your message must be more than 20 characters.');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = messageField;
      }

      if (!isValid) {
        // Focus first invalid field
        if (firstInvalidField) {
          firstInvalidField.focus();
        }
        return;
      }

      // Success: Show personalized confirmation
      const userName = nameField.value.trim();
      const userSubject = subjectField.value;

      // Hide form with fade-out
      form.style.opacity = '0';
      form.style.transition = 'opacity 0.3s ease';

      setTimeout(function() {
        form.style.display = 'none';

        // Show feedback message. textContent keeps user input as plain text.
        const message = document.createElement('p');
        const nameElement = document.createElement('strong');
        const subjectElement = document.createElement('strong');
        nameElement.textContent = userName;
        subjectElement.textContent = userSubject;
        message.append('Thank you, ', nameElement, '! We\'ve received your message regarding ', subjectElement, ' and will respond shortly.');
        feedback.replaceChildren(message);
        feedback.hidden = false;
        feedback.style.opacity = '1';
        feedback.style.transition = 'opacity 0.3s ease';
      }, 300);
    });
  }

  // ========================================
  // Feature D: Mobile Navigation Toggle
  // ========================================
  function initMobileNav() {
    const hamburger = document.getElementById('hamburgerBtn');
    const navDrawer = document.getElementById('navDrawer');

    if (!hamburger || !navDrawer) return;

    // Dimmed backdrop; clicking it closes the drawer
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function isDrawerOpen() {
      return hamburger.getAttribute('aria-expanded') === 'true';
    }

    function setDrawerOpen(isOpen) {
      hamburger.setAttribute('aria-expanded', String(isOpen));
      navDrawer.classList.toggle('open', isOpen);
      navDrawer.classList.toggle('closed', !isOpen);
      overlay.classList.toggle('active', isOpen);
    }

    hamburger.addEventListener('click', function() {
      setDrawerOpen(!isDrawerOpen());
    });

    overlay.addEventListener('click', function() {
      setDrawerOpen(false);
    });

    // Escape closes the drawer and returns focus to the menu button
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isDrawerOpen()) {
        setDrawerOpen(false);
        hamburger.focus();
      }
    });

    // Close the drawer if the screen grows past the mobile layout
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function(e) {
      if (e.matches) {
        setDrawerOpen(false);
      }
    });

    // Close drawer when clicking a link inside it
    const drawerLinks = navDrawer.querySelectorAll('a');
    drawerLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        setDrawerOpen(false);
      });
    });
  }

  // ========================================
  // Feature E: Footer Newsletter Feedback
  // ========================================
  function initNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterFeedback = document.getElementById('newsletterFeedback');

    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('field-error');
        emailInput.setAttribute('aria-invalid', 'true');
        return;
      }

      // Clear error state
      emailInput.classList.remove('field-error');
      emailInput.removeAttribute('aria-invalid');

      // Show success message
      if (newsletterFeedback) {
        newsletterFeedback.textContent = 'Welcome to our culinary community!';
        newsletterFeedback.hidden = false;
        newsletterFeedback.style.opacity = '1';
        newsletterFeedback.style.transition = 'opacity 0.3s ease';

        // Clear the input
        emailInput.value = '';

        // Hide message after 5 seconds
        setTimeout(function() {
          newsletterFeedback.style.opacity = '0';
          setTimeout(function() {
            newsletterFeedback.hidden = true;
          }, 300);
        }, 5000);
      }
    });
  }

  // ========================================
  // Feature F: Hero Background Image Loop
  // ========================================
  function initHeroBgLoop() {
    const slides = document.querySelectorAll('.hero-bg-slide');
    const dots = document.querySelectorAll('.hero-dot');

    if (slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;
    let intervalId;
    let isHovered = false;

    function goToSlide(index) {
      slides.forEach(function(slide) {
        slide.classList.remove('active');
      });
      dots.forEach(function(dot) {
        dot.classList.remove('active');
      });

      currentSlide = index;
      slides[currentSlide].classList.add('active');

      if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
      }
    }

    function nextSlide() {
      const next = (currentSlide + 1) % totalSlides;
      goToSlide(next);
    }

    // Only one timer may run, and none while the pointer is over the slides
    function startLoop() {
      stopLoop();
      if (!isHovered) {
        intervalId = setInterval(nextSlide, 4000);
      }
    }

    function stopLoop() {
      clearInterval(intervalId);
    }

    // Dot click handlers
    dots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        stopLoop();
        goToSlide(parseInt(this.dataset.slide, 10));
        startLoop();
      });
    });

    // Pause on hover
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', function() {
        isHovered = true;
        stopLoop();
      });
      heroSection.addEventListener('mouseleave', function() {
        isHovered = false;
        startLoop();
      });
    }

    // Start the loop
    startLoop();
  }

  // ========================================
  // Feature G: Video Carousel
  // ========================================
  function initVideoCarousel() {
    const thumbnails = document.querySelectorAll('.video-thumb');
    const mainFrame = document.getElementById('mainVideoFrame');

    if (thumbnails.length === 0 || !mainFrame) return;

    thumbnails.forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        // Update active state
        thumbnails.forEach(function(t) {
          t.classList.remove('active');
        });
        this.classList.add('active');

        // Change video
        const videoUrl = this.dataset.video;
        if (videoUrl) {
          mainFrame.src = videoUrl;
        }
      });

      // Keyboard support
      thumb.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  }

  // ========================================
  // Feature H: About Page Image Gallery Loop
  // ========================================
  function initAboutGallery() {
    const galleryLoop = document.getElementById('aboutGalleryLoop');
    if (!galleryLoop) return;

    const slides = galleryLoop.querySelectorAll('.gallery-slide');
    const dotsContainer = document.getElementById('aboutGalleryDots');
    const prevBtn = document.getElementById('aboutGalleryPrev');
    const nextBtn = document.getElementById('aboutGalleryNext');

    if (slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;
    let intervalId;
    let isHovered = false;

    // Create dot indicators
    slides.forEach(function(_, index) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'gallery-dot' + (index === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
      dot.addEventListener('click', function() {
        stopLoop();
        goToSlide(index);
        startLoop();
      });
      dotsContainer.appendChild(dot);
    });

    function getDots() {
      return dotsContainer.querySelectorAll('.gallery-dot');
    }

    function goToSlide(index) {
      slides.forEach(function(slide) {
        slide.classList.remove('active');
      });
      getDots().forEach(function(dot) {
        dot.classList.remove('active');
      });

      currentSlide = index;
      slides[currentSlide].classList.add('active');
      getDots()[currentSlide].classList.add('active');
    }

    function nextSlide() {
      const next = (currentSlide + 1) % totalSlides;
      goToSlide(next);
    }

    function prevSlide() {
      const prev = (currentSlide - 1 + totalSlides) % totalSlides;
      goToSlide(prev);
    }

    // Only one timer may run, and none while the pointer is over the slides
    function startLoop() {
      stopLoop();
      if (!isHovered) {
        intervalId = setInterval(nextSlide, 4000);
      }
    }

    function stopLoop() {
      clearInterval(intervalId);
    }

    // Button handlers
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        stopLoop();
        prevSlide();
        startLoop();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        stopLoop();
        nextSlide();
        startLoop();
      });
    }

    // Pause on hover
    galleryLoop.addEventListener('mouseenter', function() {
      isHovered = true;
      stopLoop();
    });
    galleryLoop.addEventListener('mouseleave', function() {
      isHovered = false;
      startLoop();
    });

    // Keyboard support
    galleryLoop.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        stopLoop();
        prevSlide();
        startLoop();
      } else if (e.key === 'ArrowRight') {
        stopLoop();
        nextSlide();
        startLoop();
      }
    });

    // Start the auto-loop
    startLoop();
  }

  // ========================================
  // Feature I: Ingredient Scaling
  // ========================================
  function initIngredientScaler() {
    const scaler = document.getElementById('servingsScaler');
    if (!scaler) return;

    const FRACTIONS = ['', '1/8', '1/4', '3/8', '1/2', '5/8', '3/4', '7/8'];
    const MIN_SERVINGS = 1;
    const MAX_SERVINGS = 24;

    const baseServings = Number(scaler.dataset.baseServings);
    const output = document.getElementById('servingsValue');
    const decreaseBtn = document.getElementById('servingsDecrease');
    const increaseBtn = document.getElementById('servingsIncrease');
    const resetBtn = document.getElementById('servingsReset');
    const ingredients = document.querySelectorAll('.golden-list li');

    let servings = baseServings;

    // Round to the nearest eighth and format as "1 1/2"; never show zero
    function formatQuantity(value) {
      const eighths = Math.max(1, Math.round(value * 8));
      const whole = Math.floor(eighths / 8);
      const fraction = FRACTIONS[eighths % 8];

      if (!fraction) return String(whole);
      return whole ? whole + ' ' + fraction : fraction;
    }

    function updateIngredients() {
      const scale = servings / baseServings;

      ingredients.forEach(function(item) {
        let largest = 0;

        item.querySelectorAll('.ingredient-qty').forEach(function(quantity) {
          let amount = Number(quantity.dataset.qty) * scale;

          // Eggs, cans and similar items can't be split into fractions
          if (quantity.dataset.whole) {
            amount = Math.max(1, Math.round(amount));
          }

          largest = Math.max(largest, amount);
          quantity.textContent = formatQuantity(amount);
        });

        // "1 cup" but "1 1/2 cups"
        item.querySelectorAll('.ingredient-unit').forEach(function(unit) {
          unit.textContent = largest > 1 ? unit.dataset.many : unit.dataset.one;
        });
      });
    }

    function setServings(value) {
      servings = Math.min(MAX_SERVINGS, Math.max(MIN_SERVINGS, value));
      output.textContent = servings;
      decreaseBtn.disabled = servings === MIN_SERVINGS;
      increaseBtn.disabled = servings === MAX_SERVINGS;
      updateIngredients();
    }

    decreaseBtn.addEventListener('click', function() {
      setServings(servings - 1);
    });

    increaseBtn.addEventListener('click', function() {
      setServings(servings + 1);
    });

    resetBtn.addEventListener('click', function() {
      setServings(baseServings);
    });
  }

  // ========================================
  // Feature J: Dark / Light Mode Toggle
  // ========================================
  function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    const root = document.documentElement;

    function applyTheme(theme) {
      const isDark = theme === 'dark';

      if (isDark) {
        root.dataset.theme = 'dark';
      } else {
        delete root.dataset.theme;
      }

      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.textContent = isDark ? '\u2600' : '\u263E';
    }

    // The script in <head> has already chosen the starting theme
    applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');

    toggle.addEventListener('click', function() {
      const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(theme);

      try {
        localStorage.setItem('tastes_of_africa_theme', theme);
      } catch (e) {
        console.warn('Theme preference could not be saved:', e);
      }
    });
  }

  // ========================================
  // Initialize All Features
  // ========================================
  initRecipeFiltering();
  initFavorites();
  initContactForm();
  initMobileNav();
  initNewsletter();
  initHeroBgLoop();
  initVideoCarousel();
  initAboutGallery();
  initIngredientScaler();
  initThemeToggle();

});
