import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Accuracy from "../images/Accuracy.svg";
import Vector from "../images/Vector.svg";
import Results from "../images/Results.svg";
import mol from "../images/mol.svg";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import "../App.css";

import { useNavigate } from "react-router-dom";
const Landing = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleNavigate = (pageName) => {
    if (pageName === "model" && !sessionStorage.getItem("LoggedInUser")) {
      enqueueSnackbar("Please login first to use the services", {
        variant: "error",
      });
      return;
    }
    navigate(`/${pageName}`);
  };

  const location = useLocation();
  const isAuthenticated = location.state?.isAuthenticated || false;

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated");
      // Perform any additional side effects or actions here
    } else {
      console.log("User is not authenticated");
      // Perform any additional side effects or actions here
    }
  }, [isAuthenticated]);
  return (
    <>
      <div className="bg-[#000235]">
        <div className="mx-auto w-[70%] bg-[#000235] h-[5rem]">
          <Navbar />
        </div>
        <div className="flex justify-center h-[40rem] pt-5 ml-4">
          <div className="flex w-[90rem]">
            <div className="flex w-[50rem] flex-col pl-28">
              <div className="w-[40rem] text-white font-outfit text-5xl font-bold leading-[3rem] mb-2 ml-[5.5rem]">
                <p>From Carbon To</p>
                <p>Clarity:Our</p>
                <p>Model Sees The</p>
                <p>Glass Future</p>
              </div>
              <div className="w-[23rem] ml-[5.5rem]">
                <p className="text-white font-outfit text-xl font-normal leading-[2rem] mb-4 tracking-tight">
                  Our Model predicts carbon-to-glass transformation
                  possibilities in semiconductors, unraveling material mysteries
                  with precision, reshaping the landscape of innovation
                </p>
              </div>
              <div className="text-white flex justify-start mt-8">
                {/* <button
                  className="rounded-full bg-[#065CB8] ml-[5.5rem] h-[4rem] w-[11rem] mr-4"
                  onClick={() => handleNavigate("login")}
                >
                  LOGIN
                </button> */}

                <button
                  className="rounded-full border border-[#86CFD0] h-[4rem] w-[11rem] ml-[11%] hover:border-[#5b9fa1] hover:bg-[#001535fe]"
                  onClick={() => handleNavigate("model")}
                >
                  See Our Model
                </button>
              </div>
            </div>
            <div className="w-[30rem] pr-12">
              <div className="w-[32rem] h-[20rem] flex-shrink-0 rounded-full bg-[#86CFD0] blur-[5rem] absolute left-[50rem] opacity-25"></div>
              <img
                className=" float w-[60rem] h-[25rem]"
                src={mol}
                alt="molecule"
              />
            </div>
          </div>
        </div>
        <div className="mt-[2rem] mb-[7rem]">
          <div className="flex flex-col w-[65rem] mx-auto ">
            <p className="text-white font-inter text-lg font-semibold tracking-widest p-3">
              FEATURES
            </p>
            <div className="rounded-lg bg-[#065cb8] bg-opacity-60 flex  h-[5rem] justify-around p-2">
              <div className="flex">
                <img
                  className="w-[4rem] h-[4rem]"
                  src={Accuracy}
                  alt="accuracy"
                />
                <p class="text-gray-300 font-inter text-4xl font-semibold leading-normal tracking-wider">
                  90%
                </p>
              </div>
              <div className="flex">
                <img className="w-[4rem] h-[4rem]" src={Vector} alt="vector" />
                <p class="text-gray-300 font-inter text-4xl font-semibold leading-normal tracking-wider">
                  100+
                </p>
              </div>
              <div className="flex">
                <p className="text-gray-300 font-inter text-4xl font-semibold leading-normal tracking-wider">
                  IEEE
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-[50rem] h-[50rem] ml-[3.3rem] pl-28">
            <img src={Results} alt="results " className="relative" />
            {/* <img src={big_mol} alt="results" className=" absolute bottom-[-34.5rem] left-[36rem] w-[16rem] " /> */}
          </div>
          <div className="flex flex-col align-middle ml-[1.2rem] pr-20">
            <p className="text-white text-center font-outfit text-5xl w-[30rem] font-bold uppercase leading-tight pt-40">
              NOW PREDICT RESULT MUCH FASTER
            </p>
            <p className="text-white text-center font-outfit text-xl leading-normal w-[18rem] mx-auto">
              have a better understanding of how our models performs
            </p>
            <button className="rounded-full hover:bg-[#067ab8] bg-[#065CB8] h-[7rem] w-[19rem] text-bold text-white font-outfit text-xl mx-auto mt-8">
              <p className=" tracking-[0.5rem]">CHECK PAST</p>
              <p className=" tracking-[0.5rem]">RESULTS</p>
            </button>
          </div>
        </div>
        <div className="flex justify-center p-2 mb-5">
          <div className="w-[65rem] h-[25rem] bg-gradient-to-l from-[#065CB8] to-[#2E2B66] rounded-[2rem] flex flex-col justify-evenly shadow-custom">
            <div className="flex flex-col items-center justify-center">
              <h4 className="text-[#000] font-outfit text-[1.3rem] font-semibold tracking-[2.3px] mx-auto">
                are you ready?
              </h4>
              <div className="text-white font-outfit text-[2.2rem] font-bold capitalize mx-aut">
                <p>Be A Part Of The</p>
                <p>Next Big Thing</p>
              </div>
            </div>
            <button
              type="button"
              className="text-white hover:bg-[#001535fe] bg-[#000] focus:outline-none rounded-full text-sm
            text-center font-outfit font-bold tracking-[3.4px] uppercase w-[11rem] h-[3rem] mx-auto"
            >
              GET STARTED
            </button>
          </div>
        </div>
        <div className="my-20">
          {/* <div className="Seperation2 h-1 w-[40rem] bg-gradient-to-r from-black to-transparent mx-auto"></div> */}
          <div className="w-[30rem] h-[0.1rem] mx-auto bg-gradient-to-l from-black to-black" />
        </div>
        <div className="w-[70rem] mx-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Landing;
