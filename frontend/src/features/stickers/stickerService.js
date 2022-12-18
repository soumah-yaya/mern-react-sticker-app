import api from '../../utils/request'

// create new sticker
const createSticker = async (stickerData) => {
    
    const { data: res } = await api.post('/stickers', { text: stickerData })
    return res.data
}

// get all stickers
const getStickers = async () => {

    const {data: res} = await api.get('/stickers')
    
    return res.data
}

// update a sticker
const updateSticker = async (stickerId) => {

    const response = await api.put('/stickers/' + stickerId)
    return response.data
}

// delete sticker
const deleteSticker = async (stickerId) => {

    const {data:res} = await api.delete('/stickers/' + stickerId)
   
    return res.data
}


const goalService = {
    createSticker,
    getStickers,
    deleteSticker,
    updateSticker,

}
export default goalService