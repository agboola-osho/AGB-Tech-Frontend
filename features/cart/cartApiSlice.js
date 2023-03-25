import { apiSlice } from "../../app/api/apiSlice"

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: "/cart",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Cart", id: _id })),
              { type: "Cart", id: "LIST" },
            ]
          : [{ type: "Cart", id: "LIST" }],
    }),
    addToCart: builder.mutation({
      query: (product) => ({
        url: "/cart",
        body: {
          ...product,
        },
        method: "POST",
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    editQty: builder.mutation({
      query: (body) => ({
        url: "/cart",
        body: {
          ...body,
        },
        method: "PATCH",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Cart", id: arg._id }],
    }),
    deleteFromCart: builder.mutation({
      query: (id) => ({
        url: "/cart",
        body: {
          ...id,
        },
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
  }),
})

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useEditQtyMutation,
  useDeleteFromCartMutation,
} = cartApiSlice
