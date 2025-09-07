document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeBtn');
  const menuPage = document.getElementById('menuPage');
  const menuLinks = document.querySelectorAll('.menu-content a');
  const overlays = document.querySelectorAll('.page-overlay');
  const landingPage = document.querySelector('.landing-page');
  const homeLogo = document.getElementById('homeLogo');

  // ✅ État initial au chargement
  overlays.forEach(page => page.classList.remove('active'));
  landingPage.classList.remove('hidden');
  menuPage.classList.remove('active');

  // ✅ Supprimer l’ancre de l’URL si présente
  if (window.location.hash) {
    history.replaceState(null, null, ' ');
  }

  // ✅ Logo = retour à la landing page
  homeLogo.addEventListener('click', () => {
    overlays.forEach(page => page.classList.remove('active'));
    menuPage.classList.remove('active');
    landingPage.classList.remove('hidden');
    closeBtn.classList.add('hidden');
    menuBtn.classList.remove('hidden');
  });

  // ✅ Ouvrir le menu
  menuBtn.addEventListener('click', () => {
    overlays.forEach(page => page.classList.remove('active'));
    landingPage.classList.remove('hidden');
    menuPage.classList.add('active');
    menuBtn.classList.add('hidden');
    closeBtn.classList.remove('hidden');
  });

  // ✅ Fermer le menu
  closeBtn.addEventListener('click', () => {
    menuPage.classList.remove('active');
    closeBtn.classList.add('hidden');
    menuBtn.classList.remove('hidden');
  });

  // ✅ Fermer le menu avec la touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      menuPage.classList.remove('active');
      closeBtn.classList.add('hidden');
      menuBtn.classList.remove('hidden');
    }
  });

  // ✅ Fermer le menu en cliquant en dehors
  menuPage.addEventListener('click', (e) => {
    if (e.target === menuPage) {
      menuPage.classList.remove('active');
      closeBtn.classList.add('hidden');
      menuBtn.classList.remove('hidden');
    }
  });

  // ✅ Navigation vers une page via le menu
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('data-target');
      const targetPage = document.getElementById(targetId);

      overlays.forEach(page => page.classList.remove('active'));
      landingPage.classList.add('hidden');

      if (targetPage) {
        targetPage.classList.add('active');
      }

      menuPage.classList.remove('active');
      closeBtn.classList.add('hidden');
      menuBtn.classList.remove('hidden');
    });
  });
});
function animateCounters() {
  const counters = document.querySelectorAll('.number');
  const speed = 200;

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

let played = false;
window.addEventListener('scroll', () => {
  const stats = document.querySelector('.double-stats');
  if (!played && stats.getBoundingClientRect().top < window.innerHeight) {
    animateCounters();
    played = true;
  }
});
