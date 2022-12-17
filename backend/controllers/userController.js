
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../services/userService')

// @desc register user 
// @route GET /api/users/register
// @access public
exports.registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all required fields')
    }

    const oldUser = await User.getUser(email)
    if (oldUser) {
        res.status(400)
        throw new Error('This email already exists')
    }

    // create user
    const user = await User.createUser(name, email, hash(password))
    if (user) {
        res.status(201).json({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            meta: {
                status: 201,
                msg: "register succesfully"
            },
            token: sign(user.id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid data")
    }

})

// @desc login user
// @route GET /api/users/login
// @access public
exports.loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Please add all required fields')
    }
    // check email
    const user = await User.getUser(email)
    
    if (!user) {
        res.status(400)
        throw new Error('the email is incorrect')
    } else {
        // match the passwords
        
        const isValid = isValidPassword(password, user.password)
        if (!isValid) {
            res.status(400)
            throw new Error('the password is incorrect')
        }
        res.status(200).json({
            data: {
                _id: user.id,
                name: user.name,
                email: user.email
            },
            meta: {
                status: 200,
                msg: "login succesfully"
            },
            token: sign(user.id)
        })
    }

})

// @desc Get user list
// @route GET /api/users
// @access Private
exports.getAllUser = asyncHandler(async (req, res) => {

    const users = await User.getUserList()
    res.status(200).json({
        data:users,
        meta:{
            status: 200,
            msg:"get list successfully"
        }
    })
})

// @desc Get user data
// @route GET /api/users/me
// @access Private
exports.getUser = asyncHandler(async (req, res) => {
    const user = await User.getUserById(req.id)
    res.status(200).json({
        data: user,
        meta: {
            status: 200,
            msg: "get user successfully"
        }
    })
})



function sign(id) {
    return 'Bearer ' + jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: '36d'
    })
}

function hash(password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

function isValidPassword(password1, password2) {
    return bcrypt.compareSync(password1, password2)
} 