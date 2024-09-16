const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const {registerControllers,loginControllers}=require('../controllers/UserController');

const router = require('express').Router();


router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id/:userId', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id/:userId', deleteExpense)
    .post('/login',loginControllers)
    .post('/register',registerControllers)
module.exports = router