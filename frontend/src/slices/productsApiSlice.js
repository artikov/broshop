import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: PRODUCTS_URL }),
    }),
    keepUnusedDataFor: 5,
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery } = productsApiSlice;
