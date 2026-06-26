/**
 * With Love N — Nails by Niru
 * Certified Classes & Academy Registration Script
 */

const CLASSES_MENU = [
  {
    id: 'beginner_1m',
    name: 'Beginner Class (1 Month)',
    price: 130000,
    duration: '1 Month — 3x a week',
    outlines: [
      'In-depth nail prep & cuticle hygiene',
      'Monomer & polymer chemical handling',
      'Sleek nail shapes & perfect files',
      'Step-by-step proper set application',
      'Refined visual surface finish'
    ]
  },
  {
    id: 'beginner_2m',
    name: 'Beginner Class (2 Months)',
    price: 250000,
    duration: '2 Months — 3x a week',
    outlines: [
      'Complete natural nail prep foundation',
      'Speed enhancement & bead work',
      'Precision shape control & alignment',
      'Supervised hand-on training sessions',
      'Pro-level finishes & styling'
    ]
  },
  {
    id: 'beginner_3m',
    name: 'Beginner Class (3 Months)',
    price: 350000,
    duration: '3 Months — 3x a week',
    outlines: [
      'A to Z comprehensive nail training',
      'Elite mechanical shape architecture',
      'Cartoon hand-painting & bespoke art',
      'Real-world client table practice',
      'Salon launch & brand styling coaching'
    ]
  },
  {
    id: 'upgrade_2w',
    name: 'Upgrade Class (2 Weeks)',
    price: 150000,
    duration: '2 Weeks — 3x a week',
    outlines: [
      'Targeted mechanical correction',
      'Safe speed & timing diagnostics',
      'Sleek apex alignment & structure',
      'Advanced near-cuticle finishes',
      'Syllabus built to troubleshoot issues'
    ]
  },
  {
    id: 'upgrade_1m',
    name: 'Upgrade Class (1 Month)',
    price: 250000,
    duration: '1 Month — 3x a week',
    outlines: [
      'Bespoke visual custom hand-painting',
      'Intricate 3D gel & encapsulation',
      'Exotic shapes menu extension',
      'High-tier business client model',
      'Direct pricing increase mentoring'
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const classSelect = document.getElementById('class-select');
  
  // Dynamic Quote Elements
  const quoteClassName = document.getElementById('quote-class-name');
  const quoteClassPrice = document.getElementById('quote-class-price');
  const quoteAcademyTotal = document.getElementById('quote-academy-total');
  
  // Form fields
  const studentName = document.getElementById('student-name');
  const studentInstagram = document.getElementById('student-instagram');
  const studentWhatsapp = document.getElementById('student-whatsapp');
  const studentExperience = document.getElementById('student-experience');
  const studentDate = document.getElementById('student-date');
  const studentNotes = document.getElementById('student-notes');
  const acceptAcademyPolicies = document.getElementById('accept-academy-policies');
  const academySubmitBtn = document.getElementById('academy-submit-btn');
  const errorMessage = document.getElementById('academy-error-message');

  // Pre-fill fields from Query Parameters (e.g. ?class=artistry)
  const urlParams = new URLSearchParams(window.location.search);
  const requestedClassId = urlParams.get('class');

  if (requestedClassId) {
    const matchedClass = CLASSES_MENU.find(c => c.id === requestedClassId);
    if (matchedClass && classSelect) {
      classSelect.value = requestedClassId;
    }
  }

  // LocalStorage Prefilling Logic
  try {
    const savedInfoRaw = localStorage.getItem('niru_academy_student_info');
    const savedBookingRaw = localStorage.getItem('niru_booking_client_info');
    const savedContactRaw = localStorage.getItem('niru_contact_client_info');

    let prefilledName = '';
    let prefilledInstagram = '';
    let prefilledWhatsapp = '';

    if (savedInfoRaw) {
      const info = JSON.parse(savedInfoRaw);
      prefilledName = info.name || '';
      prefilledInstagram = info.instagram || '';
      prefilledWhatsapp = info.whatsapp || '';
      if (studentExperience && info.experience) studentExperience.value = info.experience;
      if (studentNotes && info.notes) studentNotes.value = info.notes;
    } else if (savedBookingRaw) {
      const info = JSON.parse(savedBookingRaw);
      prefilledName = info.name || '';
      prefilledInstagram = info.instagram || '';
      prefilledWhatsapp = info.whatsapp || '';
    } else if (savedContactRaw) {
      const info = JSON.parse(savedContactRaw);
      prefilledName = info.name || '';
      prefilledInstagram = info.instagram || '';
    }

    if (studentName && prefilledName) studentName.value = prefilledName;
    if (studentInstagram && prefilledInstagram) studentInstagram.value = prefilledInstagram;
    if (studentWhatsapp && prefilledWhatsapp) studentWhatsapp.value = prefilledWhatsapp;
  } catch (err) {
    console.warn('LocalStorage access is blocked or unavailable:', err);
  }

  function saveStudentInfo() {
    try {
      const info = {
        name: studentName ? studentName.value.trim() : '',
        instagram: studentInstagram ? studentInstagram.value.trim() : '',
        whatsapp: studentWhatsapp ? studentWhatsapp.value.trim() : '',
        experience: studentExperience ? studentExperience.value : '',
        notes: studentNotes ? studentNotes.value.trim() : ''
      };
      localStorage.setItem('niru_academy_student_info', JSON.stringify(info));

      // Synchronize back to booking & contact if they exist
      const savedBookingRaw = localStorage.getItem('niru_booking_client_info');
      if (savedBookingRaw) {
        const bookingInfo = JSON.parse(savedBookingRaw);
        bookingInfo.name = info.name || bookingInfo.name;
        bookingInfo.instagram = info.instagram || bookingInfo.instagram;
        bookingInfo.whatsapp = info.whatsapp || bookingInfo.whatsapp;
        localStorage.setItem('niru_booking_client_info', JSON.stringify(bookingInfo));
      }
      const savedContactRaw = localStorage.getItem('niru_contact_client_info');
      if (savedContactRaw) {
        const contactInfo = JSON.parse(savedContactRaw);
        contactInfo.name = info.name || contactInfo.name;
        contactInfo.instagram = info.instagram || contactInfo.instagram;
        localStorage.setItem('niru_contact_client_info', JSON.stringify(contactInfo));
      }
    } catch (err) {
      // Ignore silently
    }
  }

  // Pre-fill selection input or change event
  function updateAcademySummary() {
    if (!classSelect) return;
    const selectedId = classSelect.value;
    const selectedClassObj = CLASSES_MENU.find(c => c.id === selectedId);

    if (!selectedClassObj) {
      quoteClassName.textContent = 'No Class Selected';
      quoteClassPrice.textContent = '₦0';
      quoteAcademyTotal.textContent = '₦0';
      return;
    }

    quoteClassName.textContent = selectedClassObj.name;
    quoteClassPrice.textContent = `₦${selectedClassObj.price.toLocaleString()}`;

    quoteAcademyTotal.textContent = `₦${selectedClassObj.price.toLocaleString()}`;
  }

  // Listeners
  if (classSelect) classSelect.addEventListener('change', updateAcademySummary);

  // Set initial state
  updateAcademySummary();

  // Simple Key Validator and saving to localStorage
  [studentName, studentInstagram, studentWhatsapp, studentExperience, studentNotes].forEach(elem => {
    if (elem) {
      elem.addEventListener('input', () => {
        saveStudentInfo();
        validateAcademyForm();
      });
    }
  });
  if (studentDate) {
    studentDate.addEventListener('change', validateAcademyForm);
  }
  if (acceptAcademyPolicies) {
    acceptAcademyPolicies.addEventListener('change', validateAcademyForm);
  }

  function validateAcademyForm() {
    const nameFilled = studentName && studentName.value.trim() !== '';
    const instaFilled = studentInstagram && studentInstagram.value.trim() !== '';
    const waFilled = studentWhatsapp && studentWhatsapp.value.trim() !== '';
    const expFilled = studentExperience && studentExperience.value !== '';
    const dateFilled = studentDate && studentDate.value !== '';
    const classPicked = classSelect && classSelect.value !== '';
    const agreed = acceptAcademyPolicies && acceptAcademyPolicies.checked;

    const isValid = nameFilled && instaFilled && waFilled && expFilled && dateFilled && classPicked && agreed;

    if (academySubmitBtn) {
      if (isValid) {
        academySubmitBtn.disabled = false;
        academySubmitBtn.classList.remove('opacity-60', 'cursor-not-allowed');
        academySubmitBtn.className = "w-full flex items-center justify-center text-center bg-pastel-pink text-deep-berry py-4 rounded-full font-serif text-base tracking-widest hover:bg-dusty-rose hover:text-white transition-all duration-300 shadow-md cursor-pointer";
      } else {
        academySubmitBtn.disabled = true;
        academySubmitBtn.classList.add('opacity-60', 'cursor-not-allowed');
      }
    }
    return isValid;
  }

  // Form Submission
  if (academySubmitBtn) {
    academySubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (!validateAcademyForm()) {
        if (errorMessage) {
          errorMessage.textContent = 'Please complete all required fields, propose a start date and agree to the academy terms.';
          errorMessage.classList.remove('hidden');
        }
        return;
      }

      if (errorMessage) errorMessage.classList.add('hidden');

      const selectedId = classSelect.value;
      const classObj = CLASSES_MENU.find(c => c.id === selectedId);
      
      const name = studentName.value.trim();
      const instagram = studentInstagram.value.trim().replace('@', '');
      const whatsapp = studentWhatsapp.value.trim();
      const experience = studentExperience.value;
      const proposedDate = studentDate.value;
      const notes = studentNotes.value.trim() || 'No additional questions entered';

      let basePrice = classObj.price;

      const formattedMessage = 
`🎓 WITH LOVE N — CLASS REGISTRATION 🎓

Hi Niru! I'd like to register for your nail training program.

👤 STUDENT INFORMATION
• Full Name: ${name}
• Instagram: @${instagram}
• WhatsApp: ${whatsapp}
• Current Level: ${experience} Experience

📚 SELECTED CLASS
• Package: ${classObj.name}
• Duration: ${classObj.duration}

📅 PREFERRED START DATE
${proposedDate}

✍️ NOTES
"${notes}"

💳 TUITION
• Total: ₦${basePrice.toLocaleString()}

A deposit is required to secure my spot. Please send payment details.`;

      const waPhoneNumber = '2348137958600';
      const encodedMsg = encodeURIComponent(formattedMessage);
      const whatsappURL = `https://wa.me/${waPhoneNumber}?text=${encodedMsg}`;

      // Open URL with high-resilience fallback for iframe/sandbox contexts
      try {
        const opened = window.open(whatsappURL, '_blank');
        if (!opened || opened.closed || typeof opened.closed === 'undefined') {
          window.location.href = whatsappURL;
        }
      } catch (err) {
        window.location.href = whatsappURL;
      }
    });
  }

  // Initialize checks
  validateAcademyForm();
});
