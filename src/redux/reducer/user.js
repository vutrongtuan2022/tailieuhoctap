import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infoUser: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInfoUser: (state, action) => {
      state.infoUser = action?.payload;
    },
  },
});
export const { setInfoUser } = userSlice.actions;
export default userSlice.reducer;
