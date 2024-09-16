const IncomeSchema= require("../models/IncomeModel")
const User =require('../models/UserModel')
const mongoose = require('mongoose');
exports.addIncome = async (req, res) => {
    const { title, amount, category, description, userId, date } = req.body;

   
    const income = new IncomeSchema({
        title,
        amount,
        category,
        description,
        userId,
        date
    });

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        const savedIncome = await income.save();
        user.transactions = user.transactions || []; 
        user.transactions.push(savedIncome._id)
        await user.save();  
       res.status(200).json({ message: 'income Added', expense: savedIncome });
    } catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.getIncomes = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }

        console.log("Checking userId:", userId);
        const incomes = await IncomeSchema.find({ userId: userId }).sort({ createdAt: -1 });

       
        if (incomes.length === 0){
            return res.status(404).json({ message: 'No incomes found for this user' });
        }
        
        res.status(200).json(incomes);
    } catch (error) {
        console.error('Error fetching incomes:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteIncome = async (req, res) => {
    try {
        const { id, userId } = req.params;  
      console.log("id",userId)
      console.log("item",id)
       
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
       
        const deletedIncome = await IncomeSchema.findByIdAndDelete(id);
        if (!deletedIncome) {
            return res.status(404).json({ message: 'income not found' });
        }
        user.incomes = user.transactions.filter((income) => income.toString() !== id.toString());
        await user.save();  
        res.status(200).json({ message: 'income Deleted' });

    } catch (err) {
        console.error("Error deleting income:", err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};