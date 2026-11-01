/**
 * Alura Labs - Navigation Component
 */
window.AluraLabs = window.AluraLabs || {};
window.AluraLabs.Components = window.AluraLabs.Components || {};

window.AluraLabs.Components.Navigation = {
  render(activeRoute = 'home') {
    const isMobileMenuOpen = this._mobileOpen || false;

    return `
      <header class="site-header">
        <div class="header-inner">
          <div class="brand-link" onclick="AluraLabs.Router.navigate('home')">
            <div class="brand-icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m18 16 4-4-4-4"/>
                <path d="m6 8-4 4 4 4"/>
                <path d="m14.5 4-5 16"/>
              </svg>
            </div>
            <div class="brand-name">ALURA<span>LABS</span></div>
          </div>

          <button class="mobile-nav-toggle" id="mobile-toggle-btn" aria-label="Abrir menu de navegação">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          </button>

          <nav class="nav-menu ${isMobileMenuOpen ? 'open' : ''}" id="main-nav-menu">
            <button class="nav-item-btn ${activeRoute === 'home' ? 'active' : ''}" onclick="AluraLabs.Router.navigate('home')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Início
            </button>

            <button class="nav-item-btn ${activeRoute === 'calc-simple' ? 'active' : ''}" onclick="AluraLabs.Router.navigate('calc-simple')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="16" height="20" x="4" y="2" rx="2"/>
                <line x1="8" x2="16" y1="6" y2="6"/>
                <line x1="16" x2="16" y1="14" y2="14"/>
                <path d="M16 10h.01"/>
                <path d="M12 10h.01"/>
                <path d="M8 10h.01"/>
                <path d="M12 14h.01"/>
                <path d="M8 14h.01"/>
                <path d="M12 18h.01"/>
                <path d="M8 18h.01"/>
              </svg>
              Calculadora
            </button>

            <button class="nav-item-btn ${activeRoute === 'calc-advanced' ? 'active' : ''}" onclick="AluraLabs.Router.navigate('calc-advanced')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              Calc Aprimorada
            </button>

            <button class="nav-item-btn ${activeRoute === 'todo' ? 'active' : ''}" onclick="AluraLabs.Router.navigate('todo')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 11 3 3L22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
              To-Do List
            </button>
          </nav>

          <div class="header-extra">
            <span class="tag-status">
              <span class="status-dot"></span>
              Imersão Alura • IA
            </span>
          </div>
        </div>
      </header>
    `;
  },

  attachEvents() {
    const toggleBtn = document.getElementById('mobile-toggle-btn');
    const navMenu = document.getElementById('main-nav-menu');

    if (toggleBtn && navMenu) {
      toggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
      });
    }
  }
};
