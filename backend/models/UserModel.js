// import mongoose from "mongoose";
// import validator from "validator";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
const mongoose=require('mongoose')
const validator=require('validator')
const jwt =require('jsonwebtoken')
const bcrypt=require('bcrypt')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique : true,
        validate : validator.isEmail,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength : [6, "Password Must Be Atleast 6 characters"],
    },
    profilePicUrl: {
    type: String,
    default: "" 
  },
   limit:{
     type:Number,
     default:0
   },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Income' }],
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }],
    createdAt: {
        type:Date,
        default: Date.now,
    },
});
module.exports = mongoose.model('User', userSchema)