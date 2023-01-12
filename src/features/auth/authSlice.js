import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    logOut: (state, action) => {
      state.token = null
    },
  },
})

export default authSlice.reducer
export const { setToken, logOut } = authSlice.actions
export const selectCurrentToken = (state, action) => state.auth.token
