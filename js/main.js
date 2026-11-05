/**
 * Easy Home - إيزي هوم
 * Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle & Backdrop
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  const backdrop = document.getElementById('mobileMenuBackdrop');

  function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
    const icon = mobileToggle?.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  }

  function openMobileMenu() {
    if (navMenu) navMenu.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    const icon = mobileToggle?.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    }
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (backdrop) {
      backdrop.addEventListener('click', closeMobileMenu);
    }

    document.querySelectorAll('.nav-link, .btn-drawer-cta').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Testimonials Carousel
  const testimonials = [
    {
      name: 'محمد العلي',
      quote: 'خدمة ممتازة وفريق محترف، أنصح بالتعامل معهم.',
      stars: 5,
      avatar: 'images/av1.jpg'
    },
    {
      name: 'سارة محمد',
      quote: 'تنظيف احترافي وسرعة في التنفيذ وتجاوب رائع من الفريق.',
      stars: 5,
      avatar: 'images/av2.jpg'
    },
    {
      name: 'أحمد السعيد',
      quote: 'البيت صار أنظف وأجمل، شكراً إيزي هوم على الدقة.',
      stars: 5,
      avatar: 'images/av3.jpg'
    },
    {
      name: 'فاطمة الشهري',
      quote: 'أفضل شركة تنظيف تعاملت معها، الأجهزة حديثة والنتيجة خيالية!',
      stars: 5,
      avatar: 'images/av2.jpg'
    },
    {
      name: 'خالد الدوسري',
      quote: 'الكنب رجع جديد كأنه أول يوم شريته، التزام بالمواعيد وأخلاق عالية.',
      stars: 5,
      avatar: 'images/av1.jpg'
    }
  ];

  let currentStartIndex = 0;
  const testimonialsContainer = document.getElementById('testimonialsGrid');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');

  function renderTestimonials(startIndex) {
    if (!testimonialsContainer) return;
    testimonialsContainer.innerHTML = '';
    
    const itemsToShow = window.innerWidth <= 768 ? 1 : 3;

    for (let i = 0; i < itemsToShow; i++) {
      const idx = (startIndex + i) % testimonials.length;
      const t = testimonials[idx];
      const card = document.createElement('div');
      card.className = 'testi-single-card';
      card.innerHTML = `
        <div class="testi-avatar-box">
          <img src="${t.avatar}" alt="${t.name}">
        </div>
        <p class="testi-quote-text">"${t.quote}"</p>
        <div class="testi-stars-row">
          ${'<i class="fa-solid fa-star"></i>'.repeat(t.stars)}
        </div>
        <h4 class="testi-client-name">${t.name}</h4>
      `;
      testimonialsContainer.appendChild(card);
    }
  }

  if (prevBtn && nextBtn && testimonialsContainer) {
    renderTestimonials(currentStartIndex);

    prevBtn.addEventListener('click', () => {
      currentStartIndex = (currentStartIndex - 1 + testimonials.length) % testimonials.length;
      renderTestimonials(currentStartIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentStartIndex = (currentStartIndex + 1) % testimonials.length;
      renderTestimonials(currentStartIndex);
    });

    window.addEventListener('resize', () => {
      renderTestimonials(currentStartIndex);
    });
  }

  // Booking Form
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccessModal = document.getElementById('bookingSuccessModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const whatsappDirectBtn = document.getElementById('whatsappDirectBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const city = document.getElementById('clientCity').value.trim();
      const service = document.getElementById('clientService').value;

      if (!name || !phone || !city || !service) {
        alert('الرجاء تعبئة جميع الحقول المطلوبة');
        return;
      }

      if (bookingSuccessModal) {
        bookingSuccessModal.classList.add('active');
      }

      bookingForm.reset();
    });
  }

  if (closeModalBtn && bookingSuccessModal) {
    closeModalBtn.addEventListener('click', () => {
      bookingSuccessModal.classList.remove('active');
    });

    bookingSuccessModal.addEventListener('click', (e) => {
      if (e.target === bookingSuccessModal) {
        bookingSuccessModal.classList.remove('active');
      }
    });
  }

  // Direct WhatsApp Button
  if (whatsappDirectBtn) {
    whatsappDirectBtn.addEventListener('click', () => {
      const name = document.getElementById('clientName')?.value.trim() || '';
      const phone = document.getElementById('clientPhone')?.value.trim() || '';
      const city = document.getElementById('clientCity')?.value.trim() || '';
      const service = document.getElementById('clientService')?.value || '';

      let text = 'السلام عليكم، أود الاستفسار عن خدمات إيزي هوم.';
      if (name || phone || service) {
        text = `السلام عليكم ورحمة الله،
أود حجز خدمة من إيزي هوم:
- الاسم: ${name || 'لم يحدد'}
- رقم الجوال: ${phone || 'لم يحدد'}
- المدينة: ${city || 'لم يحدد'}
- الخدمة المطلوبة: ${service || 'لم يحدد'}`;
      }

      const encodedText = encodeURIComponent(text);
      window.open(`https://wa.me/966547427940?text=${encodedText}`, '_blank');
    });
  }

  // Auto select service on card click
  document.querySelectorAll('.btn-card-action, .btn-tank-pill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = btn.getAttribute('data-service') || '';
      const serviceSelect = document.getElementById('clientService');
      const bookingSection = document.getElementById('booking');

      if (serviceSelect && serviceName) {
        serviceSelect.value = serviceName;
      }

      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
