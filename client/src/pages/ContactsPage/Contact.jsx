import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import bg from "../../assets/backgrounds/bg_2.jpg.webp";

export const Contact = () => {
  let { contactMessages } = useSelector((state) => state.mainSlice);
  const dispatch = useDispatch();
  const [contactForm, setContactForm] = useState({
    contactName: "",
    contactEmail: "",
    subject: "",
    contactMessage: "",
  });

  const clearContactForm = () => {
    setContactForm({
      contactName: "",
      contactEmail: "",
      subject: "",
      contactMessage: "",
    });
  };

  const getFormValues = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    let res = await axios.post("http://localhost:1289/userRequests", {
      ...contactForm,
    });
    clearContactForm();
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${bg})`,
  };

  return (
    <>
      <input
        type="checkbox"
        className="absolute top-[-430430px]"
        autoFocus={true}
      />
      <main
        style={backgroundImageStyle}
        className="bg-center bg-cover bg-no-repeat h-[60vh] md:h-[100vh] flex flex-col justify-center items-center gap-7"
      >
        <div
          className="flex flex-col justify-center items-center gap-7"
          data-aos="fade-up"
        >
          <div className="flex gap-5 items-center uppercase text-xs md:text-sm text-[#e4e4e4b6] font-medium">
            <Link to={"/"}>Home</Link>
            <span>Contact</span>
          </div>
          <h1 className="text-4xl md:text-6xl capitalize font-semibold text-[#e4e4e4]">
            Contact us
          </h1>
        </div>
      </main>
      <section className="py-12 md:py-24">
        <div className="container">
          <h3 className="text-2xl">Contact Information</h3>
          <ul className="grid justify-between gap-5 text-sm text-[#4d4d4db0] mt-7 grid-cols-1 md:grid-cols-4">
            <li>
              <span>
                Address: 198 West 21th Street, Suite 721 New York NY 10016
              </span>
            </li>
            <li>
              <a href="tel: 1235235598">Phone: + 1235 2355 98</a>
            </li>
            <li>
              <a href="/contacts">Email: info@example.com</a>
            </li>
            <li>
              <a href="/contacts">Website example.com</a>
            </li>
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-2 pt-12 md:pt-24 gap-10">
            <form className="flex flex-col gap-3" onSubmit={sendMessage}>
              <input
                type="name"
                placeholder="Your Name"
                name="contactName"
                className="border border-[#ced4da] p-3"
                value={contactForm.contactName}
                onChange={getFormValues}
              />
              <input
                type="email"
                placeholder="Your Email"
                name="contactEmail"
                className="border border-[#ced4da] p-3"
                value={contactForm.contactEmail}
                onChange={getFormValues}
              />
              <input
                type="text"
                placeholder="Subject"
                name="subject"
                className="border border-[#ced4da] p-3"
                value={contactForm.subject}
                onChange={getFormValues}
              />
              <textarea
                name="contactMessage"
                rows="7"
                className="border border-[#ced4da] p-3 resize-none"
                placeholder="Message"
                value={contactForm.contactMessage}
                onChange={getFormValues}
              ></textarea>
              <button
                type="submit"
                className="py-4 bg-[#f85959] rounded-full text-white text-lg md:w-1/2"
              >
                Send Message
              </button>
            </form>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d597.5375851441947!2d71.60464983832392!3d40.99463781903821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb4bfec6552db7%3A0x79e96c1dd15fef2d!2sUnited%20IT%20Clubs!5e0!3m2!1sru!2s!4v1714656975567!5m2!1sru!2s"
              width="100%"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};
