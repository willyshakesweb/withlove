/**
 * With Love N — Nails by Niru
 * Interactive Booking & WhatsApp Message Builder Script
 */

const SERVICES_MENU = {
  nails: [
    { id: 'French', name: 'Acrylic French', basePrice: 15000, recommended: 'Almond or Square', time: '1.5 – 2 Hours' },
    { id: 'Duck', name: 'Acrylic Duck', basePrice: 40000, recommended: 'Flare', time: '2.5+ Hours' },
    { id: 'Square', name: 'Acrylic Square', basePrice: 25000, recommended: 'Sharp Square', time: '1.5+ Hours' },
    { id: 'Stilettos', name: 'Acrylic Stilettos', basePrice: 35000, recommended: 'Extreme Point', time: '2.5 Hours' },
    { id: 'GelAlmond', name: 'Gel Almond', basePrice: 25000, recommended: 'Classic Round', time: '2 Hours' },
    { id: 'GelStilettos', name: 'Gel Stilettos', basePrice: 25000, recommended: 'Sleek Gel Length', time: '2 Hours' },
    { id: 'GelSquare', name: 'Gel Square', basePrice: 20000, recommended: 'Everyday Luxury', time: '1.5 Hours' },
    { id: 'CustomArt', name: 'Custom Acrylic Nail Art', basePrice: 80000, recommended: 'Fully Bespoke Design', time: '3+ Hours' },
    { id: 'Freestyle', name: 'Freestyle / Custom Design', basePrice: 50000, recommended: 'Freestyle Set', time: '2.5 Hours+' },
  ],
  toes: [
    { id: 'GelToes', name: 'Gel Toes (Luxury Chrome/Gloss)', basePrice: 10000, recommended: 'Plain or Chrome', time: '1 – 1.5 Hours' },
    { id: 'OrdGelToes', name: 'Ordinary Gel Toes', basePrice: 5000, recommended: 'Classic Neat', time: '45 mins' },
    { id: 'FrenchToes', name: 'Acrylic French Toes', basePrice: 15000, recommended: 'French Border', time: '1.5 Hours' }
  ]
};

const LENGTH_PRICE_INCREMENTS = {
  'Short': 0,
  'Medium': 5000,
  'Long': 10000,
  'Extra Long': 15000
};

