/* ============================================
   EDUVISION ACADEMY – script.js
   ============================================ */

/* ---- Loader ---- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1900);
});

/* ---- Scroll Progress ---- */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / docHeight * 100) + '%';
});

/* ---- Sticky Header ---- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

/* ---- Mobile Nav ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(4px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ---- Active Nav on Scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
function setActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', setActiveNav);

/* ---- Dark Mode ---- */
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const icon = darkToggle.querySelector('i');
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.replace('fa-moon', 'fa-sun');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
  }
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});
// Restore saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  darkToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

/* ---- Scroll Reveal ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

/* ---- Counter Animation ---- */
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start).toLocaleString();
  }, 16);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animateCounter(el, +el.dataset.target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

/* ---- Course Filter ---- */
const courseFilterBtns = document.querySelectorAll('.course-filter .filter-btn');
const courseCards      = document.querySelectorAll('#coursesGrid .course-card');
courseFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    courseFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    courseCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !show);
      if (show) {
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = 'fadeIn .4s ease';
        });
      }
    });
  });
});

/* ---- Results Filter ---- */
const resultFilterBtns = document.querySelectorAll('.results-filter .filter-btn');
const resultCards      = document.querySelectorAll('#resultsGrid .result-card');
resultFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    resultFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.resultFilter;
    resultCards.forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.result !== filter);
    });
  });
});

/* ---- Testimonial Carousel ---- */
const track  = document.getElementById('testimonialTrack');
const dotsWrap = document.getElementById('carouselDots');
const slides = document.querySelectorAll('.testimonial-slide');
let currentSlide = 0;
let autoSlideTimer;

// Build dots
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goToSlide(i));
  dotsWrap.appendChild(dot);
});

function goToSlide(n) {
  currentSlide = (n + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  resetAutoSlide();
}
document.getElementById('prevBtn').addEventListener('click', () => goToSlide(currentSlide - 1));
document.getElementById('nextBtn').addEventListener('click', () => goToSlide(currentSlide + 1));

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(() => goToSlide(currentSlide + 1), 4500);
}
resetAutoSlide();

/* ---- FAQ Accordion ---- */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ---- Back to Top ---- */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---- Contact Form Validation ---- */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;

  const fields = [
    { id: 'fname',   errId: 'fnameErr',   msg: 'Name is required.' },
    { id: 'fphone',  errId: 'fphoneErr',  msg: 'Phone number is required.' },
    { id: 'fcourse', errId: 'fcourseErr', msg: 'Please select a course.' },
  ];

  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const err = document.getElementById(f.errId);
    if (!el.value.trim()) {
      err.textContent = f.msg;
      el.classList.add('error');
      valid = false;
    } else {
      err.textContent = '';
      el.classList.remove('error');
    }
  });

  const phone = document.getElementById('fphone').value.trim();
  const phoneErr = document.getElementById('fphoneErr');
  if (phone && !/^[+\d\s\-]{8,15}$/.test(phone)) {
    phoneErr.textContent = 'Enter a valid phone number.';
    document.getElementById('fphone').classList.add('error');
    valid = false;
  }

  const email = document.getElementById('femail').value.trim();
  const emailErr = document.getElementById('femailErr');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailErr.textContent = 'Enter a valid email address.';
    document.getElementById('femail').classList.add('error');
    valid = false;
  } else {
    emailErr.textContent = '';
    document.getElementById('femail').classList.remove('error');
  }

  if (valid) {
    this.reset();
    const success = document.getElementById('formSuccess');
    success.style.display = 'flex';
    setTimeout(() => success.style.display = 'none', 5000);
  }
});

/* ---- Newsletter Form ---- */
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const input = this.querySelector('input');
  if (input.value) {
    input.value = '';
    input.placeholder = '✓ Subscribed successfully!';
    setTimeout(() => input.placeholder = 'Your email address', 3000);
  }
});

/* ---- AI Study Chat ---- */
const aiChatFab    = document.getElementById('aiChatFab');
const aiChatPanel  = document.getElementById('aiChatPanel');
const aiChatClose  = document.getElementById('aiChatClose');
const aiMessages   = document.getElementById('aiChatMessages');
const aiInput      = document.getElementById('aiInput');
const aiSend       = document.getElementById('aiSend');

