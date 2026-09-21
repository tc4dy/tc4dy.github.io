(function() {
  const hamburger = document.getElementById('hamburger');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navOverlay.classList.toggle('open');
    document.body.style.overflow = navOverlay.classList.contains('open') ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);
  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          closeMenu();
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 150);
        }
      } else {
        closeMenu();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navOverlay.classList.contains('open')) {
      closeMenu();
    }
  });

  navOverlay.addEventListener('click', (e) => {
    if (e.target === navOverlay) {
      closeMenu();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target && !this.classList.contains('nav-link')) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const GITHUB_USERNAME = 'tc4dy';
  const followersEl = document.getElementById('followersDisplay');
  const followingEl = document.getElementById('followingDisplay');
  const reposEl = document.getElementById('reposDisplay');

  async function fetchGitHubStats() {
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      if (!res.ok) throw new Error('GitHub API error');
      const data = await res.json();

      followersEl.textContent = `${data.followers} followers`;
      followingEl.textContent = `${data.following} following`;
      reposEl.textContent = `${data.public_repos}+ public repos`;

      followersEl.classList.remove('loading');
      followingEl.classList.remove('loading');
      reposEl.classList.remove('loading');
    } catch (err) {
      followersEl.textContent = '56 followers';
      followingEl.textContent = '1 following';
      reposEl.textContent = '43+ public repos';
      followersEl.classList.remove('loading');
      followingEl.classList.remove('loading');
      reposEl.classList.remove('loading');
      console.warn('GitHub stats fetch failed, using fallback.', err);
    }
  }

  fetchGitHubStats();

})();