import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  isMobile: false,
  isRememberPassword: false,
};

export const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action?.payload;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action?.payload;
    },
    setRememberPassword: (state, action) => {
      state.isRememberPassword = action?.payload;
    },
  },
});
export const { setLoading, setIsMobile, setRememberPassword } =
  siteSlice.actions;
export default siteSlice.reducer;
