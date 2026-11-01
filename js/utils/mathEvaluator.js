/**
 * Alura Labs - Math Evaluator Utility
 * Avaliador matemático seguro sem uso de eval().
 * Suporta operações básicas, científicas, decimais e porcentagem.
 */
window.AluraLabs = window.AluraLabs || {};

window.AluraLabs.MathEvaluator = {
  /**
   * Arredonda erros de ponto flutuante comuns do JavaScript
   */
  roundPrecision(num) {
    if (!Number.isFinite(num)) return num;
    return parseFloat(Number(num).toPrecision(12));
  },

  /**
   * Calcula operação simples entre dois números (Desafio 01)
   */
  calculateBasic(num1, op, num2) {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      return { success: false, error: 'Por favor, insira números válidos.' };
    }

    let result;
    switch (op) {
      case '+':
      case 'add':
        result = a + b;
        break;
      case '-':
      case 'sub':
        result = a - b;
        break;
      case '*':
      case '×':
      case 'mult':
        result = a * b;
        break;
      case '/':
      case '÷':
      case 'div':
        if (b === 0) {
          return { success: false, error: 'Não é possível dividir por zero.' };
        }
        result = a / b;
        break;
      default:
        return { success: false, error: 'Operação não reconhecida.' };
    }

    return {
      success: true,
      result: this.roundPrecision(result),
      expression: `${a} ${this.formatOperator(op)} ${b}`
    };
  },

  formatOperator(op) {
    switch (op) {
      case '+':
      case 'add': return '+';
      case '-':
      case 'sub': return '−';
      case '*':
      case '×':
      case 'mult': return '×';
      case '/':
      case '÷':
      case 'div': return '÷';
      default: return op;
    }
  },

  /**
   * Avalia duas partes em sequência (Desafio 02)
   */
  evaluateSequence(previousValue, currentOp, currentValue) {
    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);

    if (isNaN(prev) || isNaN(curr)) {
      return { success: false, error: 'Entrada inválida' };
    }

    if ((currentOp === '÷' || currentOp === '/') && curr === 0) {
      return { success: false, error: 'Não é possível dividir por zero' };
    }

    let res = 0;
    switch (currentOp) {
      case '+':
        res = prev + curr;
        break;
      case '-':
      case '−':
        res = prev - curr;
        break;
      case '*':
      case '×':
        res = prev * curr;
        break;
      case '/':
      case '÷':
        res = prev / curr;
        break;
      default:
        return { success: true, result: curr };
    }

    return {
      success: true,
      result: this.roundPrecision(res)
    };
  },

  /**
   * Operações Avançadas / Científicas
   */
  sqrt(val) {
    const num = parseFloat(val);
    if (isNaN(num)) return { success: false, error: 'Entrada inválida' };
    if (num < 0) return { success: false, error: 'Entrada inválida para raiz (número negativo)' };
    return { success: true, result: this.roundPrecision(Math.sqrt(num)) };
  },

  square(val) {
    const num = parseFloat(val);
    if (isNaN(num)) return { success: false, error: 'Entrada inválida' };
    return { success: true, result: this.roundPrecision(num * num) };
  },

  invert(val) {
    const num = parseFloat(val);
    if (isNaN(num)) return { success: false, error: 'Entrada inválida' };
    if (num === 0) return { success: false, error: 'Não é possível dividir por zero' };
    return { success: true, result: this.roundPrecision(1 / num) };
  },

  /**
   * Porcentagem Contextual
   */
  calculatePercentage(baseValue, percentInput, operator = null) {
    const base = parseFloat(baseValue);
    const pct = parseFloat(percentInput);

    if (isNaN(pct)) return 0;
    if (isNaN(base) || !operator) {
      return this.roundPrecision(pct / 100);
    }

    if (operator === '+' || operator === '-' || operator === '−') {
      return this.roundPrecision((base * pct) / 100);
    }

    return this.roundPrecision(pct / 100);
  }
};
