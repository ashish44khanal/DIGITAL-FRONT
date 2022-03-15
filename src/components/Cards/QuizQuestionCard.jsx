import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Question from "./Question";

function QuizQuestionCard({ id, question, next }) {
  const { question_no } = useSelector((state) => state.quiz);

  return (
    <div>
      <div className="">
        <p className="text-xl font-medium">
          <span>{question_no}. </span>
          {question}
        </p>
        <div className="my-5">
          <Question question_id={id} next={next} />
        </div>
      </div>
    </div>
  );
}

export default QuizQuestionCard;
