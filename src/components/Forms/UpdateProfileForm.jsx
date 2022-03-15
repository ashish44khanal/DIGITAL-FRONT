import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function UpdateProfileForm({ handleModal }) {
  const { user_id } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [age, setAge] = useState("");
  const [district, setDistrict] = useState("");
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const districts = [
    "achham",
    "arghakhanchi",
    "baglung",
    "baitadi",
    "bajhang",
    "bajura",
    "banke",
    "bara",
    "bardiya",
    "bhaktapur",
    "bhojpur",
    "chitwan",
    "dadeldhura",
    "dailekh",
    "dang deukhuri",
    "darchula",
    "dhading",
    "dhankuta",
    "dhanusa",
    "dholkha",
    "dolpa",
    "doti",
    "gorkha",
    "gulmi",
    "humla",
    "ilam",
    "jajarkot",
    "jhapa",
    "jumla",
    "kailali",
    "kalikot",
    "kanchanpur",
    "kapilvastu",
    "kaski",
    "kathmandu",
    "kavrepalanchok",
    "khotang",
    "lalitpur",
    "lamjung",
    "mahottari",
    "makwanpur",
    "manang",
    "morang",
    "mugu",
    "mustang",
    "myagdi",
    "nawalparasi",
    "nuwakot",
    "okhaldhunga",
    "palpa",
    "panchthar",
    "parbat",
    "parsa",
    "pyuthan",
    "ramechhap",
    "rasuwa",
    "rautahat",
    "rolpa",
    "rukum",
    "rupandehi",
    "salyan",
    "sankhuwasabha",
    "saptari",
    "sarlahi",
    "sindhuli",
    "sindhupalchok",
    "siraha",
    "solukhumbu",
    "sunsari",
    "surkhet",
    "syangja",
    "tanahu",
    "taplejung",
    "terhathum",
    "udayapur",
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios
        .put(`${process.env.REACT_APP_URL}/demographics/${id}`, {
          gender: data.gender,
          age: age,
          district: district,
        })
        .then((res) => {
          setAge("");
          setDistrict("");
          reset();
          setLoading(false);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 2000);
        });
    } catch (error) {}
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        await axios
          .get(`${process.env.REACT_APP_URL}/demographics/user/${user_id}`)
          .then((res) => {
            setId(res.data[0]?.id);
            setAge(res.data[0]?.age);
            setDistrict(res.data[0]?.district);
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [user_id]);
  return (
    <div>
      {success && (
        <div className="bg-green-500 px-4 p-2 text-white rounded-md ">
          Your profile updated successfully
        </div>
      )}
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="my-4 lg:w-96"
      >
        <div className="flex flex-col space-y-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name=""
            id="username"
            value={age}
            className="input_txt rounded-md shadow-lg"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="phone">Phone no.</label>
          <input
            type="text"
            name=""
            id="phone"
            value={age}
            className="input_txt rounded-md shadow-lg"
            onChange={(e) => setPhone(e.target.value)}
          />

          <label htmlFor="Age">Age</label>
          <input
            type="text"
            name=""
            id="Age"
            value={age}
            className="input_txt rounded-md shadow-lg"
            onChange={(e) => setAge(e.target.value)}
          />

          <label htmlFor="district">District</label>
          <input
            type="text"
            name=""
            list="districts"
            id="district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="input_txt rounded-md shadow-lg"
          />
          <datalist id="districts">
            {districts.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </datalist>

          <label htmlFor="gender">Gender</label>
          <select
            {...register("gender", { required: true })}
            id="gender"
            className="input_txt rounded-md shadow-lg"
          >
            <option value="">--Choose Gender--</option>

            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">other</option>
          </select>

          {errors.gender && (
            <small className="text-red-500 mt-2 animate-bounce">
              Gender is required.
            </small>
          )}
        </div>
        <div className="flex items-center space-x-4 my-8">
          <input
            type="submit"
            className="btn-primary cursor-pointer rounded-md"
            value={loading ? "LOADING...." : "UPDATE"}
          />
          <button
            className="btn-secondary cursor-pointer rounded-md"
            onClick={() => {
              handleModal();
            }}
          >
            {" "}
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfileForm;
