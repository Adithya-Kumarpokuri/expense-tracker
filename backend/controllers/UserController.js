// const User =require('../models/UserModel.js')
// const bcrypt=require('bcrypt')

// exports.registerControllers = async (req, res) => {
//     try{
//         const {name, email, password} = req.body;
//         // console.log(name, email, password);
//         if(!name || !email || !password){
//             return res.status(400).json({
//                 success: false,
//                 message: "Please enter All Fields",
//             }) 
//         }

//         let user = await User.findOne({email});

//         if(user){
//             return res.status(409).json({
//                 success: false,
//                 message: "User already Exists",
//             });
//         }
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         // console.log(hashedPassword);
//         let newUser = await User.create({
//             name, 
//             email, 
//             password: hashedPassword, 
//         });

//         return res.status(200).json({
//             success: true,
//             message: "User Created Successfully",
//             user: newUser
//         });
//     }
//     catch(err){
//         return res.status(500).json({
//             success: false,
//             message: err.message,
//         });
//     }

// }
// exports.loginControllers = async (req, res, next) => {
//     try{
//         const { email, password } = req.body;

//         // console.log(email, password);
  
//         if (!email || !password){
//             return res.status(400).json({
//                 success: false,
//                 message: "Please enter All Fields",
//             }); 
//         }
    
//         const user = await User.findOne({ email });
    
//         if (!user){
//             return res.status(401).json({
//                 success: false,
//                 message: "User not found",
//             }); 
//         }
    
//         const isMatch = await bcrypt.compare(password, user.password);
    
//         if (!isMatch){
//             return res.status(401).json({
//                 success: false,
//                 message: "Incorrect Email or Password",
//             }); 
//         }

//         delete user.password;

//         return res.status(200).json({
//             success: true,
//             message: `Welcome back, ${user.name}`,
//             user,
//         });

//     }
//     catch(err){
//         return res.status(500).json({
//             success: false,
//             message: err.message,
//         });
//     }
// }

// exports.allUsers = async (req, res, next) => {
//     try{
//         const user = await User.find({_id: {$ne: req.params.id}}).select([
//             "email",
//             "username",
//             "_id",
//         ]);
//         return res.json(user);
//     }
//     catch(err){
//         next(err);
//     }
// }
const User = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/generateToken');

// Register Controller
exports.registerControllers = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please enter all fields" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(newUser._id);
         console.log("register",token);
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser,
            token
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message });
    }
};

// Login Controller
exports.loginControllers = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter all fields" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Incorrect email or password" });
        }

        const token = generateToken(user._id);
        console.log("token",token);
        return res.status(200).json({
            success: true,
            message: `Welcome back, ${user.name}`,
            user,
            token
        });
    } catch (err) {
        console.log("login err",err)
        return res.status(500).json({ success: false, message: err.message });
    }
};

// Get All Users (excluding current user)
exports.allUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "name",
            "_id",
        ]);
        return res.json(users);
    } catch (err) {
        next(err);
    }
};
