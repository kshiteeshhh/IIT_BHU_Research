import React from "react";

const Footer = () => {
  return (
    <div className="">
    
    <div className="flex bg-[#000235] text-white justify-evenly p-5 mt-10">
    
    <div>
      <p className="font-outfit font-bold">MAT2Pred</p>
      <div></div>
    </div>
    <div>
      <p className="font-outfit font-bold">NAME</p>
      <div className="flex flex-col font-outfit font-light mt-2 text-base opacity-75">
        <p>Name</p>
        <p>About</p>
        <p>Docs</p>
        <p>Models</p>
      </div>
    </div>
    <div>
      <p className="font-outfit font-bold text-base">IEEE</p>
      <div className="flex flex-col font-outfit text-base font-light mt-2 opacity-75">
        <p>Browse IEEE</p>
        <p>Research</p>
        <p>Paper</p>
      </div>
    </div>
    <div>
      <p className="font-outfit font-bold text-base">CONTACT</p>
      <div className="flex flex-col font-outfit text-base font-light mt-2 opacity-75">
        <p>Email</p>
        <p>LinkedIn</p>
        <p>Instagram</p>
        <p>Twitter</p>
      </div>
    </div>
    <div className="flex flex-col justify-evenly">
      <p className="font-outfit font-bold text-2xl mx-auto">
        Join Our Newsletter
      </p>
      <div>
        <div className="w-[18rem] h-[2.5rem] bg-[#1D1A51] rounded-[34px] relative">
          {/* <div className="EmailAddress font-outfit w-15 text-stone-50 text-opacity-70 text-base font-xs  leading-loose absolute top-1.5 left-3">
              
            Email Address
          </div> */}
          <input type="text" className="bg-[#1D1A51] mt-2 ml-2 appearance-none border-none focus:outline-none focus:shadow-outline" placeholder="Email Address" />
          <button
            type="button"
            className="text-white bg-[#065CB8] focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-cente absolute right-0"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
    
  );
};

export default Footer;
