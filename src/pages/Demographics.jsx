import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import Page from "../templates/Page";

function Demographics() {
  const { user_id } = useParams();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const district = [
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
        .post(`${process.env.REACT_APP_URL}/demographics`, {
          user_sub_id: `${user_id}`,
          gender: `${data.gender}`,
          age: `${data.age}`,
          district: `${data.district}`,
          registration_date: `${new Date().toDateString()}`,
        })
        .then((res) => {
          setLoading(false);
          history.push("/dashboard");
        });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        reset();
        setSuccess(false);
        setLoading(false);
      }
    }
  };

  return (
    <Page>
      <div className="container mx-auto px-4 lg:px-8">
        <h3 className="text-center">Additional Info</h3>
        <hr />
        <div className="flex justify-center p-2">
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
                className="input_txt rounded-md shadow-lg"
                {...register("username", { required: true })}
              />
              {errors.age && (
                <small className="text-red-500 mt-2 animate-bounce">
                  Username is required.
                </small>
              )}

              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name=""
                id="phone"
                className="input_txt rounded-md shadow-lg"
                {...register("phone", { required: true })}
              />
              {errors.age && (
                <small className="text-red-500 mt-2 animate-bounce">
                  phone no is required.
                </small>
              )}

              <label htmlFor="Age">Age</label>
              <input
                type="text"
                name=""
                id="Age"
                className="input_txt rounded-md shadow-lg"
                {...register("age", { required: true })}
              />
              {errors.age && (
                <small className="text-red-500 mt-2 animate-bounce">
                  age is required.
                </small>
              )}
              <label htmlFor="district">District</label>
              <input
                type="text"
                name=""
                list="districts"
                id="district"
                className="input_txt rounded-md shadow-lg"
                {...register("district", { required: true })}
              />
              <datalist id="districts">
                {district.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </datalist>

              {errors.district && (
                <small className="text-red-500 mt-2 animate-bounce">
                  District is required.
                </small>
              )}

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
            <input
              type="submit"
              className="btn-primary cursor-pointer  mt-8 w-full rounded-md"
              value={loading ? "LOADING...." : "SUBMIT & START LEARNING"}
            />
          </form>
        </div>
      </div>
    </Page>
  );
}

export default Demographics;
