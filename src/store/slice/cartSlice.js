import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "carrito",
    initialState: {
        user: "demo",
        cartItems: [],
        updateAt: new Date().toLocaleDateString(),
        total: 0
    },
    reducers: {
        addItemToCart: (state, action) => {
            const { product, quantity } = action.payload
            const productInCart = state.cartItems.find(item => item.id === product.id)
            if (!productInCart) {
                state.cartItems.push({ ...product, quantity })
            } else {
                productInCart.quantity += 1
            }
            state.updateAt = new Date().toLocaleString();
            state.total = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        },
        removeItemsFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(items => items.id !== action.payload)
            console.log("producto borrado")
            state.total = state.cartItems.reduce((acc, items) => acc + (items.price * items.quantity), 0)
            state.updateAt = new Date().toLocaleDateString()
        },
        clearCart: (state, action) => {
            state.cartItems = state.cartItems = []
            state.total = 0
            state.updateAt = new Date().toLocaleDateString()
        }
    }
})

export const { addItemToCart, removeItemsFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer