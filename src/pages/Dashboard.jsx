import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import MyLearningCard from "../components/Cards/MyLearningCard";
import MasterLoading from "../components/LoadingSpinners/MasterLoading";
import Page from "../templates/Page";
import { AiFillSetting } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";
import UpdateProfileForm from "../components/Forms/UpdateProfileForm";
function Dashboard() {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const handleModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const { lang } = useSelector((state) => state.language);

  const user_id = useSelector((state) => state.user.user_id);
  const { user_email } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [delt, setDelete] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [cureentPassErr, setcurrentpasserr] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [newpassErr, setnewpasserr] = useState(true);
  const [newpasssuccess, setnewpasssuccess] = useState(false);

  const [updatepasswordsecton, setUpdatepasswordsection] = useState(false);
  const [confirmpasswordsection, setConfirmpasswordsection] = useState(false);

  useCallback(() => {
    return setDelete(!delt);
  }, [delt]);

  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload(false);
  };

  const username = useSelector((state) => state.user.username);
  const image = useSelector((state) => state.user.image);
  const email = useSelector((state) => state.user.user_email);

  const passwordCheck = async (e) => {
    try {
      await axios
        .post(`${process.env.REACT_APP_URL}/user/checkPassword`, {
          email: user_email,
          password: currentPass,
        })
        .then((res) => {
          console.log(res);
          setConfirmpasswordsection(true);
        });
    } catch (error) {
      console.error(error);
      setcurrentpasserr(true);
      setConfirmpasswordsection(false);
      setTimeout(() => {
        setcurrentpasserr(false);
        setCurrentPass("");
      }, 2000);
    }
  };
  const changePassword = async (e) => {
    try {
      setLoading(true);
      await axios
        .put(`${process.env.REACT_APP_URL}/user/updatePassword`, {
          id: user_id,
          password: newPass,
        })
        .then((res) => {
          setLoading(false);
          setnewpasssuccess(true);
          setCurrentPass("");
          setTimeout(() => {
            setConfirmpasswordsection(!confirmpasswordsection);
            setnewpasssuccess(false);
            setUpdatepasswordsection(false);
          }, 3000);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        await axios
          .get(`${process.env.REACT_APP_URL}/course/onUser/${user_id}`)
          .then((res) => {
            setData(res.data);
            setLoading(false);
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [user_id, delt]);
  return (
    <Page>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
            <div className="lg:col-span-9">
              <div className="my-4  border-l-4 pl-2 border-primary">
                <h2 className="text-primary mt-8 uppercase font-normal">
                  {lang === "nep" ? "मेरो सिकाइ" : "My Learning"}
                  {/* <hr className="border-primary w-44" /> */}
                </h2>

                <p className="-mt-4 text-gray-600 font-semibold">
                  {lang === "nep"
                    ? "तपाईंको सदस्यता लिनुभएका पाठ्यक्रमहरूको सूची"
                    : "List of your subscribed courses"}
                </p>
              </div>
              <div className="lg:grid lg:grid-cols-3 lg:gap-8 my-10 ">
                {loading && <MasterLoading />}
                {data.map((item) => (
                  <MyLearningCard
                    id={item.id}
                    img={item.image}
                    title={item.course_title}
                    category={item.category}
                    progress="51"
                    course_id={item.course_id}
                    redirection_link={item.redirection_link}
                    dlt={useCallback}
                  />
                ))}
              </div>
            </div>

            {/* profile update section  */}
            <div className="lg:col-span-3 my-8">
              <div className="card rounded-md p-4 sticky top-10 z-0 ">
                <div className="flex flex-col">
                  {image ? (
                    <img
                      src={image}
                      alt=""
                      srcset=""
                      className="w-24 h-24 rounded-full "
                    />
                  ) : (
                    <div className="bg-primary text-center w-24 h-24 rounded-full text-5xl py-4 text-white font-bold">
                      {username.split("")[0].toUpperCase()}
                    </div>
                  )}

                  {/* <img src={image} alt="" className="w-24 h-24 rounded-full" /> */}
                  <h2 className="font-normal">{username}</h2>
                  <p className="text-gray-500 -mt-4 text-sm">{email}</p>
                </div>
                <div className="flex flex-col space-y-4 my-8">
                  <div
                    className="flex items-center space-x-3 btn-secondary rounded-md cursor-pointer"
                    onClick={() => setIsOpen(true)}
                  >
                    <AiFillSetting />
                    <p>
                      {lang === "nep"
                        ? "प्रोफाइल अपडेट गर्नुहोस्"
                        : "Upadte Profile"}
                    </p>
                  </div>
                  <div
                    className="flex items-center space-x-3 btn-secondary rounded-md cursor-pointer"
                    onClick={(e) =>
                      setUpdatepasswordsection(!updatepasswordsecton)
                    }
                  >
                    <RiLockPasswordFill />
                    <p>
                      {lang === "nep"
                        ? "पासवर्ड अपडेट गर्नुहोस्"
                        : "Update Password"}
                    </p>
                  </div>
                  {/* update paswword form section  */}
                  {updatepasswordsecton && (
                    <div className="p-4 border shadow-lg">
                      <form
                        action=""
                        onSubmit={(e) => {
                          e.preventDefault();
                          passwordCheck();
                        }}
                      >
                        <label htmlFor="">Current Password</label>
                        <input
                          type="password"
                          className="outline-none border-b-2 border-primary w-full px-2 py-1 "
                          onChange={(e) => setCurrentPass(e.target.value)}
                        />
                        {cureentPassErr && (
                          <p className="text-red-800 my-4">
                            Your current password didn't match
                          </p>
                        )}
                        <input
                          type="submit"
                          value="Check Me !"
                          className="btn-secondary rounded-md mt-6 cursor-pointer"
                        />
                      </form>
                      {confirmpasswordsection && (
                        <form
                          action=""
                          className="my-6"
                          onSubmit={(e) => {
                            e.preventDefault();
                            changePassword();
                          }}
                        >
                          {newpasssuccess && (
                            <div className="my-4 bg-green-600 p-3 text-white rounded-md">
                              Password Updated Successfully !
                            </div>
                          )}
                          <label htmlFor="">New Password</label>
                          <input
                            type="password"
                            className="outline-none border-b-2 border-primary w-full px-2 py-1 "
                            onChange={(e) => setNewPass(e.target.value)}
                          />

                          <div className="my-4">
                            <label htmlFor="" className="mt-8">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              className="outline-none border-b-2 border-primary w-full px-2 py-1 "
                            />
                          </div>
                          <input
                            type="submit"
                            value={loading ? "LOADING..." : "UPDATE PASSWORD"}
                            className="btn-primary w-full cursor-pointer rounded mt-4"
                          />
                        </form>
                      )}
                    </div>
                  )}
                  <button
                    className="btn-primary my-4 rounded-md"
                    onClick={handleLogout}
                  >
                    {lang === "nep" ? "लग आउट" : "Logout"}
                  </button>
                </div>
              </div>
            </div>
            {/* pp update ends  */}
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <UpdateProfileForm handleModal={handleModal} />
      </Modal>
    </Page>
  );
}

export default Dashboard;
