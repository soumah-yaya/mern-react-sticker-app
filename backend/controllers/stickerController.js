const asyncHandler = require('express-async-handler')
const Sticker =require('../services/stickerService')



// @desc Get stickers
// @route GET /api/stickers
// @access Private
exports.getAllStickers = asyncHandler  (async (req, res) => {
   
    const stickers = await Sticker.getStikers(req.id)
    res.status(200).json({
        data: stickers,
        meta:{
            status:200,
            msg:"get stickers successfully"
        }
    })
})

// @desc create new sticker
// @route POST /api/stickers
// @access Private
exports.createSticker = asyncHandler (async (req, res) => {

    if (!req.body.text) {
        res.status(400)
        throw new Error("please add a text field")
    }
    const sticker = await Sticker.addStiker(req.body.text, req.id)

    res.status(201).json({
        data: sticker,
        meta: {
            status: 201,
            msg: "add sticker successfully"
        }
    })
})

// @desc update user sticker
// @route PUT /api/stickers?:id
// @access Private
exports.updateSticker = asyncHandler(( async (req, res) => {
    const sticker = await Sticker.getStikerById(req.params.id)
   
    if (!sticker || Object.keys(sticker).length === 0) {
        res.status(400)
        throw new Error('sticker not found')
    }
    
    // check user id
    if (!req.id) {
        res.status(401)
        throw new Error('sticker not found')

    }
    //check if logged in user is the same as the sticker's owner
    if (sticker.user.toString() !== req.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    // update the sticker
    const updatedSticker = await Sticker.updateStiker(req.params.id, req.body)
    res.status(200).json({
        data: updatedSticker,
        meta: {
            status: 200,
            msg: "update sticker successfully"
        }
    })
}))

// @desc Delete user sticker
// @route DELETE /api/stickers/:id
// @access Private
exports.deleteSticker = asyncHandler(( async (req, res) => {
    //get the sticker
    const sticker = await Sticker.getStikerById(req.params.id)
    if (!sticker || Object.keys(sticker).length === 0) {
        res.status(400)
        throw new Error('sticker does not exist')
    }
   
    // check user id
    if (!req.id) {
        res.status(401)
        throw new Error('User not found')

    }
    //check if logged in user is authorized to delete
    if (sticker.user.toString() !== req.id) {
        res.status(401)
        throw new Error('you are not allowed to delete this sticker')
    }

    await sticker.remove()
    res.status(200).json({
        data: {
            id: req.params.id
        },
        meta: {
            status: 200,
            msg: "delete sticker successfully"
        }
    })
}))