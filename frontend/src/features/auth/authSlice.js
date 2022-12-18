import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// token from localStorage
const token = localStorage.getItem('token')

const initialState = {
    
    isError: false,
    isLoading: false,
    message: '',
    authenticated: (token && token.length !== 0) ? true : false,

}
// register user
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        return await authService.register(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.meta.msg)
    }
})

// login user
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {

    try {
        return await authService.login(userData)
    } catch (error) {  
             
        return thunkAPI.rejectWithValue(error.response.data.meta.msg)
    }
})

// logout
export const logout = createAsyncThunk('auth/logout',
    async () => {
        await authService.logout()
    })
export const authSlice = createSlice({
    name: 'auth',
    initialState,    
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.authenticated = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.authenticated = false
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.authenticated = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.authenticated = false
            })
            .addCase(logout.fulfilled, (state) => {
                state.authenticated = false
            })
    }
})
export const { reset } = authSlice.actions
export default authSlice.reducer