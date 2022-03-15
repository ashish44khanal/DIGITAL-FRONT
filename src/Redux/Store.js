import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/UserSlice";
import courseReducer from "./course/CourseInfoSlice";
import languageReducer from "./Language/LanguageSlice";
import quizReducer from "./quiz/QuizSlice";

export const Store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    language: languageReducer,
    quiz: quizReducer,
  },
});
