// Assembly Calculator
// Arithmetic is performed using low-level register-style operations
// mimicking how a CPU processes instructions (MOV, ADD, SUB, IMUL, IDIV).

// Simulated CPU registers
const REG = {
  RAX: 0,   // Accumulator — holds operand A and final result
  RBX: 0,   // Base — holds operand B
  RDX: 0,   // Data — holds remainder for IDIV (MOD)
};

// Calculator state
let cur = '0';
let operandA = null;
let operator = null;
let freshInput = false;

// DOM refs
const display  = () => document.getElementById('result');
const exprLine = () => document.getElementById('expr');
const errLine  = () => document.getElementById('err');

// Format result: remove floating-point noise
function fmt(v) {
  return parseFloat(v.toFixed(10)).toString();
}

// --- Simulated assembly operations ---

function ASM_MOV(reg, value) {
  REG[reg] = value;
}

function ASM_ADD(regA, regB) {
  REG[regA] = REG[regA] + REG[regB];
}

function ASM_SUB(regA, regB) {
  REG[regA] = REG[regA] - REG[regB];
}

function ASM_IMUL(regA, regB) {
  REG[regA] = REG[regA] * REG[regB];
}

function ASM_IDIV(regA, regB) {
  // quotient → RAX, remainder → RDX (mirrors x86 IDIV behaviour)
  const quotient  = Math.trunc(REG[regA] / REG[regB]);
  const remainder = REG[regA] % REG[regB];
  REG.RAX = quotient;
  REG.RDX = remainder;
}

// --- Calculator UI handlers ---

function num(d) {
  errLine().textContent = '';
  if (freshInput) { cur = d; freshInput = false; }
  else cur = (cur === '0') ? d : (cur.length < 15 ? cur + d : cur);
  display().textContent = cur;
}

function dot() {
  if (freshInput) { cur = '0.'; freshInput = false; }
  else if (!cur.includes('.')) cur += '.';
  display().textContent = cur;
}

function op(o) {
  errLine().textContent = '';
  operandA = parseFloat(cur);
  operator = o;
  freshInput = true;
  const sym = o === '*' ? '×' : o === '/' ? '÷' : o;
  exprLine().textContent = `${operandA} ${sym}`;
}

function eq() {
  if (operandA === null || operator === null) return;
  errLine().textContent = '';

  const b = parseFloat(cur);

  if ((operator === '/' || operator === '%') && b === 0) {
    errLine().textContent = 'division by zero';
    return;
  }

  // Load operands into simulated registers
  ASM_MOV('RAX', operandA);
  ASM_MOV('RBX', b);

  // Execute the appropriate simulated instruction
  let result;
  if (operator === '+') { ASM_ADD('RAX', 'RBX');  result = REG.RAX; }
  if (operator === '-') { ASM_SUB('RAX', 'RBX');  result = REG.RAX; }
  if (operator === '*') { ASM_IMUL('RAX', 'RBX'); result = REG.RAX; }
  if (operator === '/') { ASM_IDIV('RAX', 'RBX'); result = REG.RAX; }
  if (operator === '%') { ASM_IDIV('RAX', 'RBX'); result = REG.RDX; }

  const sym = operator === '*' ? '×' : operator === '/' ? '÷' : operator;
  exprLine().textContent = `${operandA} ${sym} ${b} =`;

  cur = fmt(result);
  display().textContent = cur;

  operandA = null;
  operator = null;
  freshInput = true;
}

function ac() {
  cur = '0';
  operandA = null;
  operator = null;
  freshInput = false;
  REG.RAX = 0; REG.RBX = 0; REG.RDX = 0;
  display().textContent = '0';
  exprLine().textContent = '';
  errLine().textContent = '';
}

function del() {
  if (freshInput) return;
  cur = cur.length > 1 ? cur.slice(0, -1) : '0';
  display().textContent = cur;
}

// Keyboard support
document.addEventListener('keydown', e => {
  if (e.key >= '0' && e.key <= '9') num(e.key);
  else if (e.key === '.') dot();
  else if (['+', '-', '*', '/', '%'].includes(e.key)) op(e.key);
  else if (e.key === 'Enter' || e.key === '=') eq();
  else if (e.key === 'Backspace') del();
  else if (e.key === 'Escape') ac();
});
