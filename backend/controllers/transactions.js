const IncomeSchema= require("../models/IncomeModel")
const ExpenseSchema = require("../models/ExpenseModel")
const User =require('../models/UserModel')
const mongoose = require('mongoose');

exports.getTransactions=async(req,res)=>{
     try {
    const {userId} = req.query; 
        if (!userId) 
        {
            return res.status(400).json({ message: 'userId is required' });
        }
    const incomes = await IncomeSchema.find({ userId }).lean();
    const expenses = await ExpenseSchema.find({ userId }).lean();

    const allTransactions = [
      ...incomes.map(tx => ({ ...tx, type: "income" })),
      ...expenses.map(tx => ({ ...tx, type: "expense" }))
    ];
    allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(allTransactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: "Server error while fetching transactions" });
  }
};