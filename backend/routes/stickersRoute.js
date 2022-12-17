const express = require('express')
const router = express.Router()
const stickerCtrl = require('../controllers/stickerController')
const { protect } = require('../middleware/authMiddleware')


router.route('/')
    .get(protect, stickerCtrl.getAllStickers)
    .post(protect, stickerCtrl.createSticker)

router.route('/:id')
    .put(protect, stickerCtrl.updateSticker)
    .delete(protect, stickerCtrl.deleteSticker)


module.exports = router