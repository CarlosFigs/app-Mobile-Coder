import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        // cuanto la key y el value son el mismo nombre se puede simplificar colocando solo la variable, en el initial state se coloca el key y el value de los valores iniciales(es un objeto)
        // en los slices iran las variables de estado, las que se obtengan de la nube y las que no.. y todos los metodos que se utilizan
        email: ""
    },
    reducers: {
        setUserEmail: (state, action) => {
            state.email = action.payload
        }
    }
})

export const { setUserEmail } = userSlice.actions
export default userSlice.reducer