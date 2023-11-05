const express = require('express')
const router = express.Router()
const {registerUser, loginUser, toggleChat, list } = require('../controllers/userController')
const {createInfo, getInfo, updateInfo} = require('../controllers/infoController')
const {protect} = require('../middleware/authMiddleware')
router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/info/create/:userId', protect, createInfo)
router.get('/info/:userId', protect, getInfo)
router.put('/info/update/:userId', protect, updateInfo)
router.put('/toggle/:userId', toggleChat)
router.get('/list', list)

module.exports = router