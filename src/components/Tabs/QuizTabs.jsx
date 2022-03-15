import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  resetCorrectAnswer,
  resetQuestionNo,
} from "../../Redux/quiz/QuizSlice";

function QuizTabs({ course_id, course }) {
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState(false);
  const [quizId, setQuizId] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const handlePlayQuiz = () => {
    history.push(`/quiz/${quizId}/${course}/${course_id}`);
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        await axios
          .get(`${process.env.REACT_APP_URL}/quiz/course/${course_id}`)
          .then((res) => {
            setLoading(false);
            if (res.data.length > 0) {
              setAvailable(true);
              setQuizId(res.data[0].id);
              dispatch(resetQuestionNo());
              dispatch(resetCorrectAnswer());
            }
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [course_id, dispatch]);
  return (
    <div>
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin" />
      ) : available ? (
        <div className="bg-gray-100 p-4 rounded-md">
          <h1>
            GREAT !! <br />
            <span className="text-lg">Quiz is Available For {course}</span>
          </h1>
          <button
            onClick={handlePlayQuiz}
            className="bg-green-600 p-3 rounded font-semibold font-serif text-white animate-bounce"
          >
            Start Quiz Now !
          </button>
        </div>
      ) : (
        <h1>
          Sorry !! <br />{" "}
          <span className="text-lg">Quiz is not Available for {course}</span>{" "}
        </h1>
      )}
    </div>
  );
}

export default QuizTabs;
