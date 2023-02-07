'use strict';

// account che simulano un API
const account1 = {
  owner: 'Matteo Grigoletto',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Alessandro Zuddas',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Samuele Madrigali',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Riccardo Bernardi',
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
// container html
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
// bottoni html
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
// input html
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

// funzione per la generazione della listra di transazioni
const displayMovements = function (objAccount, bool = false) {
  containerMovements.innerHTML = '';
  let arrManipolate = bool
    ? objAccount.movements.slice().sort((a, b) => a - b)
    : objAccount.movements;

  arrManipolate.forEach((element, i) => {
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

// funzione che crea una proprieta' tag all'interno dell'oggetto
let createUsertag = function (arr) {
  arr.forEach(function (account) {
    account.tag = account.owner
      .toLowerCase()
      .split(' ')
      .map(elm => elm[0])
      .join('');
  });
};

// inserisce all'interno del tag html il totale delle transazioni avvenute nell'account

const displayBalance = function (objAccount) {
  labelBalance.textContent =
    objAccount.movements.reduce((acc, num) => acc + num, 0) + ` 💶`;
};

// funzione che gestisce le informazioni riguardanti il flusso di denaro

const calcMoneyInfo = function (objAccount) {
  const incomes = objAccount.movements
    .filter(movement => movement > 0)
    .reduce((acc, movement) => acc + movement, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = objAccount.movements
    .filter(movement => movement < 0)
    .reduce((acc, movement) => acc + movement, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = objAccount.movements
    .filter(movement => movement > 0)
    .map(deposit => (deposit * objAccount.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// funzione che richiama al suo interno funzioni per il ricalcolo dei dati
// relativi all'interfaccia

const displayInfoCalcolation = function (acc) {
  displayMovements(acc);
  displayBalance(acc);
  calcMoneyInfo(acc);
};

// btn evento che fa eseguire l'accesso all'utente calcolando
// i bilanci tramite le funzioni precedentemente implementate
let accountOn;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  // genera una nuova proprieta' all'interno dell'oggetto utente creando un tag
  // che successivamente viene comparato con il pin inserito nella home

  createUsertag(accounts);

  accountOn = accounts.find(
    account =>
      account.tag === inputLoginUsername.value &&
      account?.pin === Number(inputLoginPin.value)
  );
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  if (accountOn) {
    labelWelcome.textContent = ` Welcome ${accountOn.owner}`;
    containerApp.style.opacity = 1;
  }
  displayInfoCalcolation(accountOn);
});

// evento per la transizione di denaro da account

let accountTransferIn;

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  // tramite metodo find trovo il tag corrispondente e
  // manipolo la sua proprietà movemets, inserendoci all'interno il valore
  //precedentemente inserito nell'imput

  accountTransferIn = accounts.find(acc => inputTransferTo.value === acc.tag);
  let amountTransfer = Number(inputTransferAmount.value);
  inputTransferTo.value = '';
  inputTransferAmount.value = '';
  let TotalAmountAccount = accountOn.movements.reduce(
    (total, mov) => total + mov,
    0
  );
  if (
    amountTransfer > 0 &&
    TotalAmountAccount >= amountTransfer &&
    accountTransferIn &&
    accountTransferIn.tag !== accountOn.tag
  ) {
    accountOn.movements.push(-amountTransfer);
    accountTransferIn.movements.push(amountTransfer);

    //ricalcola le info relative all'interfaccia grafica del contro
    displayInfoCalcolation(accountOn);
  }
});

// evento per aggiungere fondi al conto

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  let loan = inputLoanAmount.value;
  if (Number(loan) > 1000) {
    accountOn.movements.push(Number(loan));
  }
  loan = '';
  displayInfoCalcolation(accountOn);
});

// evento che elimina account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    accountOn?.tag === inputCloseUsername.value &&
    accountOn?.pin === Number(inputClosePin.value)
  ) {
    let delectedAccount = accounts.findIndex(
      account =>
        account.tag === inputCloseUsername.value &&
        account?.pin === Number(inputClosePin.value)
    );
    inputCloseUsername.value = '';
    inputClosePin.value = '';
    labelWelcome.textContent = 'Log in to get started';
    accounts.splice(delectedAccount, 1);
    containerApp.style.opacity = 0;
  }
});
// funzione che riordina le transazioni in base al valore
let sortActive = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  sortActive = sortActive == false ? true : false;
  displayMovements(accountOn, sortActive);
});
