import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import box from "../images/box.svg";
import mol4 from "../images/mol4.svg";
import mol5 from "../images/mol5.svg";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show l
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/send-email/`, {
                name,
                email,
                message
            });
            toast.success('Email sent successfully!');
            // Clear the form fields
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            console.error('There was an error sending the email!', error);
            toast.error('Failed to send email. Please try again later.');
        }
        finally {
            setLoading(false); // Hide loader
        }
    };

    return (
        <div className="bg-[#000235]">
            <div className="mx-auto w-full md:w-[85%] lg:w-[70%] px-4">
                <Navbar />
                <div className="w-[10rem] h-[10rem] md:w-[15rem] md:h-[15rem] flex-shrink-0 opacity-50 rounded-full bg-[#86CFD0] blur-[5rem] absolute left-[-1rem] md:left-[0.3rem]"></div>
                <img src={mol4} alt="" className="float mt-[2rem] md:mt-[4rem] ml-[-6rem] md:ml-[-12rem] absolute opacity-50" />
                <div className="flex flex-col justify-center items-center align-middle my-12">
                    <div className="w-full text-center md:w-[26rem] md:text-left ml-0 md:ml-9 text-white font-[Outfit] text-[1.5rem] md:text-[2.1rem] font-bold tracking-[0.5rem] md:tracking-[1rem] mb-5">
                        CONTACT US
                    </div>

                    <div className="w-full md:w-[68.563rem] h-auto md:h-[21rem] p-1 bg-gradient-to-r shadow-custom from-[#2F2B66] via-[#2F2B66] to-[#065CB8] rounded-[2rem] md:rounded-[4rem]">
                        <div className="flex flex-col md:flex-row">
                            <img src={box} alt="" className="ml-3 mt-4 self-center md:self-start" />
                            <div className="w-full md:w-max-[17.375rem] mt-6 md:mt-10 ml-0 md:ml-5 text-white text-[0.8rem] md:text-[0.938rem] font-extralight uppercase leading-6 md:leading-7 text-center md:text-left">
                                <p>
                                    "<span className="text-xl">Contact Us</span> - Your thoughts count! Questions, suggestions, or<br /> a simple hello? We're all ears. Our team is ready to assist.<br /> Use the form or drop us an email. Your input shapes our service. Thanks for being with us!"
                                </p>
                            </div>
                            <div className="ml-0 md:ml-[1rem] mt-6 md:mt-0">
                                <form onSubmit={handleSubmit}>
                                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-md appearance-none border-none w-full md:w-[24.938rem] pl-3 h-[2.875rem] focus:outline-none focus:shadow-outline bg-zinc-300 mt-2 md:mt-[3rem]" placeholder="NAME" />
                                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-md w-full md:w-[24.938rem] mt-2 h-[2.875rem] appearance-none border-none focus:outline-none pl-3 focus:shadow-outline bg-zinc-300" placeholder="EMAIL" />
                                    <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} cols="30" rows="10" className="w-full md:w-[24.938rem] h-[5.563rem] bg-zinc-300 pl-3 pt-7 mt-2 rounded-md focus:outline-none focus:shadow-outline resize-none" placeholder="MESSAGE"></textarea>
                                    <button type="submit" className="text-white bg-[#000000] focus:outline-none font-medium rounded-full text-sm px-10 py-2.5 mt-2 md:ml-[0.5rem] md:mt-1">Submit</button>
                                    {loading && <div className="loader1"></div>}
                                </form>
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>
                <img src={mol5} alt="" className="float ml-[30rem] md:ml-[60rem] bottom-[5rem] md:bottom-[10rem] absolute" />
                <div className="w-[10rem] h-[10rem] md:w-[15rem] md:h-[15rem] flex-shrink-0 rounded-full bg-[#86CFD0] blur-[5rem] absolute right-[2rem] md:right-[10rem] bottom-[2rem] md:bottom-[5rem] opacity-50"></div>
                <div className="w-full md:w-[30rem] h-[0.1rem] mx-auto bg-gradient-to-l from-black to-black" />
                <Footer />
            </div>
        </div>
    );
};

export default Contact;
