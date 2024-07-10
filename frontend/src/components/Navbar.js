import React from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleNavigate = (pageName) => {
    navigate(`/${pageName}`);
  };
  return (
    <div className="bg-[#000235]  text-[#ffffff] flex justify-between px-5 py-3 font-outfit pt-2">
      <div className="w-1/2">
        <h2 className=" font-bold text-lg">MAT2Pred</h2>
      </div>
      <div className="flex justify-evenly w-1/2 text-sm">
        <button onClick={() => handleNavigate("")}>HOME</button>
        <button onClick={() => handleNavigate("model")}>MODEL</button>
        <button onClick={() => handleNavigate("contact")}>CONTACT</button>
        <button onClick={() => handleNavigate("register")}>SIGN UP</button>
        <button onClick={() => handleNavigate("login")}>LOGIN</button>
      </div>
    </div>
  );
};

export default Navbar;
