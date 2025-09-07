import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authBaseUrl = process.env.EXPO_PUBLIC_AUTH_URL
const apiKey = process.env.EXPO_PUBLIC_API_KEY

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: authBaseUrl
    }),
    //los endpoints de signIn y signUp son mutaciones para los envio de data de firebase
    //por lo tanto utilizan metodo post, el endpoint lo proporciono la documentacion de firebase. auth es el email y clave
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (auth) => ({
                url: `accounts:signUp?key=${apiKey}`,
                method: 'POST',
                body: auth
            })
        }),
        login: builder.mutation({
            query: (auth) => ({
                url: `accounts:signInWithPassword?key=${apiKey}`,
                method: 'POST',
                body: auth
            })
        }),
    })
})

export const { useLoginMutation, useSignupMutation} = authApi