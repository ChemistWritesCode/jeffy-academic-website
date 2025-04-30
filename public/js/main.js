document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add box shadow when scrolled
      if (scrollTop > 10) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
      
      // Hide header when scrolling down, show when scrolling up
      if (scrollTop > lastScrollTop && scrollTop > 150) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
      
      lastScrollTop = scrollTop;
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('show');
        document.body.classList.toggle('menu-open');
      });
    }
    
    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const staggeredItems = document.querySelectorAll('.staggered-item');
    
    function checkReveal() {
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('visible');
        }
      });
      
      // Add delay to staggered items
      staggeredItems.forEach((item, index) => {
        const elementTop = item.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - 50) {
          setTimeout(() => {
            item.classList.add('visible');
          }, index * 100); // 100ms delay between each item
        }
      });
    }
    
    // Initial check
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
  });