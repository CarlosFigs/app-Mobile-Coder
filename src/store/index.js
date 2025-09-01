import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./slice/shopSlice"
import cartReducer from "./slice/cartSlice"
export const Store = configureStore({
    // por conveccion se cambia el nombre slice para reducer ya que el objeto que recibe todos esos slices se llama reducer..
    reducer:{
        shopReducer,
        cartReducer
    },
})