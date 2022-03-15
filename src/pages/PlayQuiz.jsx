import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { RiDatabase2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import QuizQuestionCard from "../components/Cards/QuizQuestionCard";
import Page from "../templates/Page";
import Celebration from "../images/Celebration.png";
import { updateQuestionNo, updateCorrectAnswer } from "../Redux/quiz/QuizSlice";

function PlayQuiz() {
  const { course, course_id, quiz_id } = useParams();
  const username = useSelector((state) => state.user.username);
  const { correct_answer } = useSelector((state) => state.quiz);
  const [data, setData] = React.useState([]);
  const [totalQuestion, setTotalQuestion] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [finalPage, setFinalPage] = useState(false);
  const dispatch = useDispatch();
  const [i, setI] = useState(0);
  const handleQuizQuestionNext = () => {
    if (parseInt(i + 1) < parseInt(totalQuestion)) {
      setI(i + 1);
      dispatch(updateQuestionNo());
    } else setFinalPage(true);
  };
  // const handleQuizQuestionPrev = () => {
  //   if (parseInt(i + 1) <= parseInt(totalQuestion)) {
  //     setI(i - 1);
  //   } else setI(i);
  // };

  const [countCorrect, setCountCorrect] = useState(0);

  const handleQuestionCount = () => {
    dispatch(updateQuestionNo);
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        await axios
          .get(`${process.env.REACT_APP_URL}/quizQuestion/question/${quiz_id}`)
          .then((res) => {
            console.log("questions", res);
            setLoading(false);
            console.log(res.data[0]);
            setTotalQuestion(res.data.length);
            setData([res.data[i]]);
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [quiz_id, course_id, i, dispatch]);

  return (
    <Page>
      <div className="bg-gray-100 h-screen w-full p-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-center p-4.rounded">
            <div className="card lg:w-1/2">
              {finalPage ? (
                // quiz final page design starts
                <div className="text-center my-10">
                  <div className="w-full p-1">
                    <img src={Celebration} alt="" srcset="" />

                    <p
                      className="font-medium"
                      style={{ backgroundImage: `${Celebration}` }}
                    >
                      {" "}
                      Congratulations ! {username}
                    </p>
                    <div className="my-4">
                      <p className="font-bold text-3xl text-blue-600 font-serif">
                        You Have Scored {correct_answer} out of {totalQuestion}
                      </p>
                    </div>
                  </div>

                  <hr />
                  <div className="mt-8">
                    <Link to="/dashboard">
                      <p className="btn-primary">Back to Profile</p>
                    </Link>
                  </div>
                </div>
              ) : (
                // quiz final page design ends
                <>
                  <h2 className="text-primary text-center mb-6">
                    QUIZ - {course}
                  </h2>
                  <div className="bg-gray-100 p-2 my-4 flex items-center justify-between rounded-md px-3">
                    <p className="font-medium">{username}</p>
                    <p>
                      Total Question :{" "}
                      <span className="font-bold">
                        {correct_answer}/{totalQuestion}
                      </span>
                    </p>
                  </div>
                  <div className="my-4">
                    {data.map((item) => (
                      <div key={item.id}>
                        {/* <div className="flex items-center space-x-2">
                          <p className="text-xl font-medium">{i + 1}.</p>
                          <p className="text-xl font-medium">
                            {item.quiz_question}
                          </p>
                        </div> */}
                        <QuizQuestionCard
                          id={item.id}
                          question={item.quiz_question}
                          next={handleQuizQuestionNext}
                        />

                        {/* <div className="flex items-center space-x-4">
                      <button
                        className="btn-primary rounded-md my-2"
                        onClick={handleQuizQuestionNext}
                      >
                        Next{" "}
                      </button>
                      {i !== 0 && (
                        <button
                          className="btn-secondary rounded-md my-2"
                          onClick={handleQuizQuestionPrev}
                        >
                          Previous{" "}
                        </button>
                      )}
                    </div> */}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default PlayQuiz;
