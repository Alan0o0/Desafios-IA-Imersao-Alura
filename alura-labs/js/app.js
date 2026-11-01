/**
 * Alura Labs - Application Entry Point
 * Inicialização e utilitários globais de interface.
 */
window.AluraLabs = window.AluraLabs || {};

// Notificações Toast Globais
window.AluraLabs.showToast = function(message, duration = 2800) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E63946" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, duration);
};

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  console.log(
    '%c ALURA LABS %c Hub de Desafios da Imersão inicializado com sucesso! ',
    'background: #E63946; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    'background: #202025; color: #A1A1AA; padding: 4px 8px; border-radius: 4px;'
  );

  window.AluraLabs.Router.init();
});
