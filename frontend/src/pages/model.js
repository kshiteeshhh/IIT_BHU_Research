import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "react-modal";
import axios from "axios";
import image from "../images/mol.svg"; // Adjust the path to your image
import image1 from "../images/mol3.svg"; // Adjust the path to your image
import image2 from "../images/mol2.svg"; // Adjust the path to your image
import thermodynamic from "../images/thermodynaimic.png"
import metallic from "../images/metal.png"
import bandGap from "../images/bandgap.png"
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
    const url1=process.env.REACT_APP_BASE_URL
    const fetchData = async () => {
      let url = "";
      switch (currentModal) {
        case "metallic":
          url = `${url1}/api/predict/metal_nonMetal/`;
          break;
        case "thermodynamic":
          url = `${url1}/api/predict/thermodynamicStability/`;
          break;
        case "bandgap":
          url = `${url1}/api/predict/bandGap/`;
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
      } finally {
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
                <button className="bg-blue-500 text-white px-4 py-2 mt-10 rounded-md">
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
                <button className="bg-blue-500 text-white px-4 py-2  mt-10 rounded-md">
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
                <button className="bg-blue-500  mt-10 text-white px-4 py-2 rounded-md">
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
          className="bg-white rounded-lg shadow-lg p-8 mx-auto mt-20 max-w-5xl max-h-[80vh] overflow-y-auto"
          overlayClassName="bg-black bg-opacity-50 fixed inset-0"
        >
          <h2 className="text-3xl font-bold mb-4 text-center">
            {currentModal === "metallic" && "Metallic Non-Metallic"}
            {currentModal === "thermodynamic" && "Thermodynamic Stability"}
            {currentModal === "bandgap" && "Band Gap"}
          </h2>
          <p className="mb-4 text-gray-700">
            {currentModal === "metallic" && <><b>Description for Metallic Non-Metallic model.</b></>}
            {currentModal === "thermodynamic" && <><b>Description for Thermodynamic Stability model.</b></>}
            {currentModal === "bandgap" && <><b>Description for Band Gap model.</b></>}
          </p>

          <p className="mb-4 text-gray-700">
            {currentModal === "metallic" && (<>
              "This project focuses on predicting the metallicity of chemical formulas using advanced machine learning techniques. Initially, data was gathered from The Materials Project database through an API, collecting a comprehensive set of 153,000 material formulas. This raw data underwent rigorous preprocessing to ensure quality and consistency, which involved removing missing and duplicate entries, resulting in a refined dataset of 104,038 unique formulas.

              To transform these chemical formulas into a format suitable for machine learning, the MAGPIE scheme of Composition Based Feature Vector (CBFV) technique was employed. This method converted each formula into a vector of 154 features, capturing essential properties and characteristics.

              For the model development phase, a Random Forest Classifier was chosen due to its robustness and ability to handle high-dimensional data effectively. The dataset was split into training, testing, and validation subsets. The model was trained on the training data and achieved an accuracy of 85.4% on the validation set and 85.42% on the test set, demonstrating its effectiveness.

              Once the model was developed, it was used to predict the metallicity of new chemical formulas. This process involved loading the trained model, generating features from the new formulas, scaling and normalizing them, and then making predictions.

              Additionally, the project included a script file that facilitates user interaction. The script allows users to input a chemical formula and obtain a prediction regarding its metallicity. The prediction process includes loading the pre-trained model, generating features, scaling and normalizing them, and finally predicting whether the formula is metallic or non-metallic.

              Overall, this project showcases the integration of machine learning techniques in materials science, providing a reliable method for predicting the metallicity of various chemical formulas. The data and models used in this project are available for further research and development, enhancing the field's capabilities."
              <img src={metallic} alt="" />
            </>)}
            {currentModal === "thermodynamic" && (
              <>
                We predict the thermodynamic stability of 2D materials by estimating two key properties: Energy above Convex Hull and Formation Energy. Using the Energy above Convex Hull Model, we first train on C2DB data for non-magnetic compounds, featuring formula featurization and selection, followed by training an ExtraTreesRegressor. In the prediction phase, new formulas undergo a similar process to predict the Ehull value. For the Formation Energy Model, we employ a more complex training phase, involving hyperparameter tuning and stacking multiple regressors, with Ridge as the final estimator. The prediction phase also includes formula featurization and model prediction to estimate Hform. Based on the predicted values of Hform and Ehull, we categorize the stability into three levels: low, medium, or high.
                <img src={thermodynamic} alt="Thermodynamic Stability" />
              </>
            )}
            {currentModal === "bandgap" && <>The project aimed at predicting the band gap of 2D materials for semiconducting applications used various machine learning and deep learning models. Among the models tested, the Extra Tree Regressor performed the best in terms of accuracy. This model was developed using the MAGPIE featurization technique, which transformed the chemical formulas into a vector of 154 features.

              The Extra Tree Regressor achieved the lowest Mean Squared Error (MSE) of 0.3295 and the highest R-squared value of 0.8019, indicating its superior performance in predicting the band gap. The data used for training this model was extracted from databases like C2DB and The Materials Project, with careful handling of missing values and duplicates to ensure data quality.

              Featurization was performed using methods such as MAGPIE, mat2vec, and Jarvis, but MAGPIE was chosen for its effectiveness and manageability. The Extra Tree Regressor's robustness and ability to handle high-dimensional data made it the best choice for this task, providing reliable predictions for new chemical formulas.
              <img src={bandGap} alt="" loading="lazy"/></>}
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
            <div className="relative">

            {loading && <div className=" absolute loader left-[-7rem] top-[0.5rem] ml-[-50%] mt-[-4.5%]"></div>}
            </div>
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
