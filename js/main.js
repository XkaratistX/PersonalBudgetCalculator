'use strict';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'), 
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title')[0],
    incomeAmount = document.querySelector('.income-amount')[0],
    expensesTitle = document.querySelector('.expenses-title')[0],
    expensesAmount = document.querySelector('.expenses-amount')[0],
    incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    depositCheck = document.getElementById('deposit-check'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0];

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  budget: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  persentDeposit: 0,
  moneyDeposit: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  reset: function () {
    
    let inputTextData = document.querySelectorAll('input[type = text');
    let resultInputAll = document.querySelectorAll('input[type = text]');

    inputTextData.forEach((elem) => {
      elem.value = '';
      elem.removeAttribute('disabled');
      periodSelect.value = '0';
      periodAmount.innerHTML = periodSelect.value;
    });
    resultInputAll.forEach((elem) =>{
      elem.removeAttribute('disabled');
      elem.value = '';
      cancel.style.display = 'none';
      start.style.display = 'block';
    });

    for(let i = 1; i < expensesItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      incomePlus.style.display = 'block';
    }
    for(let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      expensesPlus.style.display = 'block';
    }
  },
  start: function () {

    if(!isNumber(salaryAmount.value)) {
      alert('Ошибка! "Месячный доход" должен быть заполен!');
      return;
    } 
   
    this.budget = +salaryAmount.value;

  
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget(); 
    this.showResult();

    let allInput = document.querySelectorAll('.data input[type = text]');
    allInput.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    incomePlus.setAttribute('disabled', 'disabled');
    expensesPlus.setAttribute('disabled', 'disabled');
    start.style.display = 'none';
    cancel.style.display = 'block';
    
  },

  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
  },

  addExpensesBlock: function () { 
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
      expensesTitle.style.display = 'none';
      expensesAmount.style.display = 'none';
    }

    let arrInputs = document.getElementsByTagName("input");
      for (let i = 0; i < arrInputs.length; i++) {
       let expensesInput = arrInputs[i];
       if (expensesInput.type === "text") {
         expensesInput.value = '';
       } 
   }
  },  

  getExpenses: function () {
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(!isNumber(cashExpenses)){
        alert('Введите число в поле "Обязательные расходы"!');
        return;
      }
      if(itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  
  getIncome: function () {
      incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(!isNumber(cashIncome)){
        alert('Введите число в поле "Дополнительный доход"!');
        return;
      }
      if(itemIncome !== '' && cashIncome !== '' && isNumber(cashIncome)) {
        appData.income[itemIncome] = cashIncome;
    }
    });
  },

  addIncomeBlock: function () {
    let cloneIncomesItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomesItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    } 
  },

  getPeriodSelect: function () {
    periodAmount.innerHTML = periodSelect.value;
  },

  getAddExpenses: function () {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item) {
        item = item.trim();
        if(item !== '') {
          appData.addExpenses.push(item);
        }
      });
  },

  getAddIncome: function () {
      additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if(itemValue !== '') {
          appData.addIncome.push(itemValue);
        }
      });
  },
   
  getExpensesMonth : () => {
    for (let key in appData.expenses) {
      appData.expensesMonth = +appData.expensesMonth + appData.expenses[key];
    }
  },

  getBudget : () => {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.round(appData.budgetMonth / 30);
  },

  getTargetMonth : () => {
    if(!isNumber(targetAmount)){
      return Math.round(targetAmount.value / appData.budgetMonth);
    } else {
      alert('Введите число в поле "Цель"!');
    }
  },

  getInfoDeposit: () => {
    if(appData.deposit) {
      do{
        appData.persentDeposit = prompt('Какой годовой процент?', '10');
      } while (!isNumber(appData.persentDeposit));
      do{
        appData.moneyDeposit = prompt('Какая сумма заложена?', 1000);
      } while (!isNumber(appData.moneyDeposit));
      
    }
  },
  calcPeriod: () => {
    return appData.budgetMonth * periodSelect.value;
  }, 

  depositHandler() {
    if (depositCheck.checked) {
      console.log('ckeck');
    } else {
      console.log('unckeck');
    }
  },

  EventListener() {
    start.addEventListener('click', this.start.bind(this));
    incomePlus.addEventListener('click', this.addIncomeBlock);
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    periodSelect.addEventListener('input', this.getPeriodSelect);
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
  }

};



let inputRange = () => {
  let update = () => periodAmount.innerHTML = periodSelect.value;
  periodSelect.addEventListener('input', update);
};



appData.EventListener();
appData.getInfoDeposit();
// let target = () => {
//   if (appData.getTargetMonth() > 0) {
//     console.log(`цель будет достигнута за ${appData.getTargetMonth()} месяца`);
//   } else {
//     console.log('цель не будет достигнута');
//   }
// };

// let finalFunc = () => {
//     for(let key in appData) {
//       // console.log('Наша программа включает в себя данные: ' + key + ': ' + appData[key]);
//     }
//   };

// appData.start();

// target();
// finalFunc();
