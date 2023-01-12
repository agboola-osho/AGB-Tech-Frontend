import { apiSlice } from "../../app/api/apiSlice"
import { setToken, logOut } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (newUser) => ({
        url: "/auth/signup",
        method: "POST",
        body: {
          ...newUser,
        },
      }),
    }),
    login: builder.mutation({
      query: (User) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          ...User,
        },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          dispatch(logOut())
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState())
          }, 1000)
        } catch (err) {
          console.log(err)
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { accessToken } = data
          dispatch(setToken(accessToken))
        } catch (err) {
          console.log(err)
        }
      },
    }),
  }),
})

export const {
  useLoginMutation,
  useRefreshMutation,
  useSendLogoutMutation,
  useSignupMutation,
} = authApiSlice
