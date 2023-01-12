import { apiSlice } from "../../app/api/apiSlice"

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
    }),
    getProductsByCategory: builder.query({
      query: (category) => ({
        url: `/products/categories/${category}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
    }),
    getProductsByBrand: builder.query({
      query: (brand) => ({
        url: `/products/brands/${brand}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
    }),
    getProductCategories: builder.query({
      query: () => ({
        url: "/products/categories",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
    }),
    getProductBrands: builder.query({
      query: () => ({
        url: "/products/brands",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
    }),
    createNewProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: {
          ...newProduct,
        },
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: (Product) => ({
        url: "/products",
        method: "PATCH",
        body: {
          ...Product,
        },
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: "/products",
        method: "DELETE",
        body: {
          id,
        },
      }),
      invalidatesTags: ["Products"],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateNewProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductsByCategoryQuery,
  useGetProductsByBrandQuery,
  useGetProductBrandsQuery,
  useGetProductCategoriesQuery,
} = productApiSlice
