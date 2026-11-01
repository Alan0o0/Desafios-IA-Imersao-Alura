/**
 * Alura Labs - Todo List Component (Desafio 03)
 * Gestão de tarefas intuitiva, limpa e responsiva.
 */
window.AluraLabs = window.AluraLabs || {};
window.AluraLabs.Components = window.AluraLabs.Components || {};

window.AluraLabs.Components.TodoList = {
  state: {
    todos: [],
    filter: 'all',
    inputText: ''
  },

  init() {
    const saved = AluraLabs.Storage.get('todos_list', null);
    if (saved !== null) {
      this.state.todos = saved;
    } else {
      this.state.todos = [
        {
          id: 'task-1',
          text: 'Completar o Desafio 01: Calculadora simples',
          completed: true,
          createdAt: '31 de out, 19:30'
        },
        {
          id: 'task-2',
          text: 'Evoluir para o Desafio 02 com funções avançadas e memória',
          completed: true,
          createdAt: '31 de out, 21:15'
        },
        {
          id: 'task-3',
          text: 'Integrar os 3 desafios no Hub Alura Labs',
          completed: false,
          createdAt: '31 de out, 23:45'
        }
      ];
      this.save();
    }
  },

  save() {
    AluraLabs.Storage.set('todos_list', this.state.todos);
  },

  getMetrics() {
    const total = this.state.todos.length;
    const completed = this.state.todos.filter(t => t.completed).length;
    const pending = total - completed;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, percent };
  },

  render() {
    this.init();
    const { total, completed, pending, percent } = this.getMetrics();
    const { filter } = this.state;

    return `
      <div class="view-enter todo-page-container">
        <!-- Navegação de Retorno Integrada -->
        <div class="challenge-top-nav">
          <button class="btn-back" onclick="AluraLabs.Router.navigate('home')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Voltar ao Início
          </button>
          <span class="badge badge-neutral">Desafio 03</span>
        </div>

        <div class="todo-card-wrapper">
          <!-- Card de Progresso e Métricas -->
          <div class="todo-progress-card">
            <div class="progress-header">
              <span class="progress-label">Progresso</span>
              <span class="progress-stats-count" id="todo-stats-text">
                <span>${completed}</span> de ${total} concluídas (${percent}%)
              </span>
            </div>
            <div class="progress-bar-track">
              <div class="progress-bar-fill" id="todo-progress-fill" style="width: ${percent}%;"></div>
            </div>
          </div>

          <!-- Formulário de Nova Tarefa -->
          <form class="todo-form" id="todo-add-form" onsubmit="event.preventDefault();">
            <input
              type="text"
              id="todo-input-field"
              class="todo-input"
              placeholder="Adicionar nova tarefa..."
              autocomplete="off"
            />
            <button type="button" id="btn-add-todo" class="btn btn-primary">
              Adicionar
            </button>
          </form>

          <!-- Barra de Filtros -->
          <div class="todo-filter-bar">
            <div class="filter-tabs">
              <button type="button" class="filter-tab-btn ${filter === 'all' ? 'active' : ''}" data-filter="all">
                Todas
                <span class="tab-count-badge" id="count-all">${total}</span>
              </button>
              <button type="button" class="filter-tab-btn ${filter === 'pending' ? 'active' : ''}" data-filter="pending">
                Pendentes
                <span class="tab-count-badge" id="count-pending">${pending}</span>
              </button>
              <button type="button" class="filter-tab-btn ${filter === 'completed' ? 'active' : ''}" data-filter="completed">
                Concluídas
                <span class="tab-count-badge" id="count-completed">${completed}</span>
              </button>
            </div>

            ${total > 0 ? `
              <button type="button" class="btn btn-ghost" id="btn-clear-completed" style="font-size: 0.75rem; padding: 0.3rem 0.5rem;" title="Limpar tarefas concluídas">
                Limpar concluídas
              </button>
            ` : ''}
          </div>

          <!-- Lista de Itens -->
          <ul class="todo-items-list" id="todo-items-container">
            ${this.renderItemsList()}
          </ul>
        </div>
      </div>
    `;
  },

  renderItemsList() {
    const { todos, filter } = this.state;

    const filtered = todos.filter(t => {
      if (filter === 'pending') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    });

    if (filtered.length === 0) {
      let emptyMsg = 'Sua lista está limpa. Adicione uma tarefa acima.';
      if (filter === 'pending') emptyMsg = 'Nenhuma tarefa pendente no momento.';
      if (filter === 'completed') emptyMsg = 'Nenhuma tarefa concluída ainda.';

      return `
        <div class="todo-empty-state">
          <div class="empty-title">Nenhuma tarefa</div>
          <div class="empty-desc">${emptyMsg}</div>
        </div>
      `;
    }

    return filtered.map(item => `
      <li class="todo-item ${item.completed ? 'completed' : ''}" id="todo-item-${item.id}">
        <button
          type="button"
          class="custom-checkbox"
          onclick="AluraLabs.Components.TodoList.toggleTask('${item.id}')"
          aria-label="${item.completed ? 'Marcar como pendente' : 'Marcar como concluída'}"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>

        <div class="todo-content" onclick="AluraLabs.Components.TodoList.toggleTask('${item.id}')" style="cursor: pointer;">
          <span class="todo-text">${this.escapeHtml(item.text)}</span>
          <span class="todo-meta">Criada em ${item.createdAt}</span>
        </div>

        <button
          type="button"
          class="todo-delete-btn"
          onclick="AluraLabs.Components.TodoList.deleteTask('${item.id}')"
          title="Remover tarefa"
          aria-label="Remover tarefa"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </li>
    `).join('');
  },

  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  attachEvents() {
    const inputField = document.getElementById('todo-input-field');
    const addBtn = document.getElementById('btn-add-todo');
    const filterTabs = document.querySelectorAll('.filter-tab-btn');
    const clearCompletedBtn = document.getElementById('btn-clear-completed');

    if (inputField) {
      inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.addTask();
        }
      });
    }

    if (addBtn) {
      addBtn.addEventListener('click', () => this.addTask());
    }

    filterTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        this.setFilter(filter);
      });
    });

    if (clearCompletedBtn) {
      clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
    }
  },

  addTask() {
    const input = document.getElementById('todo-input-field');
    if (!input) return;

    const text = input.value.trim();
    if (!text) {
      input.focus();
      return;
    }

    const now = new Date();
    const dateFormatted = now.toLocaleDateString([], { day: '2-digit', month: 'short' }) + ', ' +
                          now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newTask = {
      id: 'task-' + Date.now(),
      text,
      completed: false,
      createdAt: dateFormatted
    };

    this.state.todos.unshift(newTask);
    this.save();

    input.value = '';
    input.focus();

    this.updateUI();
  },

  toggleTask(id) {
    const task = this.state.todos.find(t => t.id === id);
    if (!task) return;

    task.completed = !task.completed;
    this.save();

    this.updateUI();
  },

  deleteTask(id) {
    const index = this.state.todos.findIndex(t => t.id === id);
    if (index === -1) return;

    this.state.todos.splice(index, 1);
    this.save();

    this.updateUI();
  },

  clearCompleted() {
    this.state.todos = this.state.todos.filter(t => !t.completed);
    this.save();
    this.updateUI();
  },

  setFilter(filter) {
    this.state.filter = filter;
    document.querySelectorAll('.filter-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-filter') === filter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const itemsContainer = document.getElementById('todo-items-container');
    if (itemsContainer) {
      itemsContainer.innerHTML = this.renderItemsList();
    }
  },

  updateUI() {
    const { total, completed, pending, percent } = this.getMetrics();

    const statsText = document.getElementById('todo-stats-text');
    const progressFill = document.getElementById('todo-progress-fill');
    if (statsText) {
      statsText.innerHTML = `<span>${completed}</span> de ${total} concluídas (${percent}%)`;
    }
    if (progressFill) {
      progressFill.style.width = `${percent}%`;
    }

    const countAll = document.getElementById('count-all');
    const countPending = document.getElementById('count-pending');
    const countCompleted = document.getElementById('count-completed');
    if (countAll) countAll.textContent = total;
    if (countPending) countPending.textContent = pending;
    if (countCompleted) countCompleted.textContent = completed;

    const itemsContainer = document.getElementById('todo-items-container');
    if (itemsContainer) {
      itemsContainer.innerHTML = this.renderItemsList();
    }
  }
};
