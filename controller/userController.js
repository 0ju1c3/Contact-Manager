const asynchHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
//@desc register user
//@route post /api/users/register
//@access public
const registerUser = asynchHandler(async (req,res)=>{
    const{username,email,password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error("Please fill in all the fields")
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User already exists")
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            email:user.email,
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid user data")
    }
    res.json({message:"Register the user"})
})

//@desc login user
//@route post /api/users/login 
//@access public
const loginUser = asynchHandler(async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("Please fill in all the fields")
    }
    const user = await User.findOne({email})
    //compare password with hashed password
    if(user && (await bcrypt.compare(password,user.password))){
        const accesstoken = jwt.sign({
            user:{
                username:user.username,
                email : user.email,
                id: user.id,
            }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"2m"})
        res.json({accesstoken})
    } else{
        res.status(400)
        throw new Error("Email or password not valid ")
    }
    res.json({message:"Login user"})
})


//@desc current user
//@route post /api/users/current 
//@access private
//to access this route the client needs access token, hence, only authenticated users can access this route
const currentUser = asynchHandler(async (req,res)=>{
  res.json(req.user)
})


module.exports = {registerUser, loginUser,currentUser}
