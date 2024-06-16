// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const amazonApi = createApi({
  reducerPath: "amazonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://real-time-amazon-data.p.rapidapi.com/",
    method: "GET",
    headers: {
      'x-rapidapi-key': 'ac18448241msh25df8f16272c337p1cf69ajsn2b65461ef39e',
      "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
    },
  }),
  endpoints: (builder) => ({
    getPhoneSearch: builder.query({
      query: (name) => `${name}`,
    }),
    getMensFashionSearch: builder.query({
      query: (name) => `${name}`,
    }),
    getWomenFashionSearch: builder.query({
      query: (name) => `${name}`,
    }),
    getBoysFashionSearch: builder.query({
      query: (name) => `${name}`,
    }),
    getGirlsFashionSearch: builder.query({
      query: (name) => `${name}`,
    }),
    getBabyFashionSearch: builder.query({
      query: (name) => `${name}`,
    }),
    getElectronicsSearch: builder.query({
      query: (name) => `${name}`,
    }),
    getGrocerySearch: builder.query({
      query: (name) => `${name}`,
    }),
    getMusicSearch: builder.query({
      query: (name) => `${name}`,
    }),
    getAppliancesSearch: builder.query({
      query: (name) => `${name}`,
    }),
    getToysSearch: builder.query({
      query: (name) => `${name}`,
    }),
    getPrimeSearch: builder.query({
      query: (name) => `${name}`,
    }),
  
  }),
 
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPhoneSearchQuery, useGetMensFashionSearchQuery, useGetWomenFashionSearchQuery, useGetBoysFashionSearchQuery, useGetGirlsFashionSearchQuery, useGetBabyFashionSearchQuery, useGetElectronicsSearchQuery, useGetGrocerySearchQuery, useGetMusicSearchQuery, useGetAppliancesSearchQuery, useGetToysSearchQuery, useGetPrimeSearchQuery } = amazonApi;
// export const { useGetPokemonByPhoneQuery } = pokemonApi
