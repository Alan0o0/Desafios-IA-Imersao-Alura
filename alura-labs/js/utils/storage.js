/**
 * Alura Labs - Storage Utility
 * Gerencia persistência local de dados com tratamento de exceções.
 */
window.AluraLabs = window.AluraLabs || {};

window.AluraLabs.Storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(`alura_labs_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn(`[Storage] Erro ao carregar chave "${key}":`, e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(`alura_labs_${key}`, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`[Storage] Erro ao salvar chave "${key}":`, e);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(`alura_labs_${key}`);
      return true;
    } catch (e) {
      console.warn(`[Storage] Erro ao remover chave "${key}":`, e);
      return false;
    }
  }
};
