import { apiSlice } from "../../app/api/apiSlice"

const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    contact: builder.mutation({
      query: (info) => ({
        url: "/contact",
        method: "POST",
        body: {
          ...info,
        },
      }),
    }),
  }),
})

export const { useContactMutation } = contactApiSlice
