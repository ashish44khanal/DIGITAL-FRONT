import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: "",
  user_email: "",
  username: "",
  image: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, { payload }) => {
      state.user_id = payload.user_id;
      state.user_email = payload.user_email;
      state.username = payload.username;
      state.image = payload.image;
      state.isLoggedIn = true;
    },
    userLogout: (state) => {
      state.user_id = "";
      state.user_email = "";
      state.username = "";
      state.image = "";
      state.isLoggedIn = false;
    },
  },
});
// Action creators are generated for each case reducer function
export const { createUser, userLogout } = userSlice.actions;
export default userSlice.reducer;
