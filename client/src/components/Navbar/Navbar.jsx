import { useEffect, useState } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  let [navActive, setNavActive] = useState(false);
  let [scrollNav, setScrollNav] = useState("");
  document.body.style.overflowY = navActive ? "hidden" : "scroll";
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150 && window.scrollY < 200) {
        setScrollNav("navSleep");
      } else if (window.scrollY > 200) {
        setScrollNav("navAwake");
      } else {
        setScrollNav("");
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {
        if (window.scrollY > 150 && window.scrollY < 200) {
          setScrollNav("navSleep");
        } else if (window.scrollY > 200) {
          setScrollNav("navAwake");
        } else {
          setScrollNav("");
        }
      });
    };
  }, []);
  return (
    <>
      <nav
        className={`${scrollNav} flex justify-between py-4 px-5 h-[70px] items-center w-full  z-[99999] text-white ${
          scrollNav == "navAwake" ? "bg-white" : "bg-black"
        } lg:bg-transparent`}
      >
        <div className="container flex justify-between">
          <Link className="font-bold text-xl flex gap-2 items-center text-[#f85959]">
            Travel
          </Link>
          <ul
            className={`lg:flex flex-col gap-5 lg:gap-2 text-2xl lg:text-lg backdrop-blur-lg lg:flex-row absolute right-0 top-14 lg:static  w-full py-10 lg:w-auto lg:px-0 lg:py-0 ${
              navActive ? "flex px-10 h-screen" : "hidden h-0"
            } ${
              scrollNav == "navAwake"
                ? "bg-white bg-opacity-90"
                : "bg-black bg-opacity-90"
            }`}
          >
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/about"}>About</NavLink>
            </li>
            <li>
              <NavLink to={"/tours"}>Tour</NavLink>
            </li>
            <li>
              <NavLink to={"/hotels"}>Hotels</NavLink>
            </li>
            <li>
              <NavLink to={"/blog"}>Blog</NavLink>
            </li>
            <li>
              <NavLink to={"/contacts"}>Contact</NavLink>
            </li>
            <li>
              <Link
                to={"/contacts"}
                className={`${
                  scrollNav == "navAwake"
                    ? "bg-[#f85959] text-white"
                    : "bg-transparent"
                } py-3 px-5 border border-[#ffffff66] rounded-3xl hover:bg-[#f85959] hover:border-[#f85959] transition duration-[.3s] ease-linear`}
              >
                Add listing
              </Link>
            </li>
          </ul>
        </div>
        <button
          className="lg:hidden"
          onClick={() => (navActive ? setNavActive(false) : setNavActive(true))}
        >
          <div className="flex items-center gap-1">
            {navActive ? (
              <IoMdClose fontSize={25} />
            ) : (
              <IoIosMenu fontSize={25} />
            )}
            MENU
          </div>
        </button>
      </nav>
    </>
  );
};
