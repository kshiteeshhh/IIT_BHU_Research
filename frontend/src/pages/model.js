import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Model() {
  return (
    <div className="bg-[#000235]">
      <div className="relative w-[70%] mx-auto">
        <Navbar />
        <div className="h-[100px] text-white">JAI SHREE RAM</div>
        <Footer />
      </div>
    </div>
  );
}

export default Model;
