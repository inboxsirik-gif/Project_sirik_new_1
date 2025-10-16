import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Loader } from '../components/Loader';
import { motion } from "framer-motion";

import AlertModal from '../components/AlertModal'

const FormSchema = z.object({
  Name: z.string().min(1, "Name is required"),
  EmailID: z.string().email({ message: "Invalid email address." }),
  Phone: z.string().min(10, "Phone is required"),
  Message: z.string().min(1, "Message is required"),
  PrivacyAgreed: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the Privacy Policy." }),
  }),
});

const ContactForm = () => {
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const maxChars = 500;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (customer_data) => {
    const payload = {
      access_key: "12004621-0bf6-40d5-a190-2f11fd4f32c1",
      Name: customer_data.Name,
      Email: customer_data.EmailID,
      Phone: customer_data.Phone,
      Subject: "Contact Form",
      Message: customer_data.Message,
    };

    try {
      setLoader(true);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        setShowModal(true);
        reset();
        setMessage("");
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      alert("Something went wrong while sending the message.");
    } finally {
      setLoader(false);
    }
  };

  const [showcartalert,setcartalert] = useState(false)
  const onClose = ()=>{
    setcartalert(false)
  }
  const show = ()=>{
    setcartalert(true)
  }

  return (
    <>

     {
      showcartalert && <AlertModal onClose={onClose}/>
    }
      <div className="absolute top-0 z-50 w-full">
       <Header show={show}/>
      </div>

      <div className="bg-gradient-to-br pt-15 from-[#0F0F1C] to-[#1F1147]">
        <div className="min-h-screen cursor-default container mx-auto text-white flex flex-col md:flex-row items-center justify-center px-6 py-16">
          {/* Left Section */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <span className="text-sm bg-[#FE5E33] px-4 py-1 rounded-full mb-2 inline-block">
              Contact Us
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "quincycf, sans-serif" }}
            >
              Let’s Get In Touch.
            </h1>
            <p className="text-lg">
              Or just reach out manually to{" "}
              <a
                href="mailto:team@sirikbeverages.com"
                className="text-[#a589f5] underline"
              >
                team@sirikbeverages.com
              </a>
            </p>
          </div>

          {/* Right Section - Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:w-1/2 space-y-5 w-full max-w-xl"
          >
            {/* Full Name */}
            <div className="bg-[#ffffff] rounded-xl px-5 py-4 flex items-center">
              <FaUser className="text-[#949494] mr-3" />
              <input
                type="text"
                placeholder="Enter your full name..."
                className="bg-transparent outline-none w-full text-black"
                {...register("Name")}
              />
            </div>
            {errors.Name && (
              <p className="text-sm text-red-400 -mt-3 ml-2">{errors.Name.message}</p>
            )}

            {/* Email */}
            <div className="bg-[#ffffff] rounded-xl px-5 py-4 flex items-center">
              <FaEnvelope className="text-[#949494] mr-3" />
              <input
                type="email"
                placeholder="Enter your email address..."
                className="bg-transparent outline-none w-full text-black"
                {...register("EmailID")}
              />
            </div>
            {errors.EmailID && (
              <p className="text-sm text-red-400 -mt-3 ml-2">{errors.EmailID.message}</p>
            )}

            {/* Phone */}
            <div className="bg-[#ffffff] rounded-xl px-5 py-4 flex items-center">
              <FaPhone className="text-[#949494] mr-3" />
              <input
                type="tel"
                placeholder="+91 000 000 0000"
                className="bg-transparent outline-none w-full text-black"
                {...register("Phone")}
                maxLength={10}
              />
            </div>
            {errors.Phone && (
              <p className="text-sm text-red-400 -mt-3 ml-2">{errors.Phone.message}</p>
            )}

            {/* Message */}
            <div className="bg-[#ffffff] rounded-xl p-4">
              <textarea
                rows="4"
                maxLength={maxChars}
                placeholder="Enter your main text here..."
                className="bg-transparent outline-none w-full resize-none text-black"
                {...register("Message")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="text-right text-sm text-gray-400">
                {message.length}/{maxChars}
              </div>
            </div>
            {errors.Message && (
              <p className="text-sm text-red-400 -mt-3 ml-2">{errors.Message.message}</p>
            )}

            {/* Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="accent-[#a589f5]"
                {...register("PrivacyAgreed")}
              />
              <label className="text-sm">
                I hereby agree to our{" "}
                <span className="underline text-[#a589f5] cursor-pointer">
                  Privacy Policy
                </span>{" "}
                terms.
              </label>
            </div>
            {errors.PrivacyAgreed && (
              <p className="text-sm text-red-400 -mt-3 ml-2">
                {errors.PrivacyAgreed.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#7A5CFA] hover:bg-[#694ae0] transition-all duration-200 text-white font-semibold py-5 px-6 rounded-xl cursor-pointer w-full flex items-center justify-center gap-2"
            >
              Submit Form →
            </button>
          </form>
        </div>
      </div>

      <div className="w-full bg-gradient-to-br from-[#0F0F1C] to-[#1F1147]">
        <Footer />
      </div>

      {loader && <Loader />}

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-center max-w-sm w-full mx-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Thank You!</h2>
            <p className="text-gray-600 mb-4">
              Your form has been submitted. We will contact you soon.
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/");
              }}
              className="bg-[#7A5CFA] cursor-pointer hover:bg-[#694ae0] text-white px-6 py-2 rounded-lg"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm;
