// Standalone Girlfriend Day Interactive App (No Next.js Hydration Required)
document.addEventListener('DOMContentLoaded', () => {
  console.log('🌸 Girlfriend Day App Loaded Successfully');

  // Fix all relative asset paths dynamically based on current location
  const isGHPages = window.location.pathname.includes('/girlfriend-day');
  const base = isGHPages ? '/girlfriend-day' : '';

  // Make sure opacity:0 elements are visible
  document.querySelectorAll('[style*="opacity:0"]').forEach(el => {
    el.style.opacity = '1';
  });

  // Enable interactive tap navigation
  let currentStep = 0;
  const bodyContainer = document.querySelector('.w-full.h-dvh') || document.body;

  bodyContainer.addEventListener('click', (e) => {
    // Reveal hidden elements if any
    document.querySelectorAll('[style*="opacity: 0"]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  });
});
