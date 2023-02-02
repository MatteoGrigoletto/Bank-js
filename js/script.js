'use strict';

// account che simulano un API
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elementi html
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// funzione per la generazione della listra di transazioni
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach((element, i) => {
    const transationHtml = `
    <div class="movements__row">
      <div class="movements__type movements__type--${
        element > 0 ? 'deposit' : 'withdrawal'
      }">
        ${i + 1} ${element > 0 ? 'deposit' : 'withdrawal'}
      </div>
      <div class="movements__value">${element}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', transationHtml);
  });
};

displayMovements(account1.movements);


// funzione create con effetti collaterali ( senza restituire nulla e modificando gli account originali)
let createUsertag = function (arr) {

  arr.forEach( function (account){ 
  
    account.tag = account.owner.toLowerCase().split(' ').map(elm => elm[0]).join('')
  })
}
console.log(createUsertag(accounts));
console.log(accounts);
