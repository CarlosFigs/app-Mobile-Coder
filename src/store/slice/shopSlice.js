import { createSlice } from "@reduxjs/toolkit";
import categories from "../../data/categories.json"
import products from "../../data/products.json"

const shopSlice = createSlice({
    name:"shop",
    initialState:{
        // cuanto la key y el value son el mismo nombre se puede simplificar colocando solo la variable, en el initial state se coloca el key y el value de los valores iniciales(es un objeto)
        categories,
        products,
        categorySelected: "",
        productSelected:{}
    },
    reducers:{
        setCategorySelected: (state, action)=>{
            state.categorySelected = action.payload
        },
        setProductSelected: (state, action)=>{
            state.productSelected = action.payload
        }
    }
})

export const {setCategorySelected, setProductSelected} = shopSlice.actions
export default shopSlice.reducer