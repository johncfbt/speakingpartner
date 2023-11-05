const asyncHandler = require('express-async-handler')
const Info = require('../models/info')
const User = require('../models/userAuth')

//@desc create profile //@route Post /api/users/create/info/:userId  //@access Private
const createInfo = asyncHandler (async (req, res)=>{
  const user = await User.findById(req.params.userId)
  if (!req.body) {
    res.status(400)
    throw new Error('error while processing your input')
  }
  const info = await Info.create({
    contact: req.body.contact,
    description: req.body.description,
    user: user.id,
  })
  res.status(200).json(info)
})

//@desc update profile  //@route PUT /api/users/info/update/:userId  //@access Private
const updateInfo = asyncHandler (async (req, res)=>{
  const user = await User.findById(req.params.userId)
  if(!user) {
    res.status(400)
    throw new Error('User not exist')
  }
  if(user.id.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized to update profile')
  }
  user.contact = req.body.contact || user.contact
  user.description = req.body.description || user.description
  user.language = req.body.language || user.language
  await user.save();
  res.status(200).json(user)
})

//@desc get user profile //@route Post /api/users/info/:userId  //@access Private
const getInfo = asyncHandler (async (req, res)=>{
  const user = await User.findById(req.params.userId)
  if(user){
    res.status(200).json(user)
  } else {
    res.status(400)
    throw new Error('user info not found')
  }
})

module.exports = {
  createInfo,
  updateInfo,
  getInfo,
}