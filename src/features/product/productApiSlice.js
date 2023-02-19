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
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Product", id: _id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    getProductsByCategory: builder.query({
      query: (category) => ({
        url: `/products/categories/${category}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Product", id: _id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    getProductsByBrand: builder.query({
      query: (brand) => ({
        url: `/products/brands/${brand}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Product", id: _id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    getProductCategories: builder.query({
      query: () => ({
        url: "/products/categories",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      providesTags: [{ type: "Product", id: "LIST" }],
    }),
    getProductBrands: builder.query({
      query: () => ({
        url: "/products/brands",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      providesTags: [{ type: "Product", id: "LIST" }],
    }),
    createNewProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: {
          ...newProduct,
        },
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: (Product) => ({
        url: "/products",
        method: "PATCH",
        body: {
          ...Product,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg._id },
      ],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: "/products",
        method: "DELETE",
        body: {
          id,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg._id },
      ],
    }),
    searchProducts: builder.query({
      query: (query) => ({
        url: `/products/search?q=${query}`,
      }),
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
  useSearchProductsQuery,
} = productApiSlice
