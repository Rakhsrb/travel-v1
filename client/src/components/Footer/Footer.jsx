import { FaFacebookF, FaHeart, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoLogoTwitter, IoMdMail } from "react-icons/io";
import { NavLink } from "react-router-dom";
import "./footer.css";

export const Footer = () => {
  return (
    <>
      <footer className="bg-[#222831] py-16 md:py-32 px-10">
        <div className="container flex flex-col gap-10 lg:gap-20">
          <div className="grid justify-between grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            <div className="flex flex-col gap-10">
              <h3 className="text-xl font-medium">dirEngine</h3>
              <div className="flex flex-col gap-14">
                <p className="text-[#93969a] ">
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                </p>
                <ul className="flex gap-3">
                  <li className="w-[50px] h-[50px] bg-[#2d333b] flex justify-center items-center rounded-[50%] text-2xl">
                    <a href="/">
                      <IoLogoTwitter />
                    </a>
                  </li>
                  <li className="w-[50px] h-[50px] bg-[#2d333b] flex justify-center items-center rounded-[50%] text-2xl">
                    <a href="/">
                      <FaFacebookF />
                    </a>
                  </li>
                  <li className="w-[50px] h-[50px] bg-[#2d333b] flex justify-center items-center rounded-[50%] text-3xl ">
                    <a href="/">
                      <FaInstagram />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <h3>Information</h3>
              <ul className="flex flex-col gap-4 text-[#93969a] footer_list">
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  <NavLink to="/services">Service</NavLink>
                </li>
                <li>
                  <NavLink to="/terms-and-conditions">
                    Terms and Conditions
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/partner">Become a partner</NavLink>
                </li>
                <li>
                  <NavLink to="/price-guarantee">Best Price Guarantee</NavLink>
                </li>
                <li>
                  <NavLink to="/privacy-and-policy">Privacy and Policy</NavLink>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-10">
              <h3>Customer Support</h3>
              <ul className="flex flex-col gap-4 text-[#93969a] footer_list">
                <li>
                  <NavLink to="/faq">FAQ</NavLink>
                </li>
                <li>
                  <NavLink to="/payment">Payment Option</NavLink>
                </li>
                <li>
                  <NavLink to="/tips">Booking Tips</NavLink>
                </li>
                <li>
                  <NavLink to="/how-it-works">How it works</NavLink>
                </li>
                <li>
                  <NavLink to="/contacts">Contact Us</NavLink>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-10">
              <h3>Have a Questions?</h3>
              <ul className="flex flex-col gap-4">
                <li className="flex gap-5 ">
                  <span>
                    <FaLocationDot />
                  </span>
                  <span className="text-[#93969a]">
                    203 Fake St. Mountain View, San Francisco, California, USA
                  </span>
                </li>
                <li>
                  <a
                    href="tel: 998900010011"
                    className="flex gap-5 items-center"
                  >
                    <span>
                      <FaPhoneAlt />
                    </span>
                    <span>+998 (90) 0010011</span>
                  </a>
                </li>
                <li className="flex gap-2">
                  <a href="/" className="flex gap-5 items-center">
                    <span>
                      <IoMdMail />
                    </span>{" "}
                    <span>info@yourdomain.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center">
            <p className="flex text-[#93969a] text-xs md:text-base">
              Copyright ©2024 All rights reserved | This template is made with
              <FaHeart className="mx-2" /> by UITC | omaxmudovv
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
