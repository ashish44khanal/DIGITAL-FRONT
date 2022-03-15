import {
  BrowserRouter,
  HashRouter,
  Link,
  Redirect,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import "./css/master.scss";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import CoursesSearch from "./pages/CoursesSearch";
import CoursePreview from "./pages/CoursePreview";
import Dashboard from "./pages/Dashboard";
import SubscribedCourse from "./pages/SubscribedCourse";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "./Redux/user/UserSlice";
import { createLang } from "./Redux/Language/LanguageSlice";
import StartCourse from "./pages/StartCourse";
import About from "./pages/About";
import Partners from "./pages/Partners";
import Demographics from "./pages/Demographics";
import Videos from "./pages/Videos";
import PlayQuiz from "./pages/PlayQuiz";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  const [auth, setAuth] = useState(false);
  console.log("auth", auth);
  let token = localStorage.getItem("token");
  let language = localStorage.getItem("lang");

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const s1 = process.env.REACT_APP_JWT_KEY;
    if (language != null) {
      dispatch(createLang(language));
    } else {
      dispatch(createLang("eng"));
    }
    if (token != null) {
      jwt.verify(token, `${s1}`, function (err, decode) {
        if (err) {
          localStorage.removeItem("token");
          setAuth(false);
          window.location.reload(false);
          console.log("eror whiel vefiying jwt");
          history.push("/login");
        } else {
          console.log("success jwt");
          setAuth(true);
          const decode = jwtDecode(token);
          dispatch(createUser(decode));
        }
      });
    }
  }, [auth, dispatch, token, language, history]);
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/about" exact component={About} />
      <Route path="/partners" exact component={Partners} />
      <Route path="/privacy_policy" exact component={PrivacyPolicy} />
      <Route path="/courses" exact component={Courses} />
      <Route path="/search/:id/:name" exact component={CoursesSearch} />
      <Route path="/course/:id/:name" exact component={CoursePreview} />
      {auth && (
        <Route
          path={`/:enrolled_id/:name/:course_id/subscribed/:id`}
          exact
          component={SubscribedCourse}
        />
      )}
      <Route path="/start_course/:name/:id" exact component={StartCourse} />
      {auth && <Route path="/dashboard" exact component={Dashboard} />}
      {!auth && <Route path="/login" exact component={Login} />}
      {!auth && <Route path="/register" exact component={Register} />}
      {auth && (
        <Route path="/:user_id/demographics" exact component={Demographics} />
      )}
      <Route path="/videos" exact component={Videos} />
      {auth && (
        <Route
          path="/quiz/:quiz_id/:course/:course_id"
          exact
          component={PlayQuiz}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
