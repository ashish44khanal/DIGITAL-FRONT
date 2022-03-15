import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  question_no: 1,
  correct_answer: 0,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    updateQuestionNo: (state, { payload }) => {
      state.question_no = state.question_no + 1;
    },
    updateCorrectAnswer: (state) => {
      state.correct_answer = state.correct_answer + 1;
    },
    resetQuestionNo: (state) => {
      state.question_no = 1;
    },
    resetCorrectAnswer: (state) => {
      state.correct_answer = 0;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  updateQuestionNo,
  updateCorrectAnswer,
  resetQuestionNo,
  resetCorrectAnswer,
} = quizSlice.actions;
export default quizSlice.reducer;
