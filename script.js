// ===========================
// TYPING EFFECT
// ===========================

const phrases = [
  "AI Developer",
  "Open-Source Contributor",
  "LLM Engineer",
  "Full Stack Developer",
  "Backend Specialist"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing-text");

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 2000; // Pause at end of phrase
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500; // Pause before next phrase
  }

  setTimeout(typeEffect, typeSpeed);
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
  typeEffect();
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// ===========================
// SMOOTH SCROLL FOR NAVIGATION
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });

      // Update active nav link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    }
  });
});

// ===========================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ===========================

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');

      // Add stagger animation to children if they exist
      const children = entry.target.querySelectorAll('.work-card, .skill-category, .highlight-item');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.style.opacity = '0';
          child.style.transform = 'translateY(30px)';
          child.style.transition = 'all 0.6s ease';

          setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          }, 50);
        }, index * 100);
      });
    }
  });
}, observerOptions);

// Observe all sections with reveal class
document.querySelectorAll('.section').forEach(section => {
  section.classList.add('reveal');
  observer.observe(section);
});

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================

const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ===========================
// TECH STACK ANIMATION
// ===========================

const techItems = document.querySelectorAll('.tech-item');

techItems.forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';

  setTimeout(() => {
    item.style.transition = 'all 0.5s ease';
    item.style.opacity = '1';
    item.style.transform = 'translateY(0)';
  }, 1000 + (index * 100));
});

// ===========================
// CURSOR TRAIL EFFECT (Optional Enhancement)
// ===========================

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '9999';
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const maxParticles = 20;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.life = 30;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
    this.size *= 0.96;
  }

  draw() {
    ctx.fillStyle = `rgba(0, 255, 136, ${this.life / 30})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

let mouseX = 0;
let mouseY = 0;
let lastMouseX = 0;
let lastMouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  const distance = Math.hypot(mouseX - lastMouseX, mouseY - lastMouseY);

  if (distance > 10 && particles.length < maxParticles) {
    particles.push(new Particle(mouseX, mouseY));
  }

  lastMouseX = mouseX;
  lastMouseY = mouseY;
});

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();

    if (particles[i].life <= 0) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ===========================
// PRELOAD ANIMATIONS
// ===========================

window.addEventListener('load', () => {
  document.body.classList.add('loaded');

  // Trigger initial animations
  setTimeout(() => {
    const heroElements = document.querySelectorAll('.greeting, .hero-name, .hero-title, .hero-description, .hero-cta, .tech-stack');
    heroElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`;
    });
  }, 100);
});

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

let ticking = false;

function requestTick(callback) {
  if (!ticking) {
    requestAnimationFrame(() => {
      callback();
      ticking = false;
    });
    ticking = true;
  }
}

// Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, 250);
});

console.log('%c Portfolio Loaded Successfully! ', 'background: #00ff88; color: #0a0e17; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%c Built with ❤️ by Aditya ', 'color: #00ff88; font-size: 14px;');