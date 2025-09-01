'use client'
import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./features/api/apiSlice"
import authSlice from "./features/auth/authSlice"

export const store = configureStore({
    reducer: {
       [apiSlice.reducerPath]: apiSlice.reducer,
       auth: authSlice,
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

//call the load user function on every page load
const intializeApp = async () => {
    // await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, {forceRefetch: true}));

    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, {forceRefetch: true}));
}
intializeApp();





// server 
export const server = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api/v1";
