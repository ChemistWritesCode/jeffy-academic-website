/**
 * Main JavaScript for academic website
 * Handles UI interactions and general functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize any interactive elements
    initInteractiveElements();
  });
  
  /**
   * Initialize mobile navigation functionality
   */
  function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('show');
      });
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-nav') && navLinks.classList.contains('show')) {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('show');
        }
      });
      
      // Close mobile menu when window is resized to desktop
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && navLinks.classList.contains('show')) {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('show');
        }
      });
    }
  }
  
  /**
   * Initialize form validation
   */
  function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const formElements = contactForm.elements;
        
        // Validate required fields
        for (let i = 0; i < formElements.length; i++) {
          const element = formElements[i];
          
          if (element.hasAttribute('required') && !element.value.trim()) {
            isValid = false;
            element.classList.add('error');
            
            // Add error message if it doesn't exist
            let errorMessage = element.nextElementSibling;
            if (!errorMessage || !errorMessage.classList.contains('error-message')) {
              errorMessage = document.createElement('div');
              errorMessage.classList.add('error-message');
              errorMessage.textContent = 'This field is required';
              element.insertAdjacentElement('afterend', errorMessage);
            }
          } else if (element.type === 'email' && element.value.trim()) {
            // Validate email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(element.value)) {
              isValid = false;
              element.classList.add('error');
              
              let errorMessage = element.nextElementSibling;
              if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                errorMessage = document.createElement('div');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = 'Please enter a valid email address';
                element.insertAdjacentElement('afterend', errorMessage);
              }
            } else {
              element.classList.remove('error');
              const errorMessage = element.nextElementSibling;
              if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.remove();
              }
            }
          } else {
            element.classList.remove('error');
            const errorMessage = element.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('error-message')) {
              errorMessage.remove();
            }
          }
        }
        
        // If the form is valid, you would normally submit it
        if (isValid) {
          // Here you would typically send the form data to a server
          // For now, we'll just show a success message
          const formContent = contactForm.innerHTML;
          contactForm.innerHTML = '<div class="success-message"><h3>Thank you!</h3><p>Your message has been sent successfully.</p></div>';
          
          // Reset the form after 3 seconds
          setTimeout(() => {
            contactForm.innerHTML = formContent;
            contactForm.reset();
          }, 3000);
        }
      });
      
      // Remove error state on input
      contactForm.addEventListener('input', (e) => {
        if (e.target.classList.contains('error')) {
          e.target.classList.remove('error');
          const errorMessage = e.target.nextElementSibling;
          if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
          }
        }
      });
    }
  }
  
  /**
   * Initialize any interactive elements on the page
   */
  function initInteractiveElements() {
    // Filter functionality for publications or projects
    const filterButtons = document.querySelectorAll('.filter-button');
    
    if (filterButtons.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          button.classList.add('active');
          
          const filter = button.getAttribute('data-filter');
          const items = document.querySelectorAll('.filterable-item');
          
          items.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    }
    
    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(tooltip => {
      tooltip.addEventListener('mouseenter', () => {
        const tooltipText = tooltip.getAttribute('data-tooltip');
        const tooltipElement = document.createElement('div');
        tooltipElement.classList.add('tooltip');
        tooltipElement.textContent = tooltipText;
        
        document.body.appendChild(tooltipElement);
        
        const rect = tooltip.getBoundingClientRect();
        tooltipElement.style.top = `${rect.bottom + window.scrollY + 10}px`;
        tooltipElement.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (tooltipElement.offsetWidth / 2)}px`;
        
        setTimeout(() => {
          tooltipElement.classList.add('show');
        }, 10);
      });
      
      tooltip.addEventListener('mouseleave', () => {
        const tooltipElement = document.querySelector('.tooltip');
        if (tooltipElement) {
          tooltipElement.classList.remove('show');
          
          tooltipElement.addEventListener('transitionend', () => {
            tooltipElement.remove();
          });
        }
      });
    });
  }