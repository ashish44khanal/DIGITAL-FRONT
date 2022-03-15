import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import MasterLoading from "../components/LoadingSpinners/MasterLoading";
import Page from "../templates/Page";

function StartCourse() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const user_ID = useSelector((state) => state.user.user_id);
  const history = useHistory();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        await axios
          .get(`${process.env.REACT_APP_URL}/course/subcontent/first/${id}`)
          .then((res) => {
            console.log(res);
            setData(res.data);
            setLoading(false);
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [id]);

  // handle course enrollment
  const handleEnrolledCourse = async () => {
    try {
      setLoading(true);
      await axios
        .post(`${process.env.REACT_APP_URL}/enrolled`, {
          user_id: user_ID,
          course_id: data[0]?.course_id,
          redirection_link: data[0]?.id,
        })
        .then((res) => {
          setLoading(false);
          history.push("/dashboard");
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Page>
      <div className="flex justify-center px-4 lg:px-0 py-10 bg-gray-300 lg:bg-gray-100">
        <div className="card rounded-md p-4 lg:p-8 lg:w-1/3">
          {loading && <MasterLoading />}
          {data.map((item) => (
            <div>
              <h3>{item.course_title}</h3>
              <img
                src={item.image}
                alt={item.course_title}
                srcset=""
                className="h-44 w-full object-cover"
              />
              {/* <p className="font-light my-3">
                This course will be added to your course collection Library.
              </p> */}
              <div className="my-2 text-gray-600">{item.short_description}</div>

              <div className="flex items-center space-x-4">
                <button
                  className="btn-primary my-4 rounded w-full"
                  onClick={handleEnrolledCourse}
                >
                  Add This Course To My Library
                </button>
                <Link to="/courses">
                  <p className="btn-secondary rounded-md">Cancel</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

export default StartCourse;
