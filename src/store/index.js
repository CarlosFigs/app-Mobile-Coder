import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import shopReducer from "./slice/shopSlice"
import cartReducer from "./slice/cartSlice"
import { shopApi } from "../services/shopApi";
import { authApi } from "../services/authApi";
import userReducer from "./slice/userSlice"
import { profileApi } from "../services/profileApi";
export const store = configureStore({
    // por conveccion se cambia el nombre slice para reducer ya que el objeto que recibe todos esos slices se llama reducer..
    reducer: {
        shopReducer,
        cartReducer,
        userReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
    },
    middleware: (getDefaultMiddelware) => (getDefaultMiddelware()
        .concat(shopApi.middleware)
        .concat(authApi.middleware)
        .concat(profileApi.middleware))
})
setupListeners(store.dispatch)