const aiResponses = {
  default: [
    "Great question! At EduVision Academy, we have expert faculty for JEE, NEET, WBJEE, and board exams. Would you like to know about a specific course? 📚",
    "We'd love to help! Our free demo class is available for all new students. You can book one by filling the contact form below. 🎓",
    "EduVision maintains small batches of max 20 students for personalized attention. This ensures every student gets the focus they deserve! 💡",
    "Our success rate is 98% and we have 50+ rank holders. Join us and become the next topper! 🏆",
    "We offer both online and offline classes for maximum flexibility. Call us at +91 98000 00000 to know more!"
  ],
  jee:  ["JEE coaching at EduVision covers both Main and Advanced. We have IIT alumni faculty with 12–15 years of experience. Batch size is limited to 15 seats. 🔬"],
  neet: ["Our NEET program covers Biology, Physics, and Chemistry with specialist faculty. Moumita ma'am's Biology sessions are especially popular! 🧬"],
  fee:  ["For fee structure and batch details, please call us at +91 98000 00000 or fill the contact form. We also offer merit-based scholarships! 💰"],
  admission: ["Admissions for 2026–2027 are now open! Fill the form below or call +91 98000 00000. Hurry — seats are limited! 📋"],
  demo: ["Book your free demo class by filling the contact form below or calling us directly. It's completely free — no strings attached! 🎁"],
};

function getAIResponse(text) {
  const t = text.toLowerCase();
  if (t.includes('jee'))       return aiResponses.jee[0];
  if (t.includes('neet'))      return aiResponses.neet[0];
  if (t.includes('fee') || t.includes('cost') || t.includes('price') || t.includes('scholarship')) return aiResponses.fee[0];
  if (t.includes('admission') || t.includes('enroll') || t.includes('join')) return aiResponses.admission[0];
  if (t.includes('demo'))      return aiResponses.demo[0];
  return aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)];
}

function appendMessage(text, type) {
  const msg = document.createElement('div');
  msg.className = 'ai-msg ' + type;
  msg.textContent = text;
  aiMessages.appendChild(msg);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

function sendMessage() {
  const text = aiInput.value.trim();
  if (!text) return;
  appendMessage(text, 'user');
  aiInput.value = '';
  setTimeout(() => appendMessage(getAIResponse(text), 'ai'), 700);
}

aiChatFab.addEventListener('click', () => aiChatPanel.classList.toggle('open'));
aiChatClose.addEventListener('click', () => aiChatPanel.classList.remove('open'));
aiSend.addEventListener('click', sendMessage);
aiInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

/* ---- Search Modal ---- */
const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchClose = document.getElementById('searchClose');

const searchData = [
  { title: 'JEE Main Coaching', section: '#courses' },
  { title: 'JEE Advanced Coaching', section: '#courses' },
  { title: 'NEET Preparation', section: '#courses' },
  { title: 'WBJEE Coaching', section: '#courses' },
  { title: 'CUET Preparation', section: '#courses' },
  { title: 'Class 10 Board Exam', section: '#courses' },
  { title: 'Class 12 Board + Entrance', section: '#courses' },
  { title: 'Olympiad Preparation', section: '#courses' },
  { title: 'Dr. Radhika Mishra – Physics', section: '#faculty' },
  { title: 'Dr. Anupam Roy – Chemistry', section: '#faculty' },
  { title: 'Moumita Ghosh – Biology', section: '#faculty' },
  { title: 'Jitendra Shah – Mathematics', section: '#faculty' },
  { title: 'Krishna Saha – Mentor', section: '#faculty' },
  { title: 'Student Results & Rankings', section: '#results' },
  { title: 'Admissions 2026–2027', section: '#admission' },
  { title: 'Contact & Free Demo', section: '#contact' },
  { title: 'About EduVision Academy', section: '#about' },
  { title: 'Testimonials', section: '#testimonials' },
];

searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase().trim();
  searchResults.innerHTML = '';
  if (!q) return;
  const matches = searchData.filter(item => item.title.toLowerCase().includes(q)).slice(0, 6);
  if (matches.length === 0) {
    searchResults.innerHTML = '<div class="search-result-item">No results found.</div>';
    return;
  }
  matches.forEach(item => {
    const div = document.createElement('div');
    div.className = 'search-result-item';
    div.innerHTML = `<i class="fa-solid fa-magnifying-glass" style="margin-right:.5rem;opacity:.4"></i>${item.title}`;
    div.addEventListener('click', () => {
      closeSearch();
      const target = document.querySelector(item.section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
    searchResults.appendChild(div);
  });
});

function openSearch() { searchModal.classList.add('open'); searchInput.focus(); }
function closeSearch() { searchModal.classList.remove('open'); searchInput.value = ''; searchResults.innerHTML = ''; }
searchClose.addEventListener('click', closeSearch);
searchModal.addEventListener('click', e => { if (e.target === searchModal) closeSearch(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSearch();
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
});

/* ---- CSS Keyframe for card fade in ---- */
const styleEl = document.createElement('style');
styleEl.textContent = `
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;
document.head.appendChild(styleEl);

/* ---- Lazy Loading Images (placeholder) ---- */
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imgObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        imgObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imgObserver.observe(img));
}