const StickerDAO = require("../models/stikersDAO")

class Sticker {
    // get all stickers
    static async getStikers(id) {
        try {
            const stickers = await StickerDAO.find({ user: id })
            return stickers
        } catch (error) {
            console.log(`unable to get stickers ${error}`)
            return []
        }
    }

    // add sticker
    static async addStiker(text,id) {
        try {
            const sticker = await StickerDAO.create({ text, user: id })
            return sticker
        } catch (error) {
            console.log(`unable to create sticker ${error}`)
            return {}
        }
    }

    // get sticker by id
    static async getStikerById(id) {
        try {
            const sticker = await StickerDAO.findById(id)
            return sticker
        } catch (error) {
            console.log(`unable to get sticker ${error}`)
            return {}
        }
    }

    // update sticker
    static async updateStiker(id,data) {
        try {
            const sticker = await StickerDAO.findByIdAndUpdate(id, data, { new: true })
            return sticker
        } catch (error) {
            console.log(`unable to update sticker ${error}`)
            return {}
        }
    }

    // // delete sticker
    // static async deleteStiker(id) {
    //     try {
    //         const sticker = await StickerDAO.findByIdAndDelete(id)
    //         return sticker
    //     } catch (error) {
    //         console.log(`unable to delete sticker ${error}`)
    //         return {}
    //     }
    // }
}

module.exports = Sticker