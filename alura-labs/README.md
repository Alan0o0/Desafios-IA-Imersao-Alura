# 🔴 ALURA LABS — Hub de Desafios da Imersão

> *"Da primeira linha de código à construção de soluções."*

O **ALURA LABS** é uma aplicação web completa que consolida os três desafios desenvolvidos durante a **Imersão Alura**, integrando desenvolvimento assistido por Inteligência Artificial e **Google Antigravity** em um único produto digital moderno, intuitivo e 100% responsivo.

---

## 📌 Sobre o Projeto

O objetivo principal deste projeto foi ir além de simples exercícios isolados e construir um **produto integrado**, com identidade visual consistente, navegação fluida em SPA (*Single Page Application*) e foco na experiência do usuário (UI/UX).

O hub demonstra a evolução clara do aprendizado prático:
1. **Desafio 01 (Lógica Fundamental):** A primeira aplicação criada com apoio de IA — uma calculadora básica de dois valores.
2. **Desafio 02 (Evolução Técnica & Recursos Avançados):** Uma calculadora completa no formato de aplicativo, com visor digital, funções científicas, sistema de memória e histórico de cálculos.
3. **Desafio 03 (Produtividade & Persistência):** Uma ferramenta de gestão de tarefas (To-Do List) com métricas em tempo real, filtros dinâmicos e persistência no navegador.

---

## 🚀 Os Três Desafios em Detalhes

### 1. 🧮 Desafio 01 — Calculadora Básica
Representa o primeiro contato prático e a construção da primeira lógica com auxílio de IA.
* **Entradas:** Dois campos numéricos independentes.
* **Operações:** Soma (`+`), Subtração (`−`), Multiplicação (`×`) e Divisão (`÷`).
* **Tratamento de Erros:** Prevenção contra divisão por zero com feedback amigável na tela.
* **Interface:** Bloco compacto e contido, com botão de limpar e suporte à tecla `Enter`.

### 2. ⚡ Desafio 02 — Calculadora Aprimorada (Científica & Histórico)
Uma evolução substancial da primeira ferramenta, desenvolvida para demonstrar maturidade arquitetural e usabilidade de app nativo.
* **Teclado Interativo & Visor LCD:** Exibição da expressão acumulada no topo e valor corrente ampliado.
* **Funções Avançadas:**
  * Raiz Quadrada (`√x`)
  * Potência ao Quadrado (`x²`)
  * Inverso Fracionário (`1/x`)
  * Constante Pi (`π = 3.14159...`)
  * Porcentagem Contextual (`%`)
  * Inversor de Sinal (`±`)
* **Sistema de Memória de Calculadora:** Funções `MC` (Limpar), `MR` (Recuperar), `M+` (Somar à memória) e `M−` (Subtrair da memória) com indicador dinâmico `[M]` no visor.
* **Histórico de Cálculos Persistente:** Gravação automática de operações anteriores com opção de **clicar no cálculo para reinserir o resultado no visor**.
* **Zero `eval()`:** Motor aritmético seguro e customizado (`MathEvaluator`), eliminando vulnerabilidades de execução de código e tratando erros de precisão decimal do JavaScript.
* **Teclado Físico:** Suporte nativo à digitação direta no teclado.

### 3. ✅ Desafio 03 — To-Do List (Gestão de Tarefas)
Ferramenta para acompanhar o fluxo diário de atividades e metas.
* **Métricas em Tempo Real:** Contador de tarefas totais, concluídas e barra de progresso percentual dinâmica.
* **Filtros Inteligentes:** Abas para visualizar "Todas", "Pendentes" e "Concluídas", com badges numéricas atualizadas em tempo real.
* **Persistência com LocalStorage:** Suas tarefas permanecem salvas mesmo ao fechar ou recarregar o navegador.
* **Microinterações:** Checkboxes customizados, efeito tachado suave nas tarefas concluídas e botão de limpeza em lote.
* **Empty State Amigável:** Mensagem contextual e limpa para quando não houver itens na lista.

---

## 🎨 Design System e Identidade Visual

O projeto foi construído com uma estética sóbria, elegante e sem excessos decorativos:

* **Paleta de Cores:**
  * Vermelho Principal: `#E63946`
  * Vermelho Intermediário: `#C1121F`
  * Vermelho Escuro: `#A4161A`
  * Vermelho Suave / Alertas: `#F28482`
  * Fundo Principal: `#111113`
  * Fundo Secundário: `#19191D`
  * Superfícies: `#202025`
  * Texto Primário: `#FFFFFF`
  * Texto Secundário: `#A1A1AA`
* **Responsividade:** 100% adaptado para qualquer resolução — de dispositivos mobile pequenos (320px) a telas desktop.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5 Semântico:** Estruturação acessível e otimizada.
* **CSS3 Moderno:** Flexbox, CSS Grid, Variáveis CSS (Design Tokens) e transições suaves sem sobrecarga de bibliotecas pesadas.
* **JavaScript Puro (ES6+):** Arquitetura modular orientada a componentes, roteamento SPA sem recarregamento e gerenciamento de estado reativo.
* **LocalStorage API:** Persistência local de histórico e tarefas no cliente.
* **Google Antigravity & Ferramentas de IA:** Apoio no desenvolvimento ágil, refatoração e testes.

---

## 📂 Estrutura de Arquivos

```
alura-labs/
├── index.html                     # Ponto de entrada da SPA
├── README.md                      # Documentação do repositório
│
├── css/
│   ├── variables.css              # Variáveis de cor, espaçamento e tipografia
│   ├── base.css                   # Reset global e regras de responsividade
│   ├── components.css             # Botões, badges, toasts e cabeçalhos
│   ├── navigation.css             # Barra de navegação e menu mobile
│   ├── home.css                   # Página inicial e cards de desafios
│   ├── calculator-simple.css      # Estilos contidos da Calculadora Básica
│   ├── calculator-advanced.css    # Estilos da Calculadora Aprimorada
│   └── todo-list.css              # Estilos da Lista de Tarefas
│
└── js/
    ├── app.js                     # Inicialização e notificações
    ├── router.js                  # Roteador SPA baseado em hash (#/rota)
    ├── components/
    │   ├── Navigation.js          # Componente do menu superior
    │   ├── Home.js                # Componente da Home
    │   ├── SimpleCalculator.js    # Componente do Desafio 01
    │   ├── AdvancedCalculator.js  # Componente do Desafio 02
    │   └── TodoList.js            # Componente do Desafio 03
    └── utils/
        ├── storage.js             # Persistência com tratamento de erros
        └── mathEvaluator.js       # Motor matemático seguro (sem eval)
```

---

## 💻 Como Executar o Projeto

A aplicação é **independente de dependências externas** (sem necessidade de `npm install` ou compiladores).

### Opção 1: Execução Direta (Recomendada)
1. Clone este repositório:
   ```bash
   git clone https://github.com/SEU-USUARIO/alura-labs.git
   ```
2. Abra a pasta do projeto e dê um **duplo clique** no arquivo `index.html`.
3. Pronto! Ele abrirá diretamente no seu navegador padrão.

### Opção 2: Servidor Local
Se preferir rodar com um servidor HTTP simples:
```bash
# Com Python
python -m http.server 8080

# Ou com Node.js (npx)
npx serve .
```
Acesse `http://localhost:8080` no navegador.

---

## 🤝 Créditos e Agradecimentos

Projeto desenvolvido como parte da **Imersão Alura**, demonstrando como a Inteligência Artificial pode potencializar o aprendizado e a criação de produtos digitais funcionais e bem estruturados.
