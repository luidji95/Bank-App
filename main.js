'use strict'

/* Kreiranje niza objekata sa podacima o 3 različita bankovna računa */
const Accounts = [{
    owner: "Milos Petrovic",
    transactions: [
        { reason: "Gas Station", amount: -500.00, date: "2024-07-02" },
        { reason: "Supermarket", amount: -12000.00, date: "2024-07-01" },
        { reason: "Bookstore", amount: -3000.00, date: "2024-06-30" }
    ],
    pin: 111,
    visaDebitCard: "4389 3149 1209 2938",
    visaCreditCard: "1233 3157 1209 6510",
    balance: 45499
},
{
    owner: "Nemanja Malesija",
    transactions: [
        { reason: "Rent", amount: -2000 },
        { reason: "Salary", amount: -12000 },
        { reason: "Shopping", amount: -14000 },
        { reason: "Car Payment", amount: -21345 }
    ],
    pin: 222,
    visaDebitCard: "7413 7741 0705 2714",
    visaCreditCard: "8881 2359 7840 5121",
    balance: 122550
},
{
    owner: "Pera Peric",
    transactions: [
        { reason: "Coffee", amount: -300 },
        { reason: "Consulting", amount: -23000 },
        { reason: "Groceries", amount: -1400 },
        { reason: "Gym", amount: -10495 }
    ],
    pin: 333,
    visaDebitCard: "1111 2369 1209 4562",
    visaCreditCard: "7762 1212 7877 1540",
    balance: 78000
},
];

const transactionPrice = document.querySelector('.transaction-price'); // pristup elementu u kojem želimo da se kreiraju elementi
const transactionSum = document.querySelector('.transaction-summ');

/* Kreiranje jedne univerzalne klase račun za sve račune koliko ih budemo imali (u ovom slučaju 3) */
class Account {
    constructor(owner, transactions, pin, visaCreditCard, visaDebitCard, balance) {
        this.id = crypto.randomUUID();
        this.owner = owner;
        this.transactions = transactions;
        this.pin = pin;
        this.visaCreditCard = visaCreditCard;
        this.visaDebitCard = visaDebitCard;
        this.balance = balance;
        this.userName = this.createUserName();
    }

    /* Metoda koja vraća inicijale imena vlasnika računa malim slovima */
    createUserName() {
        const names = this.owner.split(" ");
        return names[0].charAt(0).toLowerCase() + names[1].charAt(0).toLowerCase();
    }

    /* Prolazi kroz niz predefinisanih transakcija i vraća trenutni status tj balans na računu */
    getCurrentBalance() {
        let balance = this.balance;
        this.transactions.forEach(transaction => {
            balance += transaction.amount;
        });
        return balance;
    }

    /* Metoda prolazi kroz ceo niz transakcija i računa samo pozitivne transakcije tj samo uplate na račun */
    incomeTransaction() {
        return this.transactions
            .filter(transaction => transaction.amount > 0)
            .reduce((acc, transaction) => acc + transaction.amount, this.balance);
    }

    /* Metoda koja prolazi kroz sve transakcije i računa samo rashode */
    expenseTransaction() {
        return this.transactions
            .filter(transaction => transaction.amount < 0)
            .reduce((acc, transaction) => acc + transaction.amount, 0);
    }

    /* Metoda koja ubacuje novu transakciju u niz transakcija */
    addTransaction(reason, amount, date) {
        this.transactions.push({ reason, amount, date });
    }


    /* metoda koja renderuje transakcije da budu vidljive */
    renderAllTransactions() {
        transactionPrice.innerHTML = "";
        transactionSum.innerHTML = "";

        let currentBalance = this.balance;

        this.transactions.forEach(transaction => {
            const newTransaction = document.createElement('p');
            newTransaction.textContent = `${transaction.reason}: $${transaction.amount}`;
            transactionPrice.appendChild(newTransaction);

            currentBalance += transaction.amount;

            const newBalance = document.createElement('p');
            newBalance.textContent = `$${currentBalance}`;
            transactionSum.appendChild(newBalance);

            balance.textContent = `$${currentBalance}`;
        });
    }
}

