const historyEl = document.getElementById('history');
const resultEl = document.getElementById('result');
let current = '', prev = '', oper = '';

document.querySelector('.keys').addEventListener('click', e => {
  if (!e.target.matches('button')) return;
  const val = e.target.textContent;
  const action = e.target.dataset.action;
  if (e.target.classList.contains('num')) {
    current = current === '0' ? val : current + val;
  } else if (action === 'decimal') {
    if (!current.includes('.')) current += current ? '.' : '0.';
  } else if (action === 'clear') {
    current = prev = oper = '';
  } else if (action === 'delete') {
    current = current.slice(0, -1);
  } else if (['add','subtract','multiply','divide','percent'].includes(action)) {
    if (current) {
      if (prev) calculate();
      else prev = current;
      oper = action;
      current = '';
    }
  } else if (action === 'equals') {
    calculate();
    oper = '';
  }
  updateDisplay();
});

function calculate() {
  let a = parseFloat(prev), b = parseFloat(current || prev);
  let res = 0;
  if (oper === 'add') res = a + b;
  else if (oper === 'subtract') res = a - b;
  else if (oper === 'multiply') res = a * b;
  else if (oper === 'divide') res = b === 0 ? 'Error' : a / b;
  else if (oper === 'percent') res = a * b / 100;
  current = res.toString();
  prev = '';
}

function updateDisplay() {
  resultEl.textContent = current || prev || '0';
  historyEl.textContent = prev && oper ? `${prev} ${symbol(oper)}` : '';
}

function symbol(op) {
  return {add:'+',subtract:'−',multiply:'×',divide:'÷',percent:'%'}[op] || '';
}

// Theme switching
document.getElementById('light').onclick = () => setTheme('');
document.getElementById('dark').onclick = () => setTheme('dark');
document.getElementById('glass').onclick = () => setTheme('glass');
function setTheme(t) {
  document.body.className = t;
}
