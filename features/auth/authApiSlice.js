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
    sendEmail: builder.mutation({
      query: (details) => ({
        url: "/auth/email",
        method: "POST",
        body: {
          ...details,
        },
      }),
    }),
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: "/auth/verifyEmail",
        method: "PATCH",
        body: {
          token,
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/resetPwd",
        method: "PATCH",
        body: {
          ...body,
        },
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/auth/user",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRefreshMutation,
  useSendLogoutMutation,
  useSendEmailMutation,
  useSignupMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useGetUserQuery,
} = authApiSlice
