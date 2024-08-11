import './style.css'

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
