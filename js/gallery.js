/**
 * With Love N — Nails by Niru
 * Gallery & Lookbook Interaction Script
 */

const galleryImages = {
  hand: [
    { src: '/images/gallery/hand/gallery-hand1.jpg', title: 'Hand Set 1' },
    { src: '/images/gallery/hand/gallery-hand2.jpg', title: 'Hand Set 2' },
    { src: '/images/gallery/hand/gallery-hand3.jpg', title: 'Hand Set 3' },
    { src: '/images/gallery/hand/gallery-hand4.jpg', title: 'Hand Set 4' },
    { src: '/images/gallery/hand/gallery-hand5.jpg', title: 'Hand Set 5' },
    { src: '/images/gallery/hand/gallery-hand6.jpg', title: 'Hand Set 6' },
    { src: '/images/gallery/hand/gallery-hand7.jpg', title: 'Hand Set 7' },
    { src: '/images/gallery/hand/gallery-hand8.jpg', title: 'Hand Set 8' },
    { src: '/images/gallery/hand/gallery-hand9.jpg', title: 'Hand Set 9' },
    { src: '/images/gallery/hand/gallery-hand10.jpg', title: 'Hand Set 10' },
    { src: '/images/gallery/hand/gallery-hand11.jpg', title: 'Hand Set 11' },
    { src: '/images/gallery/hand/gallery-hand12.jpg', title: 'Hand Set 12' },
    { src: '/images/gallery/hand/gallery-hand13.jpg', title: 'Hand Set 13' },
    { src: '/images/gallery/hand/gallery-hand14.jpg', title: 'Hand Set 14' },
    { src: '/images/gallery/hand/gallery-hand15.jpg', title: 'Hand Set 15' },
    { src: '/images/gallery/hand/gallery-hand16.jpg', title: 'Hand Set 16' },
    { src: '/images/gallery/hand/gallery-hand17.jpg', title: 'Hand Set 17' },
    { src: '/images/gallery/hand/gallery-hand18.jpg', title: 'Hand Set 18' },
    { src: '/images/gallery/hand/gallery-hand19.jpg', title: 'Hand Set 19' },
    { src: '/images/gallery/hand/gallery-hand20.jpg', title: 'Hand Set 20' }
  ],
  toes: [
    { src: '/images/gallery/toes/gallery-toes1.jpg', title: 'Toe Set 1' },
    { src: '/images/gallery/toes/gallery-toes2.jpg', title: 'Toe Set 2' },
    { src: '/images/gallery/toes/gallery-toes3.jpg', title: 'Toe Set 3' }
  ]
};

let activeCategory = 'all';
let currentImageIndex = 0;
let displayedImages = [];

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('gallery-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  // Build Gallery for Selected Category
  function renderGallery(category) {
    if (!gridContainer) return;

    activeCategory = category;
    gridContainer.innerHTML = '';
    displayedImages = [];

    galleryImages[category].forEach((img) => {
      displayedImages.push({ ...img, category });
    });

    displayedImages.forEach((img, idx) => {
      const itemEl = document.createElement('div');
      itemEl.className = `lookbook-card cursor-pointer border border-blush-mid/15 bg-white/70 backdrop-blur-sm p-3 rounded-[24px] reveal visible transition-all duration-300 hover:scale-[1.015] hover:shadow-xl`;
      
      itemEl.innerHTML = `
        <div class="w-full h-full rounded-[18px] overflow-hidden relative group aspect-square bg-blush-light/20">
          <img src="${img.src}" alt="${img.title}" class="w-full h-full object-cover object-center rounded-xl" loading="lazy" referrerPolicy="no-referrer" />
          <div class="lookbook-overlay">
            <span class="font-sans text-[9px] uppercase tracking-widest text-pastel-pink font-bold">${img.category === 'hand' ? 'Hand Nails' : 'Toes'}</span>
            <h4 class="font-serif italic text-lg leading-tight mt-1 font-light text-white">${img.title}</h4>
            <span class="text-[9px] uppercase tracking-[0.2em] text-white/80 mt-1 font-sans">Nails by Niru 🤍</span>
          </div>
        </div>
      `;

      itemEl.addEventListener('click', () => {
        openLightbox(idx);
      });

      gridContainer.appendChild(itemEl);
    });
  }

  // Filter Actions
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => {
        b.className = "filter-btn inline-flex items-center justify-center text-center px-3.5 sm:px-6 py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-deep-berry hover:text-dusty-rose transition-all duration-300 relative focus:outline-none cursor-pointer";
      });
      btn.className = "filter-btn inline-flex items-center justify-center text-center px-3.5 sm:px-6 py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-pastel-pink text-deep-berry shadow-sm focus:outline-none cursor-pointer";
      
      const cat = btn.getAttribute('data-category');
      renderGallery(cat);
    });
  });

  // Lightbox Controls
  function openLightbox(index) {
    if (!lightbox) return;
    currentImageIndex = index;
    updateLightboxContent();

    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      lightbox.classList.remove('opacity-0');
      lightbox.querySelector('div').classList.remove('scale-95');
    }, 50);
  }

  function closeLightboxContent() {
    if (!lightbox) return;
    lightbox.classList.add('opacity-0');
    lightbox.querySelector('div').classList.add('scale-95');

    setTimeout(() => {
      lightbox.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }

  function updateLightboxContent() {
    const imgData = displayedImages[currentImageIndex];
    if (!imgData) return;

    lightboxImg.src = imgData.src;
    lightboxTitle.textContent = imgData.title;
    lightboxCategory.textContent = imgData.category === 'hand' ? 'HAND NAILS BY NIRU' : 'TOE NAILS BY NIRU';
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % displayedImages.length;
    updateLightboxContent();
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + displayedImages.length) % displayedImages.length;
    updateLightboxContent();
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightboxContent);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightboxContent();
      }
    });

    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      prevImage();
    });

    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      nextImage();
    });

    // Keyboard bindings
    window.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('hidden')) return;
      if (e.key === 'Escape') closeLightboxContent();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    });

    // Mobile Swipe Controls
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const threshold = 50;
      if (touchEndX < touchStartX - threshold) {
        nextImage(); // Swipe Left
      }
      if (touchEndX > touchStartX + threshold) {
        prevImage(); // Swipe Right
      }
    }
  }

  // Bootstrap initial layout
  renderGallery('hand');
});
