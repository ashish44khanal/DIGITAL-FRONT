import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course_id: "",
  course_title: "",
};

export const courseInfoSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    createCourse: (state, { payload }) => {
      state.course_id = payload;
    },
    createCourseTitle: (state, { payload }) => {
      state.course_title = payload;
    },
  },
});

export const { createCourse, createCourseTitle } = courseInfoSlice.actions;
export default courseInfoSlice.reducer;
