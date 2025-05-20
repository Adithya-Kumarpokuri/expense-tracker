const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const {registerControllers,loginControllers}=require('../controllers/UserController');
const {getTransactions}=require('../controllers/transactions')
const router = require('express').Router();
const multer = require('multer');
const { uploadProfilePic } = require('../controllers/uploads');
const upload = multer({ dest: 'uploads/' });
router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id/:userId', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id/:userId', deleteExpense)
    .post('/login',loginControllers)
    .post('/register',registerControllers)
    .post('/upload-profile-pic', upload.single('image'), uploadProfilePic)
    .get('/get-transactions',getTransactions)
module.exports = router