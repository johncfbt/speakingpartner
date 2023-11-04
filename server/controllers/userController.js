const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userAuth')

// @desc:regigster new user, @route: POST /api/users, @access:public
const registerUser = asyncHandler (async (req, res) => {
  const {name, email, password} = req.body
  if(!name||!email||!password){
    res.status(400)
    throw new Error('Please add all fields')
  }
  //check if exists
  const userExsits = await User.findOne({email})
  if(userExsits) {
    res.status(400)
    throw new Error('User already exists')
  }
  //hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    lastLogin: Date.now(),
  })
  if(user) {
    res.status(201).json({
      _id:user.id,
      name:user.name,
      email:user.email,
      token: generateToken(user._id)
    })}
    else {
      res.status(400)
      throw new Error('invalid user data')
    }
  }
)

// @desc:login a user, @route: POST /api/users/login, @access:public
const loginUser = asyncHandler (async (req, res) => {
  const {email, password} = req.body
  //check for user email
  const user = await User.findOne({email})
  if(user && (await bcrypt.compare(password, user.password))){
    user.lastLogin = Date.now();
    await user.save();
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400)
    throw new Error('invalid credentials')
  }
})

// @desc: toggle chat, @route: PUT /api/users/toggle/:userId, @access:private
const toggleChat = asyncHandler (async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  // //get token from header
  // let token = req.headers.authorization.split(' ')[1]
  // //verify token
  // const decoded = jwt.verify(token, "abc123")
  // //get user from the token
  // req.user = await User.findById(decoded.id).select('-password')

  if(!user)  {
    res.status(400)
    throw new Error('User not found')
  }
  // if(user.id.toString() !== req.user.id) {
  //   res.status(401)
  //   throw new Error('User not authorized to toggle status')
  // }
    user.toggleChat = true
    await user.save()
    // reset to false after 10 seconds
    setTimeout(async () => {
      user.toggleChat = false;
      await user.save();
    }, 1800000); // 10000 milliseconds (10 seconds)
    res.status(200).json(user);
})

//@desc: live user list, @route: GET /api/users/list, @access:private
const list = asyncHandler (async (req, res) => {
  const users = await User.find().sort({ lastLogin: -1 }); // Sort by lastLogin in descending order
  if(users){
    res.json(users);
  } else {
    res.status(400)
    throw new Error('server error')
  }
})


//Generate JWT
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  toggleChat,
  list,
}