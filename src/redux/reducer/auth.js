import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isLogin: false,
  dataLoginStorage: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action?.payload;
    },
    setStateLogin: (state, action) => {
      state.isLogin = action?.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.token = null;
    },
    setDataLoginStorage: (state, action) => {
      state.dataLoginStorage = action?.payload;
    },
  },
});
export const { setToken, setStateLogin, setDataLoginStorage, logout } =
  authSlice.actions;
export default authSlice.reducer;
