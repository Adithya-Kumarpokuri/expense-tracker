const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const {registerControllers,loginControllers}=require('../controllers/UserController');
const {getTransactions}=require('../controllers/transactions')
const {setLimit,getLimit}=require('../controllers/limit')
const router = require('express').Router();
const multer = require('multer');
const { uploadProfilePic } = require('../controllers/uploads');
//const upload = multer({ dest: 'uploads/' });
const upload = require('../utils/multer.js')
const authMiddleware=require('../middlewares/authMiddleware')
// router.post('/add-income', addIncome)
//     .get('/get-incomes', getIncomes)
//     .delete('/delete-income/:id/:userId', deleteIncome)
//     .post('/add-expense', addExpense)
//     .get('/get-expenses', getExpense)
//     .delete('/delete-expense/:id/:userId', deleteExpense)
//     .post('/login',loginControllers)
//     .post('/register',registerControllers)
//     .post('/upload-profile-pic', upload.single('image'), uploadProfilePic)
//     .get('/get-transactions',getTransactions)
router.post('/add-income',authMiddleware, addIncome)
    .get('/get-incomes', authMiddleware,getIncomes)
    .delete('/delete-income/:id',authMiddleware, deleteIncome)
    .post('/add-expense', authMiddleware,addExpense)
    .get('/get-expenses',authMiddleware, getExpense)
    .delete('/delete-expense/:id',authMiddleware, deleteExpense)
    .post('/login',loginControllers)
    .post('/register',registerControllers)
    .post('/upload-profile-pic',authMiddleware, upload.single('image'), uploadProfilePic)
    .get('/get-transactions',authMiddleware,getTransactions)
    .put('/setlimit',authMiddleware,setLimit)
    .get('/getlimit',authMiddleware,getLimit)
module.exports = router