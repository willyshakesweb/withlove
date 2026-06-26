/**
 * With Love N — Nails by Niru
 * Global Core UX Script
 * Handles hamburger menu, scroll properties, back-to-top button, and animations.
 */

// Local fallbacks matching the exact assets from the prompt build
const FALLBACK_IMAGES = {
  gel: [
    '/images/gallery/gel-almond/gel-almond1.jpg',
    '/images/gallery/gel-almond/gel-almond2.jpg',
    '/images/gallery/gel-square/gel-square1.jpg'
  ],
  acrylic: [
    '/images/gallery/acrylic-almonds/acrylic-almond1.jpg',
    '/images/gallery/acrylic-duck/acrylic-duck1.jpg',
    '/images/gallery/acrylic-stiletto/acrylic-stiletto1.jpg'
  ],
  french: [
    '/images/gallery/french/french-experience1.jpg',
    '/images/gallery/french/french-experience2.jpeg'
  ],
  toes: [
    '/images/gallery/toes/toes-nails-1.jpg'
  ],
  niru: '/niru-portrait.jpg',
  studio: '/studio-bg.jpeg',
  default: '/images/gallery/gel-almond/gel-almond1.jpg'
};

// Global capturing-phase error handler for 404 images
window.addEventListener('error', (event) => {
  const target = event.target;
  if (target && target.tagName === 'IMG') {
    const src = target.getAttribute('src') || '';
    let fallbackUrl = FALLBACK_IMAGES.default;
    
    if (src.includes('portrait')) {
      fallbackUrl = FALLBACK_IMAGES.niru;
    } else if (src.includes('studio') || src.includes('about')) {
      fallbackUrl = FALLBACK_IMAGES.studio;
    } else if (src.includes('toes')) {
      const list = FALLBACK_IMAGES.toes;
      fallbackUrl = list[Math.floor(Math.random() * list.length)];
    } else if (src.includes('french')) {
      const list = FALLBACK_IMAGES.french;
      fallbackUrl = list[Math.floor(Math.random() * list.length)];
    } else if (src.includes('acrylic') || src.includes('duck') || src.includes('stiletto') || src.includes('stilettos')) {
      const list = FALLBACK_IMAGES.acrylic;
      fallbackUrl = list[Math.floor(Math.random() * list.length)];
    } else if (src.includes('gel') || src.includes('square') || src.includes('almond')) {
      const list = FALLBACK_IMAGES.gel;
      fallbackUrl = list[Math.floor(Math.random() * list.length)];
    } else {
      const alt = (target.getAttribute('alt') || '').toLowerCase();
      if (alt.includes('toe') || alt.includes('pedi')) {
        fallbackUrl = FALLBACK_IMAGES.toes[0];
      } else if (alt.includes('french')) {
        fallbackUrl = FALLBACK_IMAGES.french[0];
      } else if (alt.includes('acrylic') || alt.includes('glam')) {
        fallbackUrl = FALLBACK_IMAGES.acrylic[0];
      } else if (alt.includes('gel')) {
        fallbackUrl = FALLBACK_IMAGES.gel[0];
      } else if (alt.includes('portrait') || alt.includes('niru')) {
        fallbackUrl = FALLBACK_IMAGES.niru;
      } else if (alt.includes('studio') || alt.includes('ambient') || alt.includes('salon')) {
        fallbackUrl = FALLBACK_IMAGES.studio;
      }
    }

    if (target.src !== fallbackUrl) {
      target.src = fallbackUrl;
    }
  }
}, true);

// Export function in case local modules import it
export function registerScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Unobserve once shown
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Scroll Reveals
  registerScrollReveal();

  // 1. Navigation Scroll Glassmorphism Effect
  const navbar = document.getElementById('navbar');
  const loadingBar = document.getElementById('loading-bar');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Update glass-card background on scroll
    if (scrollY > 50) {
      navbar.classList.add('glass-card', 'shadow-md', 'py-4');
      navbar.classList.remove('py-6');
    } else {
      navbar.classList.remove('glass-card', 'shadow-md', 'py-4');
      navbar.classList.add('py-6');
    }

    // Dynamic Top Loading / Scroll Indicator Progress
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrolled = (scrollY / docHeight) * 100;
      loadingBar.style.width = `${scrolled}%`;
    }

    // 2. Floating Back To Top Button visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'translate-y-24');
        backToTopBtn.classList.add('opacity-100', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'translate-y-24');
        backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
      }
    }
  });

  // Back to Top functionality
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Mobile Hamburger Navigation Overlay
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerContainer = mobileDrawer ? mobileDrawer.querySelector('div') : null;
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  if (menuToggle && mobileDrawer && drawerContainer) {
    function openMenu() {
      mobileDrawer.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Stop background scrolling
      
      // Delay opacity/transform transitions for smoothness
      setTimeout(() => {
        mobileDrawer.classList.remove('opacity-0');
        mobileDrawer.classList.add('opacity-100');
        drawerContainer.classList.remove('translate-x-full');
        drawerContainer.classList.add('translate-x-0');
      }, 50);

      hamburgerIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    }

    function closeMenu() {
      mobileDrawer.classList.remove('opacity-100');
      mobileDrawer.classList.add('opacity-0');
      drawerContainer.classList.remove('translate-x-0');
      drawerContainer.classList.add('translate-x-full');

      // Hide core backdrop after transition completes
      setTimeout(() => {
        mobileDrawer.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
      }, 500);

      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !mobileDrawer.classList.contains('hidden');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close drawers when backdrop is selected
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        closeMenu();
      }
    });

    // Close on escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileDrawer.classList.contains('hidden')) {
        closeMenu();
      }
    });
  }

// Global copy to clipboard function for account numbers
window.copyAccountNumber = function(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btnElement.innerText;
    btnElement.innerText = "Copied! ✓";
    btnElement.classList.remove('bg-white/20', 'hover:bg-white/30', 'text-white');
    btnElement.classList.add('text-green-700', 'bg-green-200', 'hover:bg-green-200');
    
    setTimeout(() => {
      btnElement.innerText = originalText;
      btnElement.classList.remove('text-green-700', 'bg-green-200', 'hover:bg-green-200');
      btnElement.classList.add('bg-white/20', 'hover:bg-white/30', 'text-white');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
    btnElement.innerText = "Error";
    setTimeout(() => {
      btnElement.innerText = "Copy";
    }, 2000);
  });
};
