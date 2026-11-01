/**
 * Alura Labs - Advanced Calculator Component (Desafio 02)
 * Calculadora completa com funções avançadas, memória e histórico.
 */
window.AluraLabs = window.AluraLabs || {};
window.AluraLabs.Components = window.AluraLabs.Components || {};

window.AluraLabs.Components.AdvancedCalculator = {
  state: {
    currentInput: '0',
    previousValue: null,
    operator: null,
    waitingForSecondOperand: false,
    expressionText: '',
    memory: 0,
    hasMemory: false,
    history: [],
    error: null
  },

  init() {
    this.state.history = AluraLabs.Storage.get('calc_history', []) || [];
    const savedMem = AluraLabs.Storage.get('calc_memory', null);
    if (savedMem !== null) {
      this.state.memory = parseFloat(savedMem);
      this.state.hasMemory = true;
    }
  },

  render() {
    this.init();
    const { currentInput, expressionText, hasMemory, history, error } = this.state;

    return `
      <div class="view-enter advanced-calc-container">
        <!-- Navegação de Retorno Integrada -->
        <div class="challenge-top-nav" style="margin-bottom: 1rem;">
          <button class="btn-back" onclick="AluraLabs.Router.navigate('home')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Voltar ao Início
          </button>
          <span class="badge badge-accent">Desafio 02 • Avançado</span>
        </div>

        <div class="advanced-calc-layout">
          <!-- Calculadora -->
          <div class="calc-device-card">
            <!-- Visor -->
            <div class="calc-display">
              <div class="calc-display-top-bar">
                <span class="calc-memory-indicator ${hasMemory ? 'active' : ''}" id="adv-mem-indicator">M</span>
                <div class="calc-display-expression" id="adv-calc-expression">${expressionText || '&nbsp;'}</div>
              </div>
              <div class="calc-display-main ${error ? 'error-state' : ''}" id="adv-calc-main">
                ${error || currentInput}
              </div>
            </div>

            <!-- Funções de Memória -->
            <div class="calc-memory-bar">
              <button class="mem-btn" data-action="mem-clear" title="Limpar Memória (MC)">MC</button>
              <button class="mem-btn" data-action="mem-recall" title="Recuperar Memória (MR)">MR</button>
              <button class="mem-btn" data-action="mem-add" title="Adicionar à Memória (M+)">M+</button>
              <button class="mem-btn" data-action="mem-sub" title="Subtrair da Memória (M-)">M−</button>
            </div>

            <!-- Teclado de Botões -->
            <div class="calc-keypad" id="adv-keypad">
              <!-- Linha 1: Funções Científicas -->
              <button class="key-btn key-sci" data-action="sqrt" title="Raiz Quadrada (√x)">√x</button>
              <button class="key-btn key-sci" data-action="square" title="Elevar ao Quadrado (x²)">x²</button>
              <button class="key-btn key-sci" data-action="invert" title="Inverso (1/x)">1/x</button>
              <button class="key-btn key-sci" data-action="pi" title="Número Pi (π)">π</button>

              <!-- Linha 2: Operações de Edição e Divisão -->
              <button class="key-btn key-func" data-action="clear-all" title="Limpar Tudo (Esc)">AC</button>
              <button class="key-btn key-func" data-action="clear-entry" title="Limpar Entrada (CE)">CE</button>
              <button class="key-btn key-func" data-action="backspace" title="Apagar último (Backspace)">⌫</button>
              <button class="key-btn key-op" data-action="operator" data-val="÷" title="Divisão">÷</button>

              <!-- Linha 3 -->
              <button class="key-btn key-num" data-action="number" data-val="7">7</button>
              <button class="key-btn key-num" data-action="number" data-val="8">8</button>
              <button class="key-btn key-num" data-action="number" data-val="9">9</button>
              <button class="key-btn key-op" data-action="operator" data-val="×" title="Multiplicação">×</button>

              <!-- Linha 4 -->
              <button class="key-btn key-num" data-action="number" data-val="4">4</button>
              <button class="key-btn key-num" data-action="number" data-val="5">5</button>
              <button class="key-btn key-num" data-action="number" data-val="6">6</button>
              <button class="key-btn key-op" data-action="operator" data-val="−" title="Subtração">−</button>

              <!-- Linha 5 -->
              <button class="key-btn key-num" data-action="number" data-val="1">1</button>
              <button class="key-btn key-num" data-action="number" data-val="2">2</button>
              <button class="key-btn key-num" data-action="number" data-val="3">3</button>
              <button class="key-btn key-op" data-action="operator" data-val="+" title="Soma">+</button>

              <!-- Linha 6 -->
              <button class="key-btn key-func" data-action="negate" title="Inverter Sinal (±)">±</button>
              <button class="key-btn key-num" data-action="number" data-val="0">0</button>
              <button class="key-btn key-num" data-action="decimal" data-val=".">.</button>
              <button class="key-btn key-func" data-action="percent" title="Porcentagem (%)">%</button>

              <!-- Linha 7: Botão Igual de Ação Rápida -->
              <button class="key-btn key-equals" data-action="calculate" style="grid-column: span 4;" title="Calcular Resultado (=)">=</button>
            </div>
          </div>

          <!-- Histórico Lateral -->
          <div class="calc-history-card">
            <div class="history-header">
              <h3 class="history-title">
                Histórico de Operações
              </h3>
              ${history.length > 0 ? `
                <button class="btn btn-ghost" id="btn-clear-history" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">
                  Limpar
                </button>
              ` : ''}
            </div>

            <div class="history-list" id="adv-history-list">
              ${this.renderHistoryItems(history)}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderHistoryItems(history) {
    if (!history || history.length === 0) {
      return `
        <div class="history-empty">
          <div>Nenhum cálculo registrado</div>
          <div style="font-size: 0.75rem;">Os resultados concluídos serão gravados aqui. Clique neles para reutilizar o valor.</div>
        </div>
      `;
    }

    return history.map((item, index) => `
      <div class="history-item" data-index="${index}" onclick="AluraLabs.Components.AdvancedCalculator.reuseHistoryResult('${item.result}')" title="Clique para transferir ao visor">
        <span class="history-item-calc">${item.expression}</span>
        <span class="history-item-result">= ${item.result}</span>
      </div>
    `).join('');
  },

  attachEvents() {
    const keypad = document.getElementById('adv-keypad');
    const memoryBar = document.querySelector('.calc-memory-bar');
    const clearHistoryBtn = document.getElementById('btn-clear-history');

    if (keypad) {
      keypad.addEventListener('click', (e) => {
        const btn = e.target.closest('.key-btn');
        if (!btn) return;

        const action = btn.getAttribute('data-action');
        const val = btn.getAttribute('data-val');

        switch (action) {
          case 'number': this.inputDigit(val); break;
          case 'decimal': this.inputDecimal(); break;
          case 'operator': this.handleOperator(val); break;
          case 'calculate': this.performCalculation(); break;
          case 'clear-all': this.clearAll(); break;
          case 'clear-entry': this.clearEntry(); break;
          case 'backspace': this.backspace(); break;
          case 'negate': this.toggleSign(); break;
          case 'percent': this.handlePercent(); break;
          case 'sqrt': this.handleSqrt(); break;
          case 'square': this.handleSquare(); break;
          case 'invert': this.handleInvert(); break;
          case 'pi': this.handlePi(); break;
        }
      });
    }

    if (memoryBar) {
      memoryBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.mem-btn');
        if (!btn) return;
        const action = btn.getAttribute('data-action');
        switch (action) {
          case 'mem-clear': this.memClear(); break;
          case 'mem-recall': this.memRecall(); break;
          case 'mem-add': this.memAdd(); break;
          case 'mem-sub': this.memSub(); break;
        }
      });
    }

    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener('click', () => this.clearHistory());
    }

    this.removeKeyboardListener();
    this._keyHandler = (e) => this.handleKeyboard(e);
    window.addEventListener('keydown', this._keyHandler);
  },

  removeKeyboardListener() {
    if (this._keyHandler) {
      window.removeEventListener('keydown', this._keyHandler);
      this._keyHandler = null;
    }
  },

  handleKeyboard(e) {
    if (AluraLabs.Router.currentRoute !== 'calc-advanced') return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key >= '0' && e.key <= '9') {
      this.inputDigit(e.key);
    } else if (e.key === '.' || e.key === ',') {
      this.inputDecimal();
    } else if (e.key === '+') {
      this.handleOperator('+');
    } else if (e.key === '-') {
      this.handleOperator('−');
    } else if (e.key === '*' || e.key === 'x') {
      this.handleOperator('×');
    } else if (e.key === '/') {
      e.preventDefault();
      this.handleOperator('÷');
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      this.performCalculation();
    } else if (e.key === 'Backspace') {
      this.backspace();
    } else if (e.key === 'Escape') {
      this.clearAll();
    } else if (e.key === '%') {
      this.handlePercent();
    }
  },

  inputDigit(digit) {
    if (this.state.error) this.clearAll();

    if (this.state.waitingForSecondOperand) {
      this.state.currentInput = digit;
      this.state.waitingForSecondOperand = false;
    } else {
      this.state.currentInput = this.state.currentInput === '0' ? digit : this.state.currentInput + digit;
    }
    this.updateDisplay();
  },

  inputDecimal() {
    if (this.state.error) this.clearAll();

    if (this.state.waitingForSecondOperand) {
      this.state.currentInput = '0.';
      this.state.waitingForSecondOperand = false;
      this.updateDisplay();
      return;
    }

    if (!this.state.currentInput.includes('.')) {
      this.state.currentInput += '.';
    }
    this.updateDisplay();
  },

  handleOperator(nextOperator) {
    if (this.state.error) this.clearAll();

    const inputValue = parseFloat(this.state.currentInput);

    if (this.state.operator && this.state.waitingForSecondOperand) {
      this.state.operator = nextOperator;
      this.state.expressionText = `${this.state.previousValue} ${nextOperator}`;
      this.updateDisplay();
      return;
    }

    if (this.state.previousValue === null && !isNaN(inputValue)) {
      this.state.previousValue = inputValue;
    } else if (this.state.operator) {
      const evalResult = AluraLabs.MathEvaluator.evaluateSequence(
        this.state.previousValue,
        this.state.operator,
        inputValue
      );

      if (!evalResult.success) {
        this.state.error = evalResult.error;
        this.updateDisplay();
        return;
      }

      this.state.currentInput = String(evalResult.result);
      this.state.previousValue = evalResult.result;
    }

    this.state.waitingForSecondOperand = true;
    this.state.operator = nextOperator;
    this.state.expressionText = `${this.state.previousValue} ${nextOperator}`;
    this.updateDisplay();
  },

  performCalculation() {
    if (this.state.error) return;
    if (!this.state.operator || this.state.previousValue === null) return;

    const inputValue = parseFloat(this.state.currentInput);
    const evalResult = AluraLabs.MathEvaluator.evaluateSequence(
      this.state.previousValue,
      this.state.operator,
      inputValue
    );

    if (!evalResult.success) {
      this.state.error = evalResult.error;
      this.state.expressionText = `${this.state.previousValue} ${this.state.operator} ${inputValue} =`;
      this.updateDisplay();
      return;
    }

    const fullExpression = `${this.state.previousValue} ${this.state.operator} ${inputValue}`;
    const resultValue = evalResult.result;

    this.state.history.unshift({
      expression: fullExpression,
      result: resultValue
    });

    if (this.state.history.length > 20) this.state.history.pop();
    AluraLabs.Storage.set('calc_history', this.state.history);

    this.state.expressionText = `${fullExpression} =`;
    this.state.currentInput = String(resultValue);
    this.state.previousValue = null;
    this.state.operator = null;
    this.state.waitingForSecondOperand = true;
    this.state.error = null;

    this.updateDisplay();
    this.updateHistoryList();
  },

  handleSqrt() {
    if (this.state.error) return;
    const res = AluraLabs.MathEvaluator.sqrt(this.state.currentInput);
    if (!res.success) {
      this.state.error = res.error;
    } else {
      this.state.expressionText = `√(${this.state.currentInput})`;
      this.state.currentInput = String(res.result);
      this.state.waitingForSecondOperand = true;
    }
    this.updateDisplay();
  },

  handleSquare() {
    if (this.state.error) return;
    const res = AluraLabs.MathEvaluator.square(this.state.currentInput);
    if (!res.success) {
      this.state.error = res.error;
    } else {
      this.state.expressionText = `sqr(${this.state.currentInput})`;
      this.state.currentInput = String(res.result);
      this.state.waitingForSecondOperand = true;
    }
    this.updateDisplay();
  },

  handleInvert() {
    if (this.state.error) return;
    const res = AluraLabs.MathEvaluator.invert(this.state.currentInput);
    if (!res.success) {
      this.state.error = res.error;
    } else {
      this.state.expressionText = `1/(${this.state.currentInput})`;
      this.state.currentInput = String(res.result);
      this.state.waitingForSecondOperand = true;
    }
    this.updateDisplay();
  },

  handlePi() {
    this.state.currentInput = '3.1415926535';
    this.state.waitingForSecondOperand = false;
    this.updateDisplay();
  },

  memClear() {
    this.state.memory = 0;
    this.state.hasMemory = false;
    AluraLabs.Storage.remove('calc_memory');
    this.updateDisplay();
    AluraLabs.showToast('Memória limpa');
  },

  memRecall() {
    if (!this.state.hasMemory) return;
    this.state.currentInput = String(this.state.memory);
    this.state.waitingForSecondOperand = false;
    this.updateDisplay();
  },

  memAdd() {
    const val = parseFloat(this.state.currentInput);
    if (!isNaN(val)) {
      this.state.memory = AluraLabs.MathEvaluator.roundPrecision(this.state.memory + val);
      this.state.hasMemory = true;
      AluraLabs.Storage.set('calc_memory', this.state.memory);
      this.updateDisplay();
      AluraLabs.showToast(`M+ (${this.state.memory})`);
    }
  },

  memSub() {
    const val = parseFloat(this.state.currentInput);
    if (!isNaN(val)) {
      this.state.memory = AluraLabs.MathEvaluator.roundPrecision(this.state.memory - val);
      this.state.hasMemory = true;
      AluraLabs.Storage.set('calc_memory', this.state.memory);
      this.updateDisplay();
      AluraLabs.showToast(`M− (${this.state.memory})`);
    }
  },

  handlePercent() {
    if (this.state.error) return;
    const currentVal = parseFloat(this.state.currentInput);
    if (isNaN(currentVal)) return;

    const pctResult = AluraLabs.MathEvaluator.calculatePercentage(
      this.state.previousValue,
      currentVal,
      this.state.operator
    );

    this.state.currentInput = String(pctResult);
    this.updateDisplay();
  },

  toggleSign() {
    if (this.state.error) return;
    if (this.state.currentInput === '0') return;

    this.state.currentInput = this.state.currentInput.startsWith('-')
      ? this.state.currentInput.slice(1)
      : '-' + this.state.currentInput;

    this.updateDisplay();
  },

  backspace() {
    if (this.state.error) {
      this.clearAll();
      return;
    }
    if (this.state.waitingForSecondOperand) return;

    if (this.state.currentInput.length > 1) {
      this.state.currentInput = this.state.currentInput.slice(0, -1);
    } else {
      this.state.currentInput = '0';
    }
    this.updateDisplay();
  },

  clearEntry() {
    this.state.currentInput = '0';
    this.state.error = null;
    this.updateDisplay();
  },

  clearAll() {
    this.state.currentInput = '0';
    this.state.previousValue = null;
    this.state.operator = null;
    this.state.waitingForSecondOperand = false;
    this.state.expressionText = '';
    this.state.error = null;
    this.updateDisplay();
  },

  reuseHistoryResult(val) {
    this.state.currentInput = String(val);
    this.state.waitingForSecondOperand = false;
    this.state.error = null;
    this.updateDisplay();
    AluraLabs.showToast(`Valor ${val} carregado`);
  },

  clearHistory() {
    this.state.history = [];
    AluraLabs.Storage.remove('calc_history');
    this.updateHistoryList();
    AluraLabs.showToast('Histórico limpo');
  },

  updateDisplay() {
    const exprEl = document.getElementById('adv-calc-expression');
    const mainEl = document.getElementById('adv-calc-main');
    const memEl = document.getElementById('adv-mem-indicator');

    if (exprEl) {
      exprEl.innerHTML = this.state.expressionText || '&nbsp;';
    }

    if (memEl) {
      if (this.state.hasMemory) {
        memEl.classList.add('active');
      } else {
        memEl.classList.remove('active');
      }
    }

    if (mainEl) {
      if (this.state.error) {
        mainEl.className = 'calc-display-main error-state';
        mainEl.textContent = this.state.error;
      } else {
        mainEl.className = 'calc-display-main';
        mainEl.textContent = this.state.currentInput;
      }
    }
  },

  updateHistoryList() {
    const historyListEl = document.getElementById('adv-history-list');
    const historyHeaderEl = document.querySelector('.history-header');

    if (historyListEl) {
      historyListEl.innerHTML = this.renderHistoryItems(this.state.history);
    }

    if (historyHeaderEl) {
      const clearBtnExists = document.getElementById('btn-clear-history');
      if (this.state.history.length > 0 && !clearBtnExists) {
        const btn = document.createElement('button');
        btn.id = 'btn-clear-history';
        btn.className = 'btn btn-ghost';
        btn.style.cssText = 'font-size: 0.75rem; padding: 0.25rem 0.5rem;';
        btn.textContent = 'Limpar';
        btn.addEventListener('click', () => this.clearHistory());
        historyHeaderEl.appendChild(btn);
      } else if (this.state.history.length === 0 && clearBtnExists) {
        clearBtnExists.remove();
      }
    }
  }
};
