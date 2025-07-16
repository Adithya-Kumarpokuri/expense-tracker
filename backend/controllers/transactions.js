// const IncomeSchema= require("../models/IncomeModel")
// const ExpenseSchema = require("../models/ExpenseModel")
// const User =require('../models/UserModel')
// const mongoose = require('mongoose');

// exports.getTransactions=async(req,res)=>{
//      try {
//       const userId = req.user._id;
//         if (!userId) 
//         {
//           return res.status(400).json({ message: 'userId is required' });
//         }
//     const incomes = await IncomeSchema.find({ userId }).lean();
//     const expenses = await ExpenseSchema.find({ userId }).lean();

//     const allTransactions = [
//       ...incomes.map(tx => ({ ...tx, type: "income" })),
//       ...expenses.map(tx => ({ ...tx, type: "expense" }))
//     ];
//     allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

//     res.json(allTransactions);
//   } catch (err) {
//     console.error("Error fetching transactions:", err);
//     res.status(500).json({ error: "Server error while fetching transactions" });
//   }
// };



// const IncomeSchema = require("../models/IncomeModel");
// const ExpenseSchema = require("../models/ExpenseModel");

// exports.getTransactions = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     if (!userId) {
//       return res.status(400).json({ message: "userId is required" });
//     }

//     const {
//       startDate,
//       endDate,
//       type,
//       minAmount,
//       maxAmount,
//     } = req.query;

//     const filter = { userId };

//     // Date filtering - handle any combination
//     if (startDate || endDate) {
//   filter.date = {};
//   if (startDate) {
//     filter.date.$gte = new Date(startDate);
//   }
//   if (endDate) {
//     const end = new Date(endDate);
//     end.setHours(23, 59, 59, 999);
//     filter.date.$lte = end;
//   }
// }

//     // Amount filtering
//     if (minAmount || maxAmount) {
//       filter.amount = {};
//       if (minAmount) filter.amount.$gte = Number(minAmount);
//       if (maxAmount) filter.amount.$lte = Number(maxAmount);
//     }

//     let incomes = [];
//     let expenses = [];

//     // Only query types selected
//     if (!type || type === "income") {
//       incomes = await IncomeSchema.find(filter).lean();
//     }

//     if (!type || type === "expense") {
//       expenses = await ExpenseSchema.find(filter).lean();
//     }

//     const allTransactions = [
//       ...incomes.map(tx => ({ ...tx, type: "income" })),
//       ...expenses.map(tx => ({ ...tx, type: "expense" })),
//     ];

//     // Sort by date descending
//     allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

//     return res.json(allTransactions);
//   } catch (err) {
//     console.error("Error fetching transactions:", err);
//     return res.status(500).json({ error: "Server error while fetching transactions" });
//   }
// };


const IncomeSchema = require("../models/IncomeModel");
const ExpenseSchema = require("../models/ExpenseModel");

exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const {
      startDate,
      endDate,
      type,
      minAmount,
      maxAmount,
    } = req.query;

    const filter = { userId };

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        const start = new Date(startDate);
        start.setUTCHours(0, 0, 0, 0);
        filter.date.$gte = start;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setUTCHours(23, 59, 59, 999);
        filter.date.$lte = end;
      }
    }

    if (minAmount || maxAmount) {
      filter.amount = {};
      if (minAmount) filter.amount.$gte = Number(minAmount);
      if (maxAmount) filter.amount.$lte = Number(maxAmount);
    }

    let incomes = [];
    let expenses = [];

    if (!type || type === "income") {
      incomes = await IncomeSchema.find(filter).lean();
    }

    if (!type || type === "expense") {
      expenses = await ExpenseSchema.find(filter).lean();
    }

    const allTransactions = [
      ...incomes.map(tx => ({ ...tx, type: "income" })),
      ...expenses.map(tx => ({ ...tx, type: "expense" })),
    ];

    allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    return res.json(allTransactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    return res.status(500).json({ error: "Server error while fetching transactions" });
  }
};
