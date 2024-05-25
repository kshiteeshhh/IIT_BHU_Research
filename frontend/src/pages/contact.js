import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import box from "../images/box.svg"
import mol4 from "../images/mol4.svg"
import mol5 from "../images/mol5.svg"
const Contact = () => {
    return (
        <div className="bg-[#000235]">
            <div className=" mx-auto w-[70%] ">
                <Navbar />
                <div className="w-[15rem] h-[15rem] flex-shrink-0 opacity-50 rounded-full bg-[#86CFD0] blur-[5rem] absolute left-[0.3rem] "></div>
                <img src={mol4} alt="" className="mt-[4rem] ml-[-12rem] absolute opacity-50"/>
                <div className="flex flex-col justify-center items-center align-middle my-12">
                    <div className="w-[26rem] ml-9 text-white font-[Outfit] text-[2.1rem] font-bold tracking-[1rem] mb-5 ">
                        CONTACT US
                    </div>

                    <div className="w-[68.563rem] h-[21rem] p-1 bg-gradient-to-r shadow-custom from-[#2F2B66] via-[#2F2B66] to-[#065CB8] rounded-[4rem]">
                        <div className="flex flex-row">
                            <img src={box} alt="" className="ml-3 mt-4" />
                            <div className="w-max-[17.375rem] mt-10  ml-5 text-white text-[0.938rem ]  font-extralight uppercase leading-7">
                                <p>"<span className="text-xl ">Contact Us</span> - Your thoughts count! Questions, suggestions, or<br /> a simple hello? We're all ears. Our team is ready to assist.<br /> Use the form or drop us an email. Your input shapes our service. Thanks for being with us!</p>
                            </div>
                            <div className="ml-[4rem] ">
                                <input type="text" name="" id=""  className=" rounded-md appearance-none border-none w-[24.938rem]  pl-3  h-[2.875rem] focus:outline-none focus:shadow-outline bg-zinc-300 mt-[3rem]" placeholder="NAME" />
                                <input type="text" name="" id="" className=" rounded-md  w-[24.938rem] mt-2 h-[2.875rem] appearance-none border-none focus:outline-none pl-3 focus:shadow-outline bg-zinc-300" placeholder="EMAIL" />
                                <textarea name="" id="" cols="30" rows="10" className="w-[24.938rem] h-[5.563rem] bg-zinc-300 pl-3 pt-7 mt-2 rounded-md  focus:outline-none focus:shadow-outline resize-none" placeholder="MESSAGE"></textarea>
                                <button
                                    type="button"
                                    className="text-white bg-[#000000] focus:outline-none font-medium rounded-full text-sm px-10 py-2.5 ml-[0.5rem] mt-1"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={mol5} alt="" className="ml-[60rem] bottom-[10rem] absolute" />
                <div className="w-[15rem] h-[15rem] flex-shrink-0 rounded-full bg-[#86CFD0] blur-[5rem] absolute right-[10rem] bottom-[5rem] opacity-50 "></div>
                <div className="w-[30rem] h-[0.1rem] mx-auto bg-gradient-to-l from-black to-black" />
                <Footer />
            </div>
        </div>

    );
};
export default Contact;
