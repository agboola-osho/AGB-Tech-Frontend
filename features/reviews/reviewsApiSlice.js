import { apiSlice } from "../../app/api/apiSlice"

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (productId) => ({
        url: `/products/reviews/${productId}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Reviews", id: _id })),
              { type: "Reviews", id: "LIST" },
            ]
          : [{ type: "Reviews", id: "LIST" }],
    }),
    addReview: builder.mutation({
      query: (body) => ({
        url: "/products/reviews",
        method: "POST",
        body: {
          ...body,
        },
      }),
      invalidatesTags: [{ type: "Reviews", id: "LIST" }],
    }),
    editReview: builder.mutation({
      query: (body) => ({
        url: "/products/reviews",
        method: "PATCH",
        body: {
          ...body,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Reviews", id: arg._id },
      ],
    }),
    deleteReview: builder.mutation({
      query: (body) => ({
        url: "/products/reviews",
        method: "DELETE",
        body: {
          ...body,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Reviews", id: arg._id },
      ],
    }),
  }),
})

export const {
  useAddReviewMutation,
  useEditReviewMutation,
  useGetReviewsQuery,
  useDeleteReviewMutation,
} = reviewsApiSlice
