/**
 * Alura Labs - Simple Calculator Component (Desafio 01)
 * Estrutura 100% contida, limpa e responsiva.
 */
window.AluraLabs = window.AluraLabs || {};
window.AluraLabs.Components = window.AluraLabs.Components || {};

window.AluraLabs.Components.SimpleCalculator = {
  state: {
    num1: '',
    num2: '',
    operation: '+',
    result: null,
    expression: '',
    error: null
  },

  render() {
    const { num1, num2, operation, result, expression, error } = this.state;

    return `
      <div class="view-enter simple-calc-page">
        <!-- Navegação de Retorno Integrada -->
        <div class="challenge-top-nav">
          <button class="btn-back" onclick="AluraLabs.Router.navigate('home')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Voltar ao Início
          </button>
          <span class="badge badge-neutral">Desafio 01</span>
        </div>

        <!-- Card Único da Calculadora -->
        <div class="simple-calc-card">
          <div class="calc-card-header">
            <h2 class="calc-card-title">Calculadora Básica</h2>
            <p class="calc-card-subtitle">
              Primeira aplicação com IA: informe dois valores e selecione a operação.
            </p>
          </div>

          <form id="simple-calc-form" onsubmit="event.preventDefault();">
            <!-- Entradas Numéricas -->
            <div class="calc-inputs-row">
              <div class="calc-input-wrapper">
                <label class="calc-input-label" for="simple-num1">Número 1</label>
                <input
                  type="number"
                  step="any"
                  id="simple-num1"
                  class="calc-number-input"
                  placeholder="0"
                  value="${num1}"
                  autocomplete="off"
                />
              </div>

              <div class="calc-input-wrapper">
                <label class="calc-input-label" for="simple-num2">Número 2</label>
                <input
                  type="number"
                  step="any"
                  id="simple-num2"
                  class="calc-number-input"
                  placeholder="0"
                  value="${num2}"
                  autocomplete="off"
                />
              </div>
            </div>

            <!-- Seletor de Operações -->
            <div class="operations-section">
              <label class="calc-input-label">Operação</label>
              <div class="operations-grid">
                <button type="button" class="op-btn ${operation === '+' ? 'selected' : ''}" data-op="+">
                  <span class="op-btn-symbol">+</span>
                  <span class="op-btn-name">Soma</span>
                </button>

                <button type="button" class="op-btn ${operation === '-' ? 'selected' : ''}" data-op="-">
                  <span class="op-btn-symbol">−</span>
                  <span class="op-btn-name">Subtração</span>
                </button>

                <button type="button" class="op-btn ${operation === '*' ? 'selected' : ''}" data-op="*">
                  <span class="op-btn-symbol">×</span>
                  <span class="op-btn-name">Multiplicação</span>
                </button>

                <button type="button" class="op-btn ${operation === '/' ? 'selected' : ''}" data-op="/">
                  <span class="op-btn-symbol">÷</span>
                  <span class="op-btn-name">Divisão</span>
                </button>
              </div>
            </div>

            <!-- Botões de Ação -->
            <div class="calc-actions-row">
              <button type="button" id="btn-simple-calculate" class="btn btn-primary btn-calc-submit">
                Calcular
              </button>

              <button type="button" id="btn-simple-clear" class="btn btn-secondary btn-calc-clear">
                Limpar
              </button>
            </div>

            <!-- Área do Resultado -->
            <div class="result-box ${result !== null || error ? 'has-result' : ''}">
              <div class="result-label">Resultado</div>
              <div class="result-equation">${expression || '—'}</div>
              
              ${error ? `
                <div class="result-value error-text">
                  ${error}
                </div>
              ` : `
                <div class="result-value">${result !== null ? result : '0'}</div>
              `}
            </div>
          </form>
        </div>
      </div>
    `;
  },

  attachEvents() {
    const num1Input = document.getElementById('simple-num1');
    const num2Input = document.getElementById('simple-num2');
    const opButtons = document.querySelectorAll('.operations-grid .op-btn');
    const calcBtn = document.getElementById('btn-simple-calculate');
    const clearBtn = document.getElementById('btn-simple-clear');

    if (num1Input) {
      num1Input.addEventListener('input', (e) => {
        this.state.num1 = e.target.value;
      });
      num1Input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.calculate();
      });
    }

    if (num2Input) {
      num2Input.addEventListener('input', (e) => {
        this.state.num2 = e.target.value;
      });
      num2Input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.calculate();
      });
    }

    opButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const op = btn.getAttribute('data-op');
        this.state.operation = op;
        opButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        if (this.state.num1 !== '' && this.state.num2 !== '') {
          this.calculate();
        }
      });
    });

    if (calcBtn) {
      calcBtn.addEventListener('click', () => this.calculate());
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clear());
    }
  },

  calculate() {
    const num1Val = document.getElementById('simple-num1')?.value ?? this.state.num1;
    const num2Val = document.getElementById('simple-num2')?.value ?? this.state.num2;
    this.state.num1 = num1Val;
    this.state.num2 = num2Val;

    if (num1Val === '' || num2Val === '') {
      this.state.error = 'Preencha os dois números para calcular.';
      this.state.result = null;
      this.state.expression = '';
      this.updateDisplay();
      return;
    }

    const res = AluraLabs.MathEvaluator.calculateBasic(num1Val, this.state.operation, num2Val);

    if (!res.success) {
      this.state.error = res.error;
      this.state.result = null;
      this.state.expression = `${num1Val} ${AluraLabs.MathEvaluator.formatOperator(this.state.operation)} ${num2Val}`;
    } else {
      this.state.error = null;
      this.state.result = res.result;
      this.state.expression = `${res.expression} =`;
    }

    this.updateDisplay();
  },

  clear() {
    this.state.num1 = '';
    this.state.num2 = '';
    this.state.result = null;
    this.state.expression = '';
    this.state.error = null;

    const num1Input = document.getElementById('simple-num1');
    const num2Input = document.getElementById('simple-num2');
    if (num1Input) num1Input.value = '';
    if (num2Input) num2Input.value = '';

    this.updateDisplay();
    if (num1Input) num1Input.focus();
  },

  updateDisplay() {
    const resultBox = document.querySelector('.result-box');
    if (!resultBox) return;

    const equationEl = resultBox.querySelector('.result-equation');
    const { error, result, expression } = this.state;

    resultBox.classList.add('has-result');

    if (equationEl) {
      equationEl.textContent = expression || '—';
    }

    let valueEl = resultBox.querySelector('.result-value');
    if (valueEl) {
      if (error) {
        valueEl.className = 'result-value error-text';
        valueEl.textContent = error;
      } else {
        valueEl.className = 'result-value';
        valueEl.textContent = result !== null ? result : '0';
      }
    }
  }
};
