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

    // Load favorites from LocalStorage
    try {
      const stored = localStorage.getItem('tastes_of_africa_favorites');
      favorites = stored ? JSON.parse(stored) : [];
    } catch (e) {
      favorites = [];
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

        // Check if already favorited
        if (favorites.includes(id)) {
          button.classList.add('favorited');
        }

        // Add click handler
        button.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();

          if (favorites.includes(id)) {
            // Remove from favorites
            favorites = favorites.filter(function(fav) {
              return fav !== id;
            });
            button.classList.remove('favorited');
          } else {
            // Add to favorites
            favorites.push(id);
            button.classList.add('favorited');
          }

          // Save to LocalStorage
          localStorage.setItem('tastes_of_africa_favorites', JSON.stringify(favorites));

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

    // Live character counter
    if (messageField && charCount) {
      messageField.addEventListener('input', function() {
        const length = messageField.value.trim().length;
        charCount.textContent = length + ' / 20 minimum characters';

        if (length > 20) {
          charCount.style.color = '#1B5E20';
        } else {
          charCount.style.color = '#666666';
        }
      });
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Clear previous errors
      const invalidFields = form.querySelectorAll('.field-error');
      invalidFields.forEach(function(field) {
        field.classList.remove('field-error');
        field.removeAttribute('aria-invalid');
      });

      let isValid = true;
      let firstInvalidField = null;

      // Validate Name
      const nameField = document.getElementById('userName');
      if (!nameField.value.trim()) {
        nameField.classList.add('field-error');
        nameField.setAttribute('aria-invalid', 'true');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = nameField;
      }

      // Validate Email
      const emailField = document.getElementById('userEmail');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailField.value.trim() || !emailRegex.test(emailField.value.trim())) {
        emailField.classList.add('field-error');
        emailField.setAttribute('aria-invalid', 'true');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = emailField;
      }

      // Validate Country
      const countryField = document.getElementById('userCountry');
      if (!countryField.value.trim()) {
        countryField.classList.add('field-error');
        countryField.setAttribute('aria-invalid', 'true');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = countryField;
      }

      // Validate Subject
      const subjectField = document.getElementById('userSubject');
      if (!subjectField.value) {
        subjectField.classList.add('field-error');
        subjectField.setAttribute('aria-invalid', 'true');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = subjectField;
      }

      // Validate Message (must exceed 20 characters)
      if (messageField.value.trim().length <= 20) {
        messageField.classList.add('field-error');
        messageField.setAttribute('aria-invalid', 'true');
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

        // Show feedback message
        feedback.innerHTML = '<p>Thank you, <strong>' + userName + '</strong>! We\'ve received your message regarding <strong>' + userSubject + '</strong> and will respond shortly.</p>';
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

    hamburger.addEventListener('click', function() {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';

      // Toggle ARIA attributes
      hamburger.setAttribute('aria-expanded', String(!isExpanded));

      // Toggle drawer visibility
      if (isExpanded) {
        navDrawer.classList.remove('open');
        navDrawer.classList.add('closed');
      } else {
        navDrawer.classList.remove('closed');
        navDrawer.classList.add('open');
      }
    });

    // Close drawer when clicking a link inside it
    const drawerLinks = navDrawer.querySelectorAll('a');
    drawerLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.setAttribute('aria-expanded', 'false');
        navDrawer.classList.remove('open');
        navDrawer.classList.add('closed');
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
  // Initialize All Features
  // ========================================
  initRecipeFiltering();
  initFavorites();
  initContactForm();
  initMobileNav();
  initNewsletter();

});
