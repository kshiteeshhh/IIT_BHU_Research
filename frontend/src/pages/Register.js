import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import emailsvg from "../images/email.svg";
import mol2 from "../images/mol2.svg";
import mol3 from "../images/mol3.svg";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import '../App.css'

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const url=process.env.REACT_APP_BASE_URL
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/api/register/`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
      });
      if (response) {
        enqueueSnackbar("Registered successfully", { variant: "success" });
        navigate("/login");
      }
    } catch (error) {
      console.error("There was an error registering!", error);
      enqueueSnackbar("Registration failed. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <div className="bg-[#000235]">
      <div className="relative w-[70%] mx-auto">
        <Navbar />
        <img src={mol2} alt="" className="float mt-[4rem] ml-10 absolute" />
        <div className="w-[15rem] h-[15rem] flex-shrink-0 opacity-50 rounded-full bg-[#86CFD0] blur-[5rem] absolute left-[-2rem]"></div>
        <div className="flex flex-col justify-center items-center align-middle my-12">
          <div className="w-[22rem] ml-9 text-white font-[Outfit] text-[2.1rem] font-bold tracking-[0.5rem] mb-9">
            JOIN US NOW!
          </div>
          <form
            onSubmit={handleSubmit}
            className="shadow-custom w-[32rem] h-[32rem] p-1 bg-gradient-to-r from-[#2F2B66] via-[#2F2B66] to-[#065CB8] rounded-xl flex flex-col justify-start items-center"
          >
            <p className="text-white font-[Outfit] text-[3.125rem] font-bold tracking-[0.3125rem] my-9">
              SIGN UP
            </p>
            <div className="flex justify-between w-[26rem] mb-4">
              <div className="flex items-center bg-[white] h-[3rem] w-[12rem] p-2 rounded-md">
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full sm:text-sm rounded-md pl-3 focus:outline-none"
                  placeholder="FIRST NAME"
                  required
                />
              </div>
              <div className="flex items-center bg-[white] h-[3rem] w-[13rem] p-2 rounded-md">
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full sm:text-sm rounded-md pl-3 focus:outline-none"
                  placeholder="LAST NAME"
                  required
                />
              </div>
            </div>
            <div className="flex items-center bg-[white] h-[3rem] w-[26rem] p-2 rounded-md mb-4">
              <img
                src={emailsvg}
                alt="Email Icon"
                className=" w-8 h-6 ml-[-0.14rem] text-gray-500 opacity-50"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full sm:text-sm rounded-md pl-3 focus:outline-none"
                placeholder="EMAIL"
                required
              />
            </div>
            <div className="flex items-center bg-[white] h-[3rem] w-[26rem] p-2 rounded-md mb-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full sm:text-sm rounded-md pl-3 focus:outline-none"
                placeholder="USERNAME"
                required
              />
            </div>
            <div className="flex items-center bg-[white] h-[3rem] w-[26rem] p-2 rounded-md mb-4">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full sm:text-sm rounded-md pl-3 focus:outline-none"
                placeholder="CREATE PASSWORD"
                required
              />
            </div>
            <div className="flex items-center bg-[white] h-[3rem] w-[26rem] p-2 rounded-md mb-4">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full sm:text-sm rounded-md pl-3 focus:outline-none"
                placeholder="CONFIRM PASSWORD"
                required
              />
            </div>
            <button
              type="submit"
              className="w-[20rem] h-[4rem] rounded-full bg-[#000] my-5 text-[white] font-[Outfit] tracking-[0.3125rem]"
            >
              SUBMIT
            </button>
          </form>
        </div>
        <img src={mol3} alt="" className="float ml-[55rem] bottom-[20rem] absolute" />
        <div className="w-[15rem] h-[15rem] flex-shrink-0 rounded-full opacity-50 bg-[#86CFD0] blur-[5rem] absolute right-0 bottom-[15rem]"></div>
        <div className="w-[30rem] h-[0.1rem] mx-auto bg-gradient-to-l from-black to-black" />
        <Footer />
      </div>
    </div>
  );
};

export default Register;
