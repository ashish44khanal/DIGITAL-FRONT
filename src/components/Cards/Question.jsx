import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCorrectAnswer } from "../../Redux/quiz/QuizSlice";
import QuizOption from "./QuizOption";

function Question({ option, answer, next, count, question_id }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        await axios
          .get(`${process.env.REACT_APP_URL}/quizOption/qns/${question_id}`)
          .then((res) => {
            console.log("question", res);
            setData(res.data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [question_id]);
  return (
    <>
      {data.map((item) => (
        <QuizOption opt={item.options} correct={item.isCorrect} next={next} />
      ))}
    </>
  );
}

export default Question;
