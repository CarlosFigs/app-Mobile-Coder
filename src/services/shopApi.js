import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rtdbBaseUrl = process.env.EXPO_PUBLIC_RTDB_URL

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({
        baseUrl: rtdbBaseUrl
    }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => "categories.json"
        }),
        getProductsByCategory: builder.query({
            //para fireBase las informacion que se consume viene como un objeto
            //el metodo transform lo convierte en un array
            query:(category)=>`products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse: (response) => {
                return Object.values(response)
            }
        })
    })
})

export const { useGetCategoriesQuery, useGetProductsByCategoryQuery } = shopApi