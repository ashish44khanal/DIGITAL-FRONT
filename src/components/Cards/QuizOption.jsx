import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCorrectAnswer } from "../../Redux/quiz/QuizSlice";

function QuizOption({ opt, correct, next }) {
  const [correctAnswer, setCorrectAnswer] = useState("");
  const dispatch = useDispatch();

  const checkAnswer = (ans) => {
    if (ans === "true") {
      setCorrectAnswer("true");
      dispatch(updateCorrectAnswer());

      setTimeout(() => {
        setCorrectAnswer("");
        next();
      }, 1000);
    } else {
      setCorrectAnswer("false");
      setTimeout(() => {
        setCorrectAnswer("");
        next();
      }, 1000);
    }
  };
  return (
    <div
      className={`border my-4 p-2 rounded-md w-full transition cursor-pointer hover:bg-gray-100 ${
        correctAnswer === "true" && "text-green-600"
      } ${correctAnswer === "false" && "text-red-600"}`}
      onClick={() => checkAnswer(correct)}
    >
      {opt}
    </div>
  );
}

export default QuizOption;
