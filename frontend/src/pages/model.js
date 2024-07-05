import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "react-modal";
import axios from "axios";
import image from "../images/mol.svg"; // Adjust the path to your image
import image1 from "../images/mol3.svg"; // Adjust the path to your image
import image2 from "../images/mol2.svg"; // Adjust the path to your image
import '../App.css';
Modal.setAppElement("#root");

function Model() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState("");
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState(null);
  const [submitted, setSubmitted] = useState(false); // New state to track form submission
  const [loading, setLoading] = useState(false); 
  const openModal = (modalType) => {
    setCurrentModal(modalType);
    setModalIsOpen(true);
    setOutput(null); // Clear previous output when opening a new modal
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setUserInput("");
    setOutput(null);
    setSubmitted(false); // Reset submission state
  };

  const handleSubmit = () => {
    setSubmitted(true); // Set submission state
  };

  useEffect(() => {
    if (!submitted) return; // Exit if not submitted

    const fetchData = async () => {
      let url = "";
      switch (currentModal) {
        case "metallic":
          url = "http://127.0.0.1:8000/api/predict/metal_nonMetal/";
          break;
        case "thermodynamic":
          url = "http://127.0.0.1:8000/api/predict/thermodynamicStability/";
          break;
        case "bandgap":
          url = "http://127.0.0.1:8000/api/predict/bandGap/";
          break;
        default:
          break;
      }
      setLoading(true)
      try {
        const response = await axios.post(url, { user_formula: userInput });
        console.log('Response:', response.data);
        setOutput(response.data); // Set the output state with the response data
      } catch (error) {
        console.error("There was an error!", error);
        setOutput({ error: "There was an error processing your request." });
      }finally{
        setLoading(false)
      }
    };

    fetchData();
    setSubmitted(false); // Reset submitted state after fetching data
  }, [submitted, currentModal, userInput]); // Added userInput as dependency

  return (
    <div className="bg-[#000235] min-h-screen flex flex-col">
      <div className="flex-grow w-[70%] mx-auto">
        <Navbar />
        <div className="space-y-8 mt-10">
          <div
            className=" bg-gradient-to-l from-[#065CB8] to-[#2E2B66]  text-white p-8 rounded-md shadow-lg flex flex-col md:flex-row items-center cursor-pointer"
            onClick={() => openModal("metallic")}
          >
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Metallic Non-Metallic</h2>
              <p className="mb-4">
                This model uses properties A, B, and C to predict the metallic or non-metallic nature.
              </p>
              <div className="text-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Predict
                </button>
              </div>
            </div>
            <div className="md:w-1/3 md:ml-8 mt-4 md:mt-0">
              <img src={image} alt="Model Image" className="w-full h-auto" />
            </div>
          </div>

          <div
            className=" bg-gradient-to-l from-[#065CB8] to-[#2E2B66]  text-white p-8 rounded-md shadow-lg flex flex-col md:flex-row items-center cursor-pointer"
            onClick={() => openModal("thermodynamic")}
          >
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Thermodynamic Stability</h2>
              <p className="mb-4">
                This model uses properties X, Y, and Z to predict thermodynamic stability.
              </p>
              <div className="text-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Predict
                </button>
              </div>
            </div>
            <div className="md:w-1/3 md:ml-8 mt-4 md:mt-0">
              <img src={image1} alt="Model Image" className="w-full h-auto" />
            </div>
          </div>

          <div
            className=" bg-gradient-to-l from-[#065CB8] to-[#2E2B66]  text-white p-8 rounded-md shadow-lg flex flex-col md:flex-row items-center cursor-pointer"
            onClick={() => openModal("bandgap")}
          >
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Band Gap</h2>
              <p className="mb-4">
                This model uses properties 1, 2, and 3 to predict the band gap.
              </p>
              <div className="text-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Predict
                </button>
              </div>
            </div>
            <div className="md:w-1/3 md:ml-8 mt-4 md:mt-0">
              <img src={image2} alt="Model Image" className="w-full h-auto" />
            </div>
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Input Modal"
          className="bg-white rounded-lg shadow-lg p-8 mx-auto mt-20 max-w-3xl"
          overlayClassName="bg-black bg-opacity-50 fixed inset-0"
        >
          <h2 className="text-3xl font-bold mb-4 text-center">
            {currentModal === "metallic" && "Metallic Non-Metallic"}
            {currentModal === "thermodynamic" && "Thermodynamic Stability"}
            {currentModal === "bandgap" && "Band Gap"}
          </h2>
          <p className="mb-4 text-gray-700">
            {currentModal === "metallic" && "Description for Metallic Non-Metallic model."}
            {currentModal === "thermodynamic" && "Description for Thermodynamic Stability model."}
            {currentModal === "bandgap" && "Description for Band Gap model."}
          </p>
          <p className="mb-4 text-gray-700">
            {currentModal === "metallic" && "This model uses properties A, B, and C to predict the metallic or non-metallic nature."}
            {currentModal === "thermodynamic" && "This model uses properties X, Y, and Z to predict thermodynamic stability."}
            {currentModal === "bandgap" && "This model uses properties 1, 2, and 3 to predict the band gap."}
          </p>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter formula"
            className="border border-gray-300 p-2 w-full mb-4"
          />
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
            {loading && <div className="loader  ml-[-10%] mt-[-4.5%]"></div>}
            <button
              onClick={closeModal}
              className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
          {output && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="text-xl font-bold mb-2">Output:</h3>
              <pre className="whitespace-pre-wrap break-all text-gray-700">
                {output.Value ? output.Value : JSON.stringify(output, null, 2)}
              </pre>
            </div>
          )}
        </Modal>
      </div>
      <Footer />
    </div>
  );
}

export default Model;
