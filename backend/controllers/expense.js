const ExpenseSchema = require("../models/ExpenseModel")
const User =require('../models/UserModel')
const mongoose = require('mongoose');
exports.addExpense = async (req, res) => {
    const { title, amount, category, description, userId, date } = req.body;

    const expense = new ExpenseSchema({
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
        const savedExpense = await expense.save(); 
        user.expenses = user.expenses || [];  
        user.expenses.push(savedExpense._id);  
        await user.save();  
       res.status(200).json({ message: 'Expense Added', expense: savedExpense });

    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.getExpense = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }

        console.log("Checking userId:", userId);
        const expenses = await ExpenseSchema.find({ userId: userId }).sort({ createdAt: -1 });
        if (expenses.length === 0) {
            return res.status(404).json({ message: 'No expenses found for this user' });
        }
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const { id, userId } = req.params;  
      console.log("id",userId)
      console.log("item",id)

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const deletedExpense = await ExpenseSchema.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        user.expenses = user.expenses.filter((expense) => expense.toString() !== id.toString());
        await user.save();  
        res.status(200).json({ message: 'Expense Deleted' });

    } catch (err) {
        console.error("Error deleting expense:", err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};