const incomeBtn = document.getElementById('incomeBtn');
const expenseBtn = document.getElementById('expenseBtn');
const addBtn = document.getElementById('addBtn');
const descI = document.getElementById('desc');
const amountI = document.getElementById('amount');
const listEl = document.getElementById('list');
const balanceEl = document.getElementById('balance');

let entries = JSON.parse(localStorage.getItem('entries')) || [];
let currentType = 'income';

function setType(t){
  currentType = t;
  incomeBtn.classList.toggle('active', t==='income');
  expenseBtn.classList.toggle('active', t==='expense');
}
incomeBtn.addEventListener('click', ()=> setType('income'));
expenseBtn.addEventListener('click', ()=> setType('expense'));

function render(){
  listEl.innerHTML = '';
  let total = 0;
  entries.forEach((e,i)=>{
    total += e.type === 'income' ? e.amount : -e.amount;
    const div = document.createElement('div');
    div.className = `expense-item ${e.type}`;
    div.innerHTML = `
      <div class="left">
        <div class="title">${e.desc}</div>
        <div class="meta">${new Date(e.time).toLocaleString()}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <div class="amount">₹${e.amount}</div>
        <button class="del-btn" data-i="${i}">X</button>
      </div>
    `;
    listEl.appendChild(div);
  });
  balanceEl.innerText = total;
  localStorage.setItem('entries', JSON.stringify(entries));
  attachDelete();
}

function attachDelete(){
  document.querySelectorAll('.del-btn').forEach(btn=>{
    btn.onclick = ()=> {
      const idx = parseInt(btn.getAttribute('data-i'));
      entries.splice(idx,1);
      render();
    }
  });
}

addBtn.addEventListener('click', ()=>{
  const desc = descI.value.trim();
  const amount = parseInt(amountI.value,10);
  if(!desc || !amount) return alert('Enter valid details');
  entries.unshift({desc, amount, type: currentType, time: Date.now()});
  descI.value = ''; amountI.value = '';
  render();
});

render();
