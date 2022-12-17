const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')


const UserCtrl = require('../controllers/userController')
console.log('route')
router.route('/')
    .post(UserCtrl.registerUser)
    .get(protect, UserCtrl.getAllUser)

router.post('/login', UserCtrl.loginUser)
router.get('/id', protect, UserCtrl.getUser)

module.exports = router