import { configureStore } from '@reduxjs/toolkit'
import loginSliceReducer from './slices/LoginSlice'
export const store = configureStore({
  reducer: {
    login:loginSliceReducer
  },
})