import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: "eng",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    createLang: (state, { payload }) => {
      state.lang = payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const { createLang } = languageSlice.actions;
export default languageSlice.reducer;