/* Kreiranje klase AccountManager koja će sadržati niz i par dodatnih metoda za lakše pronalaženje podataka */
class AccountManager {
    constructor() {
        this.accountArray = [];
        this.activeAccount = null;
    }
    /* metoda za dodavanje instance klase u niz  */
    addToArray(acc) {
        this.accountArray.push(acc);
    }

    /* Metoda koja prolazi kroz niz računa i traži onaj račun čiji se inicijali poklapaju sa prosleđenim inicijalima */
    findAccountByUserNameAndPin(userName, pin) {
        return this.accountArray.find(acc => acc.userName === userName && acc.pin === pin);
    }

    /* Metoda koja prima vrednost iz input polja za slanje novca i proverava da li postoji taj user sa tim inicijalima */
    findAccountByInitials(initials) {
        return this.accountArray.find(acc => acc.userName === initials);
    }
}

const accountManager = new AccountManager();

/* Prolazimo foreach petljom kroz svaki objekat u nizu Accounts
 i za svaki objekat kreiramo instancu klase Account 
 a zatim je dodajemo u niz Accounts koji se nalazi u AccountManager Klasi */
Accounts.forEach(acc => {
    const newAccount = new Account(
        acc.owner,
        acc.transactions,
        acc.pin,
        acc.visaCreditCard,
        acc.visaDebitCard,
        acc.balance
    );
    accountManager.addToArray(newAccount);
    console.log(accountManager.accountArray);
});

/* Klikom na dugme Get Started otvara se overlay za logovanje */
const getStarted = document.querySelectorAll('.get-started-button');
getStarted.forEach(btn => {
    btn.addEventListener('click', function() {
        overlay.style.display = 'flex';
    });
});

/* Pristup elementima sa overlaya za logovanje */
const overlay = document.getElementById('overlay');
const login = document.querySelector('.log-in-button');
const userNameInput = document.getElementById('usname');
const paswordInput = document.getElementById('psw');

/* Pristup elementima sa banking overlaya */
const bankingOverlay = document.querySelector('.overlay-banking');
const welcomeUser = document.querySelector('.welcome-user');
const visaDebitCard = document.querySelector('.visa-debit');
const visaCreditCard = document.querySelector('.visa-credit');
const income = document.querySelector('.income-sum');
const expenses = document.querySelector('.expenses-sum');
const hiddenCardNum = document.querySelector('.hiden-card-number');
const balance = document.querySelector('.balance-amonuth');

/* Funkcija koja proverava validnost unetih podataka sa login overlaya
i otvara banking overlay ako su podaci tačni */
function logInValidation() {
    const validAccount = accountManager.findAccountByUserNameAndPin(userNameInput.value, parseInt(paswordInput.value));

    if (validAccount) {
        bankingOverlay.style.display = 'flex';
        welcomeUser.textContent = `Welcome ${validAccount.owner}`;
        visaCreditCard.textContent = validAccount.visaCreditCard;
        visaDebitCard.textContent = validAccount.visaDebitCard;
        
        // Pronalazak svih elemenata sa klasom 'user-card-name' i postavljanje teksta u svaki od njih
        const userCardNames = document.querySelectorAll('.user-card-name');
        userCardNames.forEach(userCardName => {
            userCardName.textContent = validAccount.owner;
        });

        income.textContent = `INCOME: $${validAccount.incomeTransaction()}`;
        expenses.textContent = `EXPENSES: $${validAccount.expenseTransaction()}`;

        balance.textContent = `$${validAccount.getCurrentBalance()}`;

        const lastNum = validAccount.visaDebitCard.split(" ");
        hiddenCardNum.textContent = `**** **** **** ${lastNum.pop()}`;

        validAccount.renderAllTransactions();
        accountManager.activeAccount = validAccount;
    } else {
        alert('Wrong username or pasword! User not found!');
    }
    
   
}

login.addEventListener('click', logInValidation);

/* Pristupamo overlayu za uplatu i transfer novca sa računa */
const transferOverlay = document.getElementById('transfer-overlay');
const transferFromUserInput = document.getElementById('transfer-user');
const amountForTransfer = document.getElementById('transfer-amount');
const submitTransfer = document.getElementById('submit-transfer-to');

/* Otvara se overlay klikom na dugme transfer */
const transferMoney = document.querySelector('.btn-payment-transfer');
transferMoney.addEventListener('click', function() {
    bankingOverlay.style.display = 'none';
    transferOverlay.style.display = 'flex';
});