const ART_PRICE_INCREMENTS = {
  'None': 0,
  'Medium': 10000,
  'Complex': 20000
};

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const catNailsBtn = document.getElementById('cat-nails-btn');
  const catToesBtn = document.getElementById('cat-toes-btn');
  const nailsCustomFields = document.getElementById('nails-custom-fields');
  
  // Custom dropdown elements
  const serviceDropdownTrigger = document.getElementById('service-dropdown-trigger');
  const selectedServiceText = document.getElementById('selected-service-text');
  const serviceDropdownList = document.getElementById('service-dropdown-list');
  const dropdownOptionsContainer = document.getElementById('dropdown-options-container');
  const dropdownArrowIcon = document.getElementById('dropdown-arrow-icon');
  
  const lengthSelect = document.getElementById('length-select');
  const shapeSelect = document.getElementById('shape-select');
  const artSelect = document.getElementById('art-select');
  
  // Date & Time slots elements
  const dateInput = document.getElementById('date-input');
  const dateError = document.getElementById('date-error');
  const timeSlotsContainer = document.getElementById('time-slots');
  
  // Client details
  const clientName = document.getElementById('client-name');
  const clientInstagram = document.getElementById('client-instagram');
  const clientWhatsapp = document.getElementById('client-whatsapp');
  const notesArea = document.getElementById('notes-area');
  
  // Drag and Drop Upload zone
  const dropzoneZone = document.getElementById('dropzone');
  const fileInput = document.getElementById('reference-file');
  const filePreview = document.getElementById('file-preview');
  const previewImg = document.getElementById('preview-img');
  const removeImgBtn = document.getElementById('remove-img');
  
  // Policy Agreement
  const acceptPoliciesCheckbox = document.getElementById('accept-policies');
  
  // Dynamic Quote Summary Card
  const quoteBaseService = document.getElementById('quote-base-service');
  const quoteBasePrice = document.getElementById('quote-base-price');
  const quoteLengthPrice = document.getElementById('quote-length-price');
  const quoteLengthLabel = document.getElementById('quote-length-label');
  const quoteArtPrice = document.getElementById('quote-art-price');
  const quoteArtLabel = document.getElementById('quote-art-label');
  const quoteTotal = document.getElementById('quote-total');
  
  // CTA Submit Button
  const bookSubmitBtn = document.getElementById('book-submit-btn');

  // State
  let currentCategory = 'nails'; // 'nails' or 'toes'
  let selectedServiceId = '';
  let selectedTimeSlot = '';
  let selectedFileBase64 = '';
  let selectedFileName = '';

  // Initialize Dates: Prevent booking past dates, & set min date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // Pre-fill fields from Query Parameters
  const urlParams = new URLSearchParams(window.location.search);
  const requestedServiceId = urlParams.get('service');

  // LocalStorage Prefilling Logic
  try {
    const savedBookingRaw = localStorage.getItem('niru_booking_client_info');
    const savedAcademyRaw = localStorage.getItem('niru_academy_student_info');
    const savedContactRaw = localStorage.getItem('niru_contact_client_info');

    let prefilledName = '';
    let prefilledInstagram = '';
    let prefilledWhatsapp = '';

    if (savedBookingRaw) {
      const info = JSON.parse(savedBookingRaw);
      prefilledName = info.name || '';
      prefilledInstagram = info.instagram || '';
      prefilledWhatsapp = info.whatsapp || '';
      if (notesArea && info.notes) notesArea.value = info.notes;
    } else if (savedAcademyRaw) {
      const info = JSON.parse(savedAcademyRaw);
      prefilledName = info.name || '';
      prefilledInstagram = info.instagram || '';
      prefilledWhatsapp = info.whatsapp || '';
    } else if (savedContactRaw) {
      const info = JSON.parse(savedContactRaw);
      prefilledName = info.name || '';
      prefilledInstagram = info.instagram || '';
    }

    if (clientName && prefilledName) clientName.value = prefilledName;
    if (clientInstagram && prefilledInstagram) clientInstagram.value = prefilledInstagram;
    if (clientWhatsapp && prefilledWhatsapp) clientWhatsapp.value = prefilledWhatsapp;
  } catch (err) {
    console.warn('LocalStorage is blocked or unavailable:', err);
  }

  function saveBookingInfo() {
    try {
      const info = {
        name: clientName ? clientName.value.trim() : '',
        instagram: clientInstagram ? clientInstagram.value.trim() : '',
        whatsapp: clientWhatsapp ? clientWhatsapp.value.trim() : '',
        notes: notesArea ? notesArea.value.trim() : ''
      };
      localStorage.setItem('niru_booking_client_info', JSON.stringify(info));

      // Propagate name and instagram to other keys for user convenience
      const savedAcademyRaw = localStorage.getItem('niru_academy_student_info');
      if (savedAcademyRaw) {
        const academyInfo = JSON.parse(savedAcademyRaw);
        academyInfo.name = info.name || academyInfo.name;
        academyInfo.instagram = info.instagram || academyInfo.instagram;
        academyInfo.whatsapp = info.whatsapp || academyInfo.whatsapp;
        localStorage.setItem('niru_academy_student_info', JSON.stringify(academyInfo));
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

  if (requestedServiceId) {
    // Detect whether this service belongs to toes or nails
    const isToes = SERVICES_MENU.toes.some(s => s.id === requestedServiceId);
    if (isToes) {
      setCategory('toes');
      selectedServiceId = requestedServiceId;
    } else {
      setCategory('nails');
      selectedServiceId = requestedServiceId;
    }
  } else {
    // Default
    setCategory('nails');
  }

  // Category Selector events
  if (catNailsBtn && catToesBtn) {
    catNailsBtn.addEventListener('click', () => setCategory('nails'));
    catToesBtn.addEventListener('click', () => setCategory('toes'));
  }

  function setCategory(category) {
    currentCategory = category;
    
    if (category === 'nails') {
      catNailsBtn.className = "flex-1 sm:flex-initial inline-flex items-center justify-center text-center px-3 sm:px-6 py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 bg-pastel-pink text-deep-berry shadow-sm focus:outline-none cursor-pointer";
      catToesBtn.className = "flex-1 sm:flex-initial inline-flex items-center justify-center text-center px-3 sm:px-6 py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 text-deep-berry hover:text-dusty-rose focus:outline-none cursor-pointer";
      nailsCustomFields.classList.remove('hidden');
    } else {
      catToesBtn.className = "flex-1 sm:flex-initial inline-flex items-center justify-center text-center px-3 sm:px-6 py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 bg-pastel-pink text-deep-berry shadow-sm focus:outline-none cursor-pointer";
      catNailsBtn.className = "flex-1 sm:flex-initial inline-flex items-center justify-center text-center px-3 sm:px-6 py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 text-deep-berry hover:text-dusty-rose focus:outline-none cursor-pointer";
      nailsCustomFields.classList.add('hidden');
    }

    populateServiceDropdown();
    updateLiveQuote();
  }

  function populateServiceDropdown() {
    if (!dropdownOptionsContainer) return;
    dropdownOptionsContainer.innerHTML = '';

    const list = SERVICES_MENU[currentCategory];
    
    // Check if the currently selectedServiceId belongs to this category
    const isValid = list.some(s => s.id === selectedServiceId);
    if (!isValid) {
      selectedServiceId = '';
    }

    // Set Trigger text based on selection
    if (selectedServiceId) {
      const selectedSvc = list.find(s => s.id === selectedServiceId);
      if (selectedSvc && selectedServiceText) {
        selectedServiceText.textContent = `${selectedSvc.name} — ₦${selectedSvc.basePrice.toLocaleString()}`;
        selectedServiceText.classList.remove('text-deep-berry/50');
      }
    } else {
      if (selectedServiceText) {
        selectedServiceText.textContent = `— Select a ${currentCategory === 'nails' ? 'Nail Set' : 'Toe Care'} Service —`;
        selectedServiceText.classList.add('text-deep-berry/50');
      }
    }

    // Add placeholder/default empty state button
    const defaultBtn = document.createElement('button');
    defaultBtn.type = 'button';
    defaultBtn.className = `w-full text-left px-4 py-3 rounded-xl text-xs font-sans tracking-wide transition-colors ${!selectedServiceId ? 'bg-blush-light text-deep-berry font-bold' : 'text-deep-berry/60 hover:bg-blush-light/30'}`;
    defaultBtn.textContent = `— Clear Selection —`;
    defaultBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectedServiceId = '';
      closeDropdown();
      populateServiceDropdown();
      updateLiveQuote();
    });
    dropdownOptionsContainer.appendChild(defaultBtn);

    // Populate each service option
    list.forEach(svc => {
      const isSelected = svc.id === selectedServiceId;
      const optBtn = document.createElement('button');
      optBtn.type = 'button';
      optBtn.className = `w-full text-left px-4 py-3 rounded-xl text-xs font-sans tracking-wide transition-all duration-300 flex items-center justify-between cursor-pointer ${isSelected ? 'bg-pastel-pink text-deep-berry font-bold' : 'text-deep-berry hover:bg-blush-light/50'}`;
      
      optBtn.innerHTML = `
        <div class="flex flex-col text-left">
          <span class="font-semibold text-xs sm:text-sm ${isSelected ? 'text-white' : 'text-deep-berry'}">${svc.name}</span>
          <span class="text-[10px] ${isSelected ? 'text-white/80' : 'text-text-muted'}">${svc.time} ${svc.recommended ? `• Rec: ${svc.recommended}` : ''}</span>
        </div>
        <span class="font-mono text-xs sm:text-sm font-bold ${isSelected ? 'text-pastel-pink' : 'text-dusty-rose'}">₦${svc.basePrice.toLocaleString()}</span>
      `;

      optBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedServiceId = svc.id;
        closeDropdown();
        populateServiceDropdown();
        updateLiveQuote();
      });

      dropdownOptionsContainer.appendChild(optBtn);
    });
  }

  // Toggle dropdown panel
  if (serviceDropdownTrigger) {
    serviceDropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown();
    });
  }

  function toggleDropdown() {
    if (!serviceDropdownList) return;
    const isHidden = serviceDropdownList.classList.contains('hidden');
    if (isHidden) {
      openDropdown();
    } else {
      closeDropdown();
    }
  }

  function openDropdown() {
    if (!serviceDropdownList) return;
    serviceDropdownList.classList.remove('hidden');
    if (dropdownArrowIcon) {
      dropdownArrowIcon.classList.add('rotate-180');
    }
    // Set active border/glow to trigger
    if (serviceDropdownTrigger) {
      serviceDropdownTrigger.classList.add('ring-1', 'ring-pastel-pink', 'border-pastel-pink');
    }
  }

  function closeDropdown() {
    if (!serviceDropdownList) return;
    serviceDropdownList.classList.add('hidden');
    if (dropdownArrowIcon) {
      dropdownArrowIcon.classList.remove('rotate-180');
    }
    if (serviceDropdownTrigger) {
      serviceDropdownTrigger.classList.remove('ring-1', 'ring-pastel-pink', 'border-pastel-pink');
    }
  }

  // Close dropdown on click outside
  document.addEventListener('click', () => {
    closeDropdown();
  });

  // Length/Shape/Art change listeners
  if (lengthSelect) lengthSelect.addEventListener('change', updateLiveQuote);
  if (shapeSelect) shapeSelect.addEventListener('change', updateLiveQuote);
  if (artSelect) artSelect.addEventListener('change', updateLiveQuote);

  function updateLiveQuote() {
    const list = SERVICES_MENU[currentCategory];
    const service = list.find(s => s.id === selectedServiceId);

    if (!service) {
      // Clear summary display if no service selected
      quoteBaseService.textContent = 'No Service Selected';
      quoteBasePrice.textContent = '₦0';
      quoteLengthRowVisibility(false);
      quoteArtRowVisibility(false);
      quoteTotal.textContent = '₦0';
      return;
    }

    // Base pricing set
    quoteBaseService.textContent = service.name;
    quoteBasePrice.textContent = `₦${service.basePrice.toLocaleString()}`;

    let totalVal = service.basePrice;

    if (currentCategory === 'nails') {
      // 1. Length Increment
      const lengthVal = lengthSelect.value;
      const lengthIncr = LENGTH_PRICE_INCREMENTS[lengthVal] || 0;
      totalVal += lengthIncr;

      if (lengthIncr > 0) {
        quoteLengthLabel.textContent = `Length Add-on (${lengthVal})`;
        quoteLengthPrice.textContent = `+₦${lengthIncr.toLocaleString()}`;
        quoteLengthRowVisibility(true);
      } else {
        quoteLengthRowVisibility(false);
      }

      // 2. Art Complexity Increment
      const artVal = artSelect.value;
      const artIncr = ART_PRICE_INCREMENTS[artVal] || 0;
      totalVal += artIncr;

      if (artIncr > 0) {
        let label = 'Medium Art (chrome/lines/accents)';
        if (artVal === 'Complex') {
          label = 'Complex Art (cartoons/3D/charms)';
        }
        quoteArtLabel.textContent = label;
        quoteArtPrice.textContent = `+₦${artIncr.toLocaleString()}`;
        quoteArtRowVisibility(true);
      } else {
        quoteArtRowVisibility(false);
      }
    } else {
      // Hide nails increment lines for toes category
      quoteLengthRowVisibility(false);
      quoteArtRowVisibility(false);
    }

    quoteTotal.textContent = `₦${totalVal.toLocaleString()}`;
    validateFormState();
  }

  function quoteLengthRowVisibility(show) {
    const row = document.getElementById('quote-length-row');
    if (!row) return;
    if (show) row.classList.remove('hidden');
    else row.classList.add('hidden');
  }

  function quoteArtRowVisibility(show) {
    const row = document.getElementById('quote-art-row');
    if (!row) return;
    if (show) row.classList.remove('hidden');
    else row.classList.add('hidden');
  }

  // Create Elegant Time Slot buttons
  function buildTimeSlots() {
    if (!timeSlotsContainer) return;
    timeSlotsContainer.innerHTML = '';

    const slots = [
      { time: '09:00 AM', label: 'Early Unhurried Set' },
      { time: '11:30 AM', label: 'Mid-Morning Luxury Work' },
      { time: '02:00 PM', label: 'Afternoon Sculpt Session' },
      { time: '04:30 PM', label: 'Evening Golden Hour' }
    ];

    slots.forEach(slot => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'w-full text-left p-4 rounded-xl border border-blush-mid/40 hover:border-deep-pink bg-white/50 transition-all duration-300 flex items-center justify-between group';
      
      btn.innerHTML = `
        <div class="space-y-0.5">
          <span class="font-mono text-sm font-semibold tracking-wide text-deep-berry block group-hover:text-dusty-rose">${slot.time}</span>
          <span class="text-[10px] text-text-muted uppercase tracking-wider block font-sans">${slot.label}</span>
        </div>
        <div class="w-5 h-5 rounded-full border border-blush-mid/60 flex items-center justify-center p-0.5 transition-colors group-hover:border-deep-pink">
          <div class="bullet w-full h-full rounded-full transition-transform scale-0 bg-deep-pink"></div>
        </div>
      `;

      btn.addEventListener('click', () => {
        // Clear all selected slots
        timeSlotsContainer.querySelectorAll('button').forEach(b => {
          b.className = 'w-full text-left p-4 rounded-xl border border-blush-mid/40 hover:border-deep-berry bg-white/50 transition-all duration-300 flex items-center justify-between group';
          b.querySelector('.bullet').classList.add('scale-0');
          b.querySelector('.bullet').classList.remove('scale-100');
        });

        // Style selected slot
        btn.className = 'w-full text-left p-4 rounded-xl border-2 border-deep-berry bg-blush-light/40 transition-all duration-300 flex items-center justify-between group';
        btn.querySelector('.bullet').classList.remove('scale-0');
        btn.querySelector('.bullet').classList.add('scale-100');
        selectedTimeSlot = slot.time;
        validateFormState();
      });

      timeSlotsContainer.appendChild(btn);
    });
  }

  // Call slot loader
  buildTimeSlots();

  // Drag & Drop Experience
  if (dropzoneZone && fileInput) {
    // Click opens file select
    dropzoneZone.addEventListener('click', () => {
      fileInput.click();
    });

    // Drag event styling
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzoneZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzoneZone.classList.add('border-deep-berry', 'bg-blush-light/35');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzoneZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzoneZone.classList.remove('border-deep-berry', 'bg-blush-light/35');
      }, false);
    });

    // Drop handler
    dropzoneZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files && files.length > 0) {
        handleFileSelection(files[0]);
      }
    });

    // File input select
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileSelection(e.target.files[0]);
      }
    });
  }

  function handleFileSelection(file) {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file as a reference (PNG, JPG, JPEG).');
      return;
    }

    selectedFileName = file.name;
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedFileBase64 = e.target.result;
      
      // Update UI to show preview
      previewImg.src = selectedFileBase64;
      dropzoneZone.classList.add('hidden');
      filePreview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }

  // Remove uploaded preview image
  if (removeImgBtn) {
    removeImgBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectedFileBase64 = '';
      selectedFileName = '';
      fileInput.value = '';
      
      filePreview.classList.add('hidden');
      dropzoneZone.classList.remove('hidden');
    });
  }

  // Real-time policy checking disables or enables submit button
  if (acceptPoliciesCheckbox) {
    acceptPoliciesCheckbox.addEventListener('change', () => {
      validateFormState();
    });
  }

  // Simple keyup validation trackers and localStorage values
  [clientName, clientInstagram, clientWhatsapp, notesArea].forEach(elem => {
    if (elem) {
      elem.addEventListener('input', () => {
        saveBookingInfo();
        validateFormState();
      });
    }
  });

  if (dateInput) {
    dateInput.addEventListener('change', validateFormState);
  }

  function validateFormState() {
    const nameFilled = clientName && clientName.value.trim() !== '';
    const instaFilled = clientInstagram && clientInstagram.value.trim() !== '';
    const waFilled = clientWhatsapp && clientWhatsapp.value.trim() !== '';
    const dateFilled = dateInput && dateInput.value !== '';
    
    let isSunday = false;
    if (dateInput && dateInput.value) {
      const parts = dateInput.value.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const dateObj = new Date(year, month, day);
        if (dateObj.getDay() === 0) {
          isSunday = true;
        }
      }
    }

    if (dateError) {
      if (isSunday) {
        dateError.textContent = '❌ Sundays are rest days. Please pick Monday to Saturday.';
        dateError.classList.remove('hidden');
        dateInput.classList.add('border-red-500');
      } else {
        dateError.textContent = '';
        dateError.classList.add('hidden');
        dateInput.classList.remove('border-red-500');
      }
    }

    const svcSelected = selectedServiceId !== '';
    const slotSelected = selectedTimeSlot !== '';
    const agreed = acceptPoliciesCheckbox && acceptPoliciesCheckbox.checked;

    const isValid = nameFilled && instaFilled && waFilled && dateFilled && !isSunday && svcSelected && slotSelected && agreed;

    if (bookSubmitBtn) {
      if (isValid) {
        bookSubmitBtn.disabled = false;
        bookSubmitBtn.classList.remove('opacity-60', 'cursor-not-allowed');
        bookSubmitBtn.className = "w-full flex items-center justify-center text-center bg-pastel-pink text-deep-berry py-4 rounded-full font-serif text-base tracking-widest hover:bg-dusty-rose hover:text-white transition-all duration-300 shadow-md cursor-pointer";
      } else {
        bookSubmitBtn.disabled = true;
        bookSubmitBtn.classList.add('opacity-60', 'cursor-not-allowed');
      }
    }
    return isValid;
  }

  // Handle Form Submission: Format and redirect via WhatsApp
  if (bookSubmitBtn) {
    bookSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (!validateFormState()) {
        const messageBox = document.getElementById('error-message');
        if (messageBox) {
          messageBox.textContent = 'Please complete all required fields, pick a time slot and agree to the studio policies.';
          messageBox.classList.remove('hidden');
        }
        return;
      }

      const list = SERVICES_MENU[currentCategory];
      const serviceObj = list.find(s => s.id === selectedServiceId);
      
      const categoryLabel = currentCategory === 'nails' ? '💅 Hand Sculpted Nails' : '👣 Luxury Gel Toes';
      const name = clientName.value.trim();
      const instagram = clientInstagram.value.trim().replace('@', '');
      const whatsapp = clientWhatsapp.value.trim();
      const date = dateInput.value;
      const slot = selectedTimeSlot;
      const note = notesArea.value.trim() || 'No explicit custom comments';
      
      // Computations
      let baseCost = serviceObj.basePrice;
      let extraLength = 'Unavailable';
      let extraArt = 'Unavailable';
      let totalCostVal = baseCost;

      if (currentCategory === 'nails') {
        const len = lengthSelect.value;
        const lenIncr = LENGTH_PRICE_INCREMENTS[len] || 0;
        totalCostVal += lenIncr;
        extraLength = `${len} (+₦${lenIncr.toLocaleString()})`;

        const art = artSelect.value;
        const artIncr = ART_PRICE_INCREMENTS[art] || 0;
        totalCostVal += artIncr;
        extraArt = `${art} Art (+₦${artIncr.toLocaleString()})`;
      }

      // Format WhatsApp content beautifully with high end structure
      const formattedMessage = 
`✨ WITH LOVE N — NAILS BY NIRU BOOKING ✨

Hi Niru! I'd love to book an appointment.

💖 CLIENT DETAILS
• Name: ${name}
• Instagram: @${instagram}
• WhatsApp Number: ${whatsapp}

💅 SERVICE
• Category: ${categoryLabel}
• Selected Set: ${serviceObj.name}
• Price: ₦${baseCost.toLocaleString()}${currentCategory === 'nails' ? `
• Nail Length: ${extraLength}
• Nail Shape: ${shapeSelect.value}
• Art Complexity: ${extraArt}` : ''}

📅 PREFERRED DATE & TIME
• Date: ${date}
• Time: ${slot}

📝 NOTES
"${note}"

I understand a deposit is required to secure this slot, confirmed via WhatsApp. I've read and agree to the studio policies (lateness, no-show, and early/late fees).

${selectedFileBase64 ? '📷 (I have an inspo photo ready to send below!)' : '📷 (No inspo photo for this set)'}`;

      // Final URL payload construction
      const waPhoneNumber = '2348137958600'; // Real WhatsApp target matching lookbook layout
      const encodedText = encodeURIComponent(formattedMessage);
      const whatsappURL = `https://wa.me/${waPhoneNumber}?text=${encodedText}`;

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

  // Prepopulate form dropdown once category defaults are sorted
  setCategory(currentCategory);
  validateFormState();
});
