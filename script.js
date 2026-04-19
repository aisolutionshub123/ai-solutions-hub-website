/* ============================================
 AI Solutions Hub - Enhanced JavaScript
 Interactions and Animations
 ============================================ */

document.addEventListener('DOMContentLoaded', function() {
 // Initialize all components
 initNavbar();
 initMobileMenu();
 initScrollAnimations();
 initCounterAnimation();
 initContactForm();
 initSmoothScroll();
});

/* Navbar Scroll Effect */
function initNavbar() {
 const navbar = document.getElementById('navbar');
 if (!navbar) return;

 let lastScroll = 0;
 
 window.addEventListener('scroll', function() {
 const currentScroll = window.pageYOffset;
 
 // Add/remove scrolled class
 if (currentScroll > 50) {
 navbar.classList.add('scrolled');
 } else {
 navbar.classList.remove('scrolled');
 }
 
 lastScroll = currentScroll;
 });
}

/* Mobile Menu Toggle */
function initMobileMenu() {
 const hamburger = document.getElementById('hamburger');
 const navLinks = document.getElementById('navLinks');
 
 if (!hamburger || !navLinks) return;
 
 hamburger.addEventListener('click', function() {
 navLinks.classList.toggle('active');
 
 // Animate hamburger
 const spans = hamburger.querySelectorAll('span');
 if (navLinks.classList.contains('active')) {
 spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
 spans[1].style.opacity = '0';
 spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
 } else {
 spans[0].style.transform = 'none';
 spans[1].style.opacity = '1';
 spans[2].style.transform = 'none';
 }
 });
 
 // Close menu when clicking a link
 const links = navLinks.querySelectorAll('a');
 links.forEach(link => {
 link.addEventListener('click', function() {
 navLinks.classList.remove('active');
 const spans = hamburger.querySelectorAll('span');
 spans[0].style.transform = 'none';
 spans[1].style.opacity = '1';
 spans[2].style.transform = 'none';
 });
 });
}

/* Scroll Animations */
function initScrollAnimations() {
 const observerOptions = {
 threshold: 0.1,
 rootMargin: '0px 0px -50px 0px'
 };
 
 const observer = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
 if (entry.isIntersecting) {
 entry.target.style.opacity = '1';
 entry.target.style.transform = 'translateY(0)';
 observer.unobserve(entry.target);
 }
 });
 }, observerOptions);
 
 // Observe elements for animation
 const animateElements = document.querySelectorAll(
 '.service-card, .dept-item, .value-card, .team-card, .faq-item, .timeline-content, .service-detailed-card, .dept-full-card, .contact-method'
 );
 
 animateElements.forEach((el, index) => {
 el.style.opacity = '0';
 el.style.transform = 'translateY(30px)';
 el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
 observer.observe(el);
 });
}

/* Counter Animation for Stats */
function initCounterAnimation() {
 const counters = document.querySelectorAll('.stat-number');
 if (counters.length === 0) return;
 
 const observerOptions = {
 threshold: 0.5
 };
 
 const observer = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
 if (entry.isIntersecting) {
 const counter = entry.target;
 const target = parseInt(counter.getAttribute('data-count'));
 animateCounter(counter, target);
 observer.unobserve(counter);
 }
 });
 }, observerOptions);
 
 counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
 let current = 0;
 const increment = target / 50;
 const duration = 2000;
 const stepTime = duration / 50;
 
 const timer = setInterval(() => {
 current += increment;
 if (current >= target) {
 element.textContent = target;
 clearInterval(timer);
 } else {
 element.textContent = Math.floor(current);
 }
 }, stepTime);
}

/* Contact Form Handling - Formspree Integration */
function initContactForm() {
 const form = document.getElementById('contactForm');
 const formSuccess = document.getElementById('formSuccess');
 const formError = document.getElementById('formError');
 const submitBtn = document.getElementById('submitBtn');
 
 if (!form) return;
 
 // Check if form was submitted (Formspree redirect back with ?submitted=true)
 const urlParams = new URLSearchParams(window.location.search);
 if (urlParams.get('submitted') === 'true') {
 form.style.display = 'none';
 formSuccess.style.display = 'block';
 // Clean up URL
 window.history.replaceState({}, document.title, window.location.pathname);
 }
 
 form.addEventListener('submit', function(e) {
 // Check if Formspree ID has been replaced
 const formAction = form.getAttribute('action');
 if (formAction.includes('FORMSPREE_ID')) {
 e.preventDefault();
 alert('Please set up your Formspree form ID first!\n\n1. Go to https://formspree.io and create a free account\n2. Create a new form\n3. Copy your form endpoint (looks like: https://formspree.io/f/xnqevjdr)\n4. Replace FORMSPREE_ID in the HTML with your actual form ID');
 return;
 }
 
 // Show loading state
 const originalText = submitBtn.innerHTML;
 submitBtn.innerHTML = '<span class="loading"></span> Sending...';
 submitBtn.disabled = true;
 
 // Form will submit normally to Formspree
 // The _next hidden field handles the redirect back
 });
}

/* Smooth Scroll for Anchor Links */
function initSmoothScroll() {
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
 anchor.addEventListener('click', function(e) {
 const href = this.getAttribute('href');
 if (href === '#') return;
 
 const target = document.querySelector(href);
 if (target) {
 e.preventDefault();
 target.scrollIntoView({
 behavior: 'smooth',
 block: 'start'
 });
 }
 });
 });
}

/* Parallax Effect for Hero Section */
window.addEventListener('scroll', function() {
 const scrolled = window.pageYOffset;
 const hero = document.querySelector('.hero');
 if (hero) {
 const rate = scrolled * 0.3;
 hero.style.backgroundPositionY = rate + 'px';
 }
});

/* Add hover effects to department cards */
document.querySelectorAll('.dept-item').forEach(item => {
 item.addEventListener('mouseenter', function() {
 this.style.transform = 'translateY(-8px) scale(1.02)';
 });
 
 item.addEventListener('mouseleave', function() {
 this.style.transform = 'translateY(0) scale(1)';
 });
});

/* Typing effect for hero title */
function typeWriter(element, text, speed = 50) {
 let i = 0;
 element.textContent = '';
 
 function type() {
 if (i < text.length) {
 element.textContent += text.charAt(i);
 i++;
 setTimeout(type, speed);
 }
 }
 
 type();
}

/* Reveal on scroll for section headers */
const sectionHeaders = document.querySelectorAll('.section-header');
const headerObserver = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
 if (entry.isIntersecting) {
 entry.target.classList.add('revealed');
 headerObserver.unobserve(entry.target);
 }
 });
}, { threshold: 0.3 });

sectionHeaders.forEach(header => headerObserver.observe(header));

/* Add CSS class for revealed state */
const style = document.createElement('style');
style.textContent = `
 .section-header {
 opacity: 0;
 transform: translateY(20px);
 transition: opacity 0.6s ease, transform 0.6s ease;
 }
 
 .section-header.revealed {
 opacity: 1;
 transform: translateY(0);
 }
`;
document.head.appendChild(style);
