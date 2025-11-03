import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './Slices/apiSlices'
import authSlice from './Slices/authSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware)
    
})