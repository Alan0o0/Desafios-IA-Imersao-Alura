/**
 * Alura Labs - SPA Router
 * Navegação suave e reativa sem recarregamento de página.
 */
window.AluraLabs = window.AluraLabs || {};

window.AluraLabs.Router = {
  currentRoute: 'home',

  routes: {
    'home': window.AluraLabs.Components.Home,
    'calc-simple': window.AluraLabs.Components.SimpleCalculator,
    'calc-advanced': window.AluraLabs.Components.AdvancedCalculator,
    'todo': window.AluraLabs.Components.TodoList
  },

  init() {
    // Monitora evento hashchange para permitir histórico do navegador
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      this.navigate(hash || 'home', false);
    });

    const initialHash = window.location.hash.replace('#/', '').replace('#', '');
    this.navigate(initialHash || 'home', false);
  },

  navigate(routeName, updateHash = true) {
    if (!this.routes[routeName]) {
      routeName = 'home';
    }

    // Se estiver saindo da calculadora aprimorada, remove o listener de teclado
    if (this.currentRoute === 'calc-advanced' && routeName !== 'calc-advanced') {
      window.AluraLabs.Components.AdvancedCalculator.removeKeyboardListener();
    }

    this.currentRoute = routeName;

    if (updateHash) {
      window.location.hash = `#/${routeName}`;
    }

    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  render() {
    const navContainer = document.getElementById('navbar-mount');
    const contentContainer = document.getElementById('main-content-mount');

    if (navContainer) {
      navContainer.innerHTML = window.AluraLabs.Components.Navigation.render(this.currentRoute);
      window.AluraLabs.Components.Navigation.attachEvents();
    }

    if (contentContainer) {
      const targetComponent = this.routes[this.currentRoute];
      if (targetComponent) {
        contentContainer.innerHTML = targetComponent.render();
        if (typeof targetComponent.attachEvents === 'function') {
          targetComponent.attachEvents();
        }
      }
    }
  }
};
