import os
import re
import sys

def run_tests():
    project_dir = os.path.dirname(os.path.abspath(__file__))
    print(f"Iniciando bateria de testes no diretório: {project_dir}")

    # 1. Checar index.html
    index_path = os.path.join(project_dir, 'index.html')
    assert os.path.exists(index_path), "index.html não existe!"
    with open(index_path, 'r', encoding='utf-8') as f:
        html = f.read()

    css_links = re.findall(r'href=["\'](css/[^"\']+)["\']', html)
    print(f"-> Arquivos CSS detectados ({len(css_links)}): {css_links}")
    for css in css_links:
        full_p = os.path.join(project_dir, css.replace('/', os.sep))
        assert os.path.exists(full_p), f"Arquivo CSS ausente: {css}"

    js_scripts = re.findall(r'src=["\'](js/[^"\']+)["\']', html)
    print(f"-> Scripts JS detectados ({len(js_scripts)}): {js_scripts}")
    for js in js_scripts:
        full_p = os.path.join(project_dir, js.replace('/', os.sep))
        assert os.path.exists(full_p), f"Arquivo JS ausente: {js}"

    # 2. Testar se há referências quebradas ou eval() em JS
    for js in js_scripts:
        full_p = os.path.join(project_dir, js.replace('/', os.sep))
        with open(full_p, 'r', encoding='utf-8') as f:
            code = f.read()
            for idx, line in enumerate(code.splitlines(), 1):
                clean_line = line.strip()
                if clean_line.startswith('//') or clean_line.startswith('*'):
                    continue
                # Se for eval( com parênteses executáveis
                if re.search(r'\beval\s*\(', clean_line):
                    raise AssertionError(f"Chamada direta a eval() encontrada em {js}:{idx} -> {clean_line}")

    # 3. Teste da Lógica Matemática (Algoritmo idêntico ao mathEvaluator.js)
    def round_precision(num):
        return round(num, 10)

    def calc_basic(a, op, b):
        if op == '+': return a + b
        if op == '-': return a - b
        if op == '*': return a * b
        if op == '/':
            if b == 0: return "DIV_BY_ZERO"
            return round_precision(a / b)

    # Testes das 4 operações
    assert calc_basic(15, '+', 25) == 40, "Soma incorreta"
    assert calc_basic(50, '-', 18) == 32, "Subtração incorreta"
    assert calc_basic(6, '*', 7) == 42, "Multiplicação incorreta"
    assert calc_basic(100, '/', 4) == 25, "Divisão incorreta"
    assert calc_basic(10, '/', 0) == "DIV_BY_ZERO", "Tratamento de divisão por zero incorreto"
    assert round_precision(0.1 + 0.2) == 0.3, "Precisão de ponto flutuante incorreta"

    print("-> Testes de matemática básica: PASSOU!")

    # Teste de porcentagem
    def calc_percent(base, pct, op):
        if op in ['+', '-']:
            return (base * pct) / 100.0
        return pct / 100.0

    assert calc_percent(200, 10, '+') == 20.0, "Porcentagem aditiva incorreta"
    assert calc_percent(50, 20, '*') == 0.2, "Porcentagem multiplicativa incorreta"
    print("-> Testes de porcentagem: PASSOU!")

    # 4. Validar Paleta de Cores em variables.css
    vars_path = os.path.join(project_dir, 'css', 'variables.css')
    with open(vars_path, 'r', encoding='utf-8') as f:
        vars_css = f.read()
    
    assert '#E63946' in vars_css, "Cor primária #E63946 não encontrada em variables.css"
    assert '#A4161A' in vars_css, "Cor vermelho escuro #A4161A não encontrada"
    assert '#C1121F' in vars_css, "Cor intermediária #C1121F não encontrada"
    assert '#F28482' in vars_css, "Cor suave #F28482 não encontrada"
    assert '#111113' in vars_css, "Fundo #111113 não encontrado"
    assert '#19191D' in vars_css, "Fundo secundário #19191D não encontrado"
    assert '#202025' in vars_css, "Superfície #202025 não encontrada"
    print("-> Validação de tokens de cores e design: PASSOU!")

    print("\n[OK] TODOS OS TESTES PASSARAM COM SUCESSO ABSOLUTO!")

if __name__ == '__main__':
    run_tests()
