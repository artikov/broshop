import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => ({ url: PRODUCTS_URL }),
			providesTags: ["Products"],
			keepUnusedDataFor: 5,
		}),
		getProductDetails: builder.query({
			query: (id) => ({ url: `${PRODUCTS_URL}/${id}` }),
			keepUnusedDataFor: 5,
		}),
		createProduct: builder.mutation({
			query: () => ({
				url: PRODUCTS_URL,
				method: "POST",
			}),
			invalidatesTags: ["Products"],
		}),
		updateProduct: builder.mutation({
			query: (product) => ({
				url: `${PRODUCTS_URL}/${product.productId}`,
				method: "PUT",
				body: product,
			}),
			invalidateTags: ["Products"],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductDetailsQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
} = productsApiSlice;
