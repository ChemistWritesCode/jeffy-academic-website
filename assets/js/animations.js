/**
 * Animations for academic website
 * Uses GSAP for smooth animations and transitions
 */

// Initialize animations when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initial page load animation
    animatePageLoad();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Setup page transitions
    setupPageTransitions();
  });
  
  /**
   * Animates elements on initial page load
   */
  function animatePageLoad() {
    // Animate the header
    gsap.from('.site-header', {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
    
    // Animate the main content
    gsap.to('.animated-content', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.3,
      ease: 'power3.out'
    });
    
    // Staggered animation for navigation items
    gsap.from('.nav-item', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.5,
      ease: 'power3.out'
    });
    
    // If we're on the home page, animate the hero section elements
    if (document.querySelector('.hero')) {
      gsap.from('.hero h1', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out'
      });
      
      gsap.from('.hero .lead', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.8,
        ease: 'power3.out'
      });
      
      gsap.from('.hero .btn', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 1,
        ease: 'power3.out'
      });
    }
  }
  
  /**
   * Sets up scroll-triggered animations
   */
  function setupScrollAnimations() {
    // Animate section titles when they come into view
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out'
      });
    });
    
    // Staggered animation for list items
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
      const items = container.querySelectorAll('.staggered-item');
      
      gsap.from(items, {
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      });
    });
    
    // Animate images and media
    gsap.utils.toArray('.animate-media').forEach(media => {
      gsap.from(media, {
        scrollTrigger: {
          trigger: media,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: 'power3.out'
      });
    });
    
    // Parallax effect for backgrounds
    gsap.utils.toArray('.parallax-bg').forEach(bg => {
      gsap.to(bg, {
        scrollTrigger: {
          trigger: bg,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: '20%',
        ease: 'none'
      });
    });
  }
  
  /**
   * Sets up smooth page transitions
   */
  function setupPageTransitions() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href^="/"]:not([href^="#"]):not([target])');
    
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        // Only intercept local links
        if (link.hostname === window.location.hostname) {
          e.preventDefault();
          
          const targetUrl = link.href;
          
          // Animate the page out
          const pageTransition = document.querySelector('.page-transition');
          
          gsap.to(pageTransition, {
            y: '0%',
            duration: 0.5,
            ease: 'power3.inOut',
            onComplete: () => {
              // Navigate to the new page
              window.location.href = targetUrl;
            }
          });
        }
      });
    });
    
    // Animate the page in when it's loaded
    const pageTransition = document.querySelector('.page-transition');
    
    if (pageTransition) {
      gsap.to(pageTransition, {
        y: '-100%',
        duration: 0.5,
        delay: 0.1,
        ease: 'power3.inOut'
      });
    }
  }
  
  /**
   * Handle the header visibility on scroll
   * Hide header when scrolling down, show when scrolling up
   */
  let lastScrollTop = 0;
  const header = document.querySelector('.site-header');
  const headerHeight = header ? header.offsetHeight : 0;
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Only apply this behavior when scrolled past the header height
        if (scrollTop > headerHeight * 2) {
          if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.classList.add('header-hidden');
          } else {
            // Scrolling up
            header.classList.remove('header-hidden');
          }
        } else {
          // Always show header at the top of the page
          header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
      });
      
      ticking = true;
    }
  });