/**
 * Alura Labs - Home View Component (Visual Limpo e Direto)
 */
window.AluraLabs = window.AluraLabs || {};
window.AluraLabs.Components = window.AluraLabs.Components || {};

window.AluraLabs.Components.Home = {
  render() {
    return `
      <div class="view-enter">
        <!-- Hero Section Limpo -->
        <section class="hero-section">
          <h1 class="hero-title">
            ALURA<span>LABS</span>
          </h1>

          <p class="hero-subtitle">
            "Da primeira linha de código à construção de soluções."
            <br>
            Hub que reúne os três desafios desenvolvidos durante a Imersão Alura, demonstrando a evolução desde a primeira lógica básica até ferramentas completas com Inteligência Artificial.
          </p>
        </section>

        <!-- Seção Seus Desafios -->
        <section class="challenges-section">
          <div class="section-header">
            <h2 class="section-title">Seus desafios</h2>
            <p class="section-description">
              Selecione qualquer ferramenta abaixo para utilizá-la:
            </p>
          </div>

          <div class="challenges-grid">
            <!-- Desafio 01 -->
            <article class="challenge-card" onclick="AluraLabs.Router.navigate('calc-simple')">
              <div class="card-top">
                <div class="card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="16" height="20" x="4" y="2" rx="2"/>
                    <line x1="8" x2="16" y1="6" y2="6"/>
                    <line x1="16" x2="16" y1="14" y2="14"/>
                    <path d="M16 10h.01"/>
                    <path d="M12 10h.01"/>
                    <path d="M8 10h.01"/>
                  </svg>
                </div>
                <span class="badge badge-neutral">Desafio 01</span>
              </div>

              <h3 class="card-title">Calculadora</h3>
              <p class="card-desc">
                Minha primeira aplicação desenvolvida com auxílio de Inteligência Artificial.
              </p>

              <ul class="card-features">
                <li class="card-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Dois campos de números
                </li>
                <li class="card-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Adição, subtração, multiplicação e divisão
                </li>
                <li class="card-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Tratamento de divisão por zero
                </li>
              </ul>

              <div class="card-footer">
                <button class="btn btn-secondary card-btn" onclick="event.stopPropagation(); AluraLabs.Router.navigate('calc-simple')">
                  Acessar Calculadora
                </button>
              </div>
            </article>

            <!-- Desafio 02 -->
            <article class="challenge-card" onclick="AluraLabs.Router.navigate('calc-advanced')">
              <div class="card-top">
                <div class="card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <span class="badge badge-accent">Desafio 02</span>
              </div>

              <h3 class="card-title">Calculadora Aprimorada</h3>
              <p class="card-desc">
                Evolução com auxílio do Google Antigravity: visor LCD, funções científicas, memória e histórico.
              </p>

              <ul class="card-features">
                <li class="card-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Raiz quadrada, potência (x²), inverso e Pi
                </li>
                <li class="card-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Memória completa (MC, MR, M+, M−)
                </li>
                <li class="card-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Histórico de cálculos persistente
                </li>
              </ul>

              <div class="card-footer">
                <button class="btn btn-primary card-btn" onclick="event.stopPropagation(); AluraLabs.Router.navigate('calc-advanced')">
                  Acessar Aprimorada
                </button>
              </div>
            </article>

            <!-- Desafio 03 -->
            <article class="challenge-card" onclick="AluraLabs.Router.navigate('todo')">
              <div class="card-top">
                <div class="card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 11 3 3L22 4"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                  </svg>
                </div>
                <span class="badge badge-neutral">Desafio 03</span>
              </div>

              <h3 class="card-title">To-Do List</h3>
              <p class="card-desc">
                Uma aplicação para organizar atividades, acompanhar tarefas pendentes e registrar concluídas.
              </p>

              <ul class="card-features">
                <li class="card-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Filtros: Todas, Pendentes e Concluídas
                </li>
                <li class="card-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Contador e barra de progresso em tempo real
                </li>
                <li class="card-feature-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Persistência automática no navegador
                </li>
              </ul>

              <div class="card-footer">
                <button class="btn btn-secondary card-btn" onclick="event.stopPropagation(); AluraLabs.Router.navigate('todo')">
                  Acessar To-Do List
                </button>
              </div>
            </article>
          </div>
        </section>
      </div>
    `;
  },

  attachEvents() {}
};
