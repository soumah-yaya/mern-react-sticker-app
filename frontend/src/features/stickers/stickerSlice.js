import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import stickerService from './stickerService'


const initialState = {
    stickers: [],
    isError: false,
    isLoading: false,
    message: '',
}

//create new sticker
export const createSticker = createAsyncThunk('sticker/create', async (stickerData, thunkAPI) => {
    try {
       
        return await stickerService.createSticker(stickerData)

    } catch (error) {
        const message = (error.response && error.response.data && error.reponse.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//update sticker
export const updateSticker = createAsyncThunk('sticker/update', async (stickerId, thunkAPI) => {
    try {
       
        return await stickerService.updateSticker(stickerId)

    } catch (error) {
        const message = (error.response && error.response.data && error.reponse.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//delete new goal
export const deleteSticker = createAsyncThunk('sticker/delete', async (stickerId, thunkAPI) => {
    try {        
        return await stickerService.deleteSticker(stickerId)
    } catch (error) {
        const message = (error.response && error.response.data && error.reponse.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get all stickers
export const getStickers = createAsyncThunk('sticker/all', async (_, thunkAPI) => {
    try {     
        return await stickerService.getStickers()
    } catch (error) {
        const message = (error.response && error.response.data && error.reponse.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const stickerSlice = createSlice({
    name: 'sticker',
    initialState,    
    extraReducers: (builder) => {
        builder
            .addCase(createSticker.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createSticker.fulfilled, (state, action) => {

                state.isLoading = false
                state.stickers.push(action.payload)
            })
            .addCase(createSticker.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getStickers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getStickers.fulfilled, (state, action) => {
                state.isLoading = false
                state.stickers = action.payload
            })
            .addCase(getStickers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteSticker.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteSticker.fulfilled, (state, action) => {
                state.isLoading = false
                state.stickers = state.stickers.filter((item) => {
                    return item._id !== action.payload.id
                })
               
            })
            .addCase(deleteSticker.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateSticker.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateSticker.fulfilled, (state, action) => {
                state.isLoading = false
                state.stickers = state.stickers.filter((goal) => {
                    return goal._id !== action.payload.id
                })
            })
            .addCase(updateSticker.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = stickerSlice.actions
export default stickerSlice.reducer