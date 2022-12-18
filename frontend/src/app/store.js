import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import stickerReducer from '../features/stickers/stickerSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sticker: stickerReducer,
  },
});
