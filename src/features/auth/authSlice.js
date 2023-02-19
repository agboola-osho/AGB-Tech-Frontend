import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, emailDetails: null },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    logOut: (state, action) => {
      state.token = null
    },
    setEmailDetails: (state, action) => {
      state.emailDetails = action.payload
    },
  },
})

export default authSlice.reducer
export const { setToken, logOut, setEmailDetails } = authSlice.actions
export const selectCurrentToken = (state, action) => state.auth.token
export const selectEmailDetails = (state, action) => state.auth.emailDetails
