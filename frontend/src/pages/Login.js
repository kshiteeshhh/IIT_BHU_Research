import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import mol2 from "../images/mol2.svg";
import mol4 from "../images/mol4.svg";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username: formData.username,
        password: formData.password,
      });
      if (response) {
        enqueueSnackbar("Logged in successfully", { variant: "success" });
        navigate("/");
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      enqueueSnackbar("login failed failed. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <div className="bg-[#000235]">
      <div className="relative mx-auto w-[70%]">
        <Navbar />
        <img src={mol2} alt="" className="mt-[4rem] ml-10 absolute" />
        <div className="w-[15rem] h-[15rem] flex-shrink-0 rounded-full opacity-50 bg-[#86CFD0] blur-[5rem] absolute left-[-2rem]"></div>
        <div className="flex flex-col justify-center items-center align-middle my-12">
          <div className="w-[26rem] ml-9 text-white font-[Outfit] text-[2.1rem] font-bold tracking-[0.5rem] mb-9">
            WELCOME BACK!
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-[32rem] h-[25rem] shadow-custom p-1 bg-gradient-to-r from-[#2F2B66] via-[#2F2B66] to-[#065CB8] rounded-xl flex flex-col justify-start items-center"
          >
            <p className="text-white font-[Outfit] text-[3.125rem] font-bold tracking-[0.3125rem] my-9">
              LOGIN
            </p>
            <div className="flex items-center bg-[white] h-[3rem] w-[80%] p-2 rounded-md mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
              >
                <g opacity="0.5">
                  <path
                    d="M11.557 8.88639C13.3042 8.12682 14.519 6.64721 14.519 4.92476C14.519 2.43427 12.0304 0.418152 8.95362 0.418152C5.88728 0.418152 3.39871 2.43427 3.39871 4.92476C3.39871 6.64721 4.60992 8.12964 6.35714 8.88639C2.8453 9.78715 0.287109 12.4668 0.287109 15.5955V19.1477H17.6305V15.5955C17.6305 12.4668 15.0723 9.78715 11.557 8.88639Z"
                    fill="black"
                  />
                </g>
              </svg>
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
            <div className="flex items-center bg-[white] h-[3rem] w-[80%] p-2 rounded-md mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <g opacity="0.5">
                  <path
                    d="M19.1716 7.78091H17.5914V6.17139C17.5914 3.20087 14.6086 0.786621 10.9506 0.786621C7.28908 0.786621 4.31672 3.20087 4.31672 6.17139V7.78091H2.72612C1.48706 7.78091 0.467285 8.60261 0.467285 9.60785V20.0837C0.467285 21.1087 1.48706 21.9332 2.72612 21.9332H19.1751C20.435 21.9332 21.4583 21.1087 21.4583 20.0837V9.60785C21.4548 8.60261 20.4315 7.78091 19.1716 7.78091ZM7.31693 6.16859C7.31693 4.54497 8.94232 3.21784 10.9506 3.21784C12.9554 3.21784 14.5808 4.54497 14.5808 6.16859V7.77807H7.31693V6.16859ZM12.1723 17.0906V19.7618C12.1723 19.8804 12.0574 19.9594 11.9182 19.9594H10.338C10.2162 19.9594 10.0979 19.8804 10.0979 19.7618V17.0906C9.01543 16.7489 8.24274 15.9018 8.24274 14.8994C8.24274 13.6062 9.53749 12.5501 11.142 12.5501C12.7361 12.5501 14.0378 13.6062 14.0378 14.8994C14.0378 15.9018 13.2547 16.7489 12.1723 17.0906Z"
                    fill="black"
                  />
                </g>
              </svg>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full sm:text-sm rounded-md pl-3 focus:outline-none"
                placeholder="PASSWORD"
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
        <img src={mol4} alt="" className="ml-[55rem] bottom-[20rem] absolute" />
        <div className="w-[15rem] h-[15rem] flex-shrink-0 opacity-50 rounded-full bg-[#86CFD0] blur-[5rem] absolute right-0 bottom-[15rem]"></div>
        <div className="w-[30rem] h-[0.1rem] mx-auto bg-gradient-to-l from-black to-black" />
        <Footer />
      </div>
    </div>
  );
};

export default Login;
