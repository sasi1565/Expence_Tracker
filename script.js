
const submitButton = document.querySelector('.btn');
const balance = document.getElementById('bal');
const income = document.getElementById('inc');
const spent = document.getElementById('spe');

let transactions = [];

var sno = 0;

if (!localStorage.getItem('balance')) {
    localStorage.setItem('balance', 0);
}
if (!localStorage.getItem('income')) {
    localStorage.setItem('income', 0);
}
if (!localStorage.getItem('spent')) {
    localStorage.setItem('spent', 0);
}

const table=document.getElementById('table');


const form = document.getElementById('myForm');

// const innerTable = document.getElementById('innerTable');

function renderTable() {
    table.innerHTML = '';
    let htmlContent = '<tr><th>S.No</th><th>Description</th><th>Through</th><th>Amount</th></tr>';
    transactions.forEach(item => {
        htmlContent += `<tr><td>${sno++}</td><td>${item.description}</td><td>${item.t_type}</td><td>${((item.type === 'spent')? "-" : "+")+item.amount}</td></tr>`;
    });
    table.innerHTML = htmlContent;
    console.log('rendering table');
}

window.addEventListener('load', function(event){
    sno=1;
    console.log(localStorage.getItem('balance'))
    balance.innerText = (localStorage.getItem('balance'));
    income.innerHTML = localStorage.getItem('income');
    spent.innerHTML = localStorage.getItem('spent');
    transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    console.log(transactions);
    // table.innerHTML = '';
    // let htmlContent = '<caption>Transaction History</caption>'+'<tr><th>Description</th><th>Through</th><th>Amount</th></tr>';
    // transactions.forEach(item => {
    //     htmlContent += `<tr><td>${item.description}</td><td>${item.type}</td><td>${item.amount}</td></tr>`;
    // });
    // table.innerHTML = htmlContent;
    renderTable();
});


submitButton.addEventListener('click', function(event){ 
    event.preventDefault();
});


function addTransactionToLocalStorage(transaction) {
    sno=1;
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    console.log(transactions);
    // table.innerHTML = '';
    // let htmlContent = '<caption>Transaction History</caption>'+'<tr><th>Description</th><th>Through</th><th>Amount</th></tr>';
    // transactions.forEach(item => {
    //     htmlContent += `<tr><td>${item.description}</td><td>${item.type}</td><td>${item.amount}</td></tr>`;
    // });
    // table.innerHTML = htmlContent;
    renderTable();
}

function addTransaction(){
    const form = document.getElementById('myForm');
    let description, amount, type, t_type;
    try{
        description = form.querySelector('#description').value;
        amount = form.querySelector('#amount').value;
        type = form.querySelector('input[name="expence"]:checked').value;
        t_type = form.querySelector('#menu').value;
    }
    catch(e){
        alert('Please fill in all fields');
        return;
    }

    if(description === '' || amount === '' || type === ''|| t_type === 'select'){
        alert('Please fill in all fields');
        return;
    }



    if(type === 'spent'){
        var bal = parseInt(localStorage.getItem('balance')) - parseInt(amount);
        localStorage.setItem('balance', bal);
        balance.innerHTML = bal;
        var spe= parseInt(localStorage.getItem('spent')) + parseInt(amount);
        localStorage.setItem('spent', spe);
        spent.innerHTML = spe;

    }

    if(type === 'income'){
        var bal = parseInt(balance.innerHTML) + parseInt(amount);
        localStorage.setItem('balance', bal);
        balance.innerHTML = bal;
        var inc= parseInt(localStorage.getItem('income')) + parseInt(amount);
        localStorage.setItem('income', inc);
        income.innerHTML = inc;
    }

    
    const transaction = {
        id: Date.now(),
        description,
        amount,
        type,
        t_type
    }

    console.log(transaction);
    addTransactionToLocalStorage(transaction);
    form.reset();
}