/**
 * With Love N — Nails by Niru
 * Contact & FAQ Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // FAQ Accordion Toggle Interaction
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (trigger && content && icon) {
      trigger.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');

        // Close all other FAQs to keep it elegant and neat
        faqItems.forEach((otherItem) => {
          const otherContent = otherItem.querySelector('.faq-content');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherContent && otherIcon) {
            otherContent.classList.add('hidden');
            otherIcon.classList.remove('rotate-45');
          }
        });

        // Toggle selected FAQ
        if (isOpen) {
          content.classList.add('hidden');
          icon.classList.remove('rotate-45');
        } else {
          content.classList.remove('hidden');
          icon.classList.add('rotate-45');
        }
      });
    }
  });

  // Contact Form Validation & FormAction
  const contactForm = document.getElementById('contact-form');
  const contactSubmitBtn = document.getElementById('contact-submit-btn');
  const nameInput = document.getElementById('contact-name');
  const instaInput = document.getElementById('contact-instagram');
  const subjectInput = document.getElementById('contact-subject');
  const msgInput = document.getElementById('contact-message');
  const successMessage = document.getElementById('contact-success');
  const errorMessage = document.getElementById('contact-error');

  // LocalStorage Prefilling & Syncing Logic
  try {
    const savedBookingRaw = localStorage.getItem('niru_booking_client_info');
    const savedAcademyRaw = localStorage.getItem('niru_academy_student_info');
    const savedContactRaw = localStorage.getItem('niru_contact_client_info');
    
    let prefilledName = '';
    let prefilledInstagram = '';

    if (savedContactRaw) {
      const info = JSON.parse(savedContactRaw);
      prefilledName = info.name || '';
      prefilledInstagram = info.instagram || '';
    } else if (savedBookingRaw) {
      const info = JSON.parse(savedBookingRaw);
      prefilledName = info.name || '';
      prefilledInstagram = info.instagram || '';
    } else if (savedAcademyRaw) {
      const info = JSON.parse(savedAcademyRaw);
      prefilledName = info.name || '';
      prefilledInstagram = info.instagram || '';
    }

    if (nameInput && prefilledName) nameInput.value = prefilledName;
    if (instaInput && prefilledInstagram) instaInput.value = prefilledInstagram;
  } catch (err) {
    console.warn('LocalStorage access blocked or failed:', err);
  }

  function saveContactInfo() {
    try {
      const info = {
        name: nameInput ? nameInput.value.trim() : '',
        instagram: instaInput ? instaInput.value.trim() : ''
      };
      localStorage.setItem('niru_contact_client_info', JSON.stringify(info));
      
      // Also sync back to booking/academy info if they exist so user doesn't have to retype
      const savedBookingRaw = localStorage.getItem('niru_booking_client_info');
      if (savedBookingRaw) {
        const bookingInfo = JSON.parse(savedBookingRaw);
        bookingInfo.name = info.name || bookingInfo.name;
        bookingInfo.instagram = info.instagram || bookingInfo.instagram;
        localStorage.setItem('niru_booking_client_info', JSON.stringify(bookingInfo));
      }
      const savedAcademyRaw = localStorage.getItem('niru_academy_student_info');
      if (savedAcademyRaw) {
        const academyInfo = JSON.parse(savedAcademyRaw);
        academyInfo.name = info.name || academyInfo.name;
        academyInfo.instagram = info.instagram || academyInfo.instagram;
        localStorage.setItem('niru_academy_student_info', JSON.stringify(academyInfo));
      }
    } catch (err) {
      // Ignore silently
    }
  }

  function validateContactForm() {
    const isNameValid = nameInput && nameInput.value.trim() !== '';
    const isInstaValid = instaInput && instaInput.value.trim() !== '';
    const isSubjectValid = subjectInput && subjectInput.value !== '';
    const isMsgValid = msgInput && msgInput.value.trim().length >= 10;

    const isValid = isNameValid && isInstaValid && isSubjectValid && isMsgValid;

    if (contactSubmitBtn) {
      if (isValid) {
        contactSubmitBtn.disabled = false;
        contactSubmitBtn.classList.remove('opacity-60', 'cursor-not-allowed');
        contactSubmitBtn.className = "w-full flex items-center justify-center text-center bg-pastel-pink text-deep-berry py-4 rounded-full font-serif text-base tracking-widest hover:bg-dusty-rose hover:text-white transition-all duration-300 shadow-md cursor-pointer";
      } else {
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.classList.add('opacity-60', 'cursor-not-allowed');
      }
    }
    return isValid;
  }

  // Key event listeners for validating contact entries
  [nameInput, instaInput, subjectInput, msgInput].forEach((elem) => {
    if (elem) {
      elem.addEventListener('input', () => {
        if (elem === nameInput || elem === instaInput) {
          saveContactInfo();
        }
        validateContactForm();
      });
      elem.addEventListener('change', () => {
        if (elem === nameInput || elem === instaInput) {
          saveContactInfo();
        }
        validateContactForm();
      });
    }
  });

  // Handle message submission via elegant WhatsApp bridge
  if (contactForm && contactSubmitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateContactForm()) {
        if (errorMessage) {
          errorMessage.textContent = 'Please enter all fields correctly. Messages must be at least 10 letters.';
          errorMessage.classList.remove('hidden');
        }
        return;
      }

      if (errorMessage) errorMessage.classList.add('hidden');

      const name = nameInput.value.trim();
      const instagram = instaInput.value.trim().replace('@', '');
      const subject = subjectInput.value;
      const message = msgInput.value.trim();

      // Formulate beautifully formatted message for Niru
      const waMessage = 
`✨ WITH LOVE N — STUDIO MESSAGE ✨

Hi Niru! I have a question about your luxury nail room.

👤 CONTACT DETAILS
• Name: ${name}
• Instagram: @${instagram}

❓ SUBJECT: ${subject}

💬 INQUIRY DETAIL
"${message}"

— Submitted via With Love N Client Portal 🤍`;

      const waPhoneNumber = '2348137958600';
      const encodedMsg = encodeURIComponent(waMessage);
      const whatsappURL = `https://wa.me/${waPhoneNumber}?text=${encodedMsg}`;

      if (successMessage) {
        successMessage.textContent = 'Success! Linking you directly to WhatsApp chat channel...';
        successMessage.classList.remove('hidden');
      }

      setTimeout(() => {
        // Open URL with high-resilience fallback for iframe/sandbox contexts
        try {
          const opened = window.open(whatsappURL, '_blank');
          if (!opened || opened.closed || typeof opened.closed === 'undefined') {
            window.location.href = whatsappURL;
          }
        } catch (err) {
          window.location.href = whatsappURL;
        }
      }, 1000);
    });
  }

  // Double check form setup
  validateContactForm();
});
