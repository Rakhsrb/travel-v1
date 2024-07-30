import React, { useState } from "react";
import { TiMinus, TiPlus } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import bg from "../../assets/backgrounds/bg_2.jpg.webp";
import { openAswer } from "../../store/Slices/MainSlice";
import "./about.css";

export const About = () => {
  let { frequently } = useSelector((state) => state.mainSlice);
  let dispatch = useDispatch();
  let [activeTab, setActiveTab] = useState(1);
  function tabActive(tabName) {
    setActiveTab(tabName);
  }

  const [aboutUs, setAboutUs] = useState([
    {
      id: 1,
      title: "What we do",
      subtitle: "Offering Reliable Hosting",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt voluptate, quibusdam sunt iste dolores consequatur",
      description2:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    },
    {
      id: 2,
      title: "Our mission",
      subtitle: "Exceptional Web Solutions",
      description:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
      description2:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt voluptate, quibusdam sunt iste dolores consequatur",
    },
    {
      id: 3,
      title: "Our Goal",
      subtitle: "Help Our Customer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt voluptate, quibusdam sunt iste dolores consequatur",
      description2:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    },
  ]);

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
            <span>About</span>
          </div>
          <h1 className="text-4xl md:text-6xl capitalize font-semibold text-[#e4e4e4]">
            about us
          </h1>
        </div>
      </main>
      <section className="py-12 md:py-20">
        <div
          className="container grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          data-aos="fade-up"
        >
          <figure>
            <img src="src/assets/about/about.jpg.webp" alt="" />
          </figure>
          <div className="flex flex-col gap-10 tabsSide">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-5">
              {aboutUs?.map(({ id, title }) => (
                <span
                  key={id}
                  className={`${
                    activeTab === id ? "active" : ""
                  } p-3 rounded-full cursor-pointer  text-[#a4a4a4] transition duration-[.3s] border`}
                  onClick={() => tabActive(id)}
                >
                  {title}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {aboutUs.map(
                ({ id, subtitle, description, description2 }) =>
                  activeTab === id && (
                    <div key={id} className="flex flex-col gap-5">
                      <h3 className="text-xl font-semibold">{subtitle}</h3>
                      <p className="text-[#4d4d4db0] text-sm">{description}</p>
                      <p className="text-[#4d4d4db0] text-sm">{description2}</p>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#f8faff] py-12 md:py-24">
        <div className="container">
          <div data-aos="fade-up">
            <span className="uppercase text-xs text-[#4d4d4db0]">FAQS</span>
            <h3 className="text-xl md:text-3xl mt-4">
              <strong>Frequently</strong> Ask Question
            </h3>
          </div>
          <div
            className="grid grid-cols-1 gap-1 md:grid-cols-2 py-12 md:py-24 md:gap-7"
            data-aos="fade-up"
          >
            <div className="flex flex-col gap-1">
              {frequently.slice(0, 3).map((elem) => (
                <div
                  key={elem.id}
                  onClick={() => dispatch(openAswer(elem.id))}
                  className="cursor-pointer bg-white w-full relative"
                >
                  <div className="flex items-center justify-between border p-5">
                    <span className="text-xs md:text-lg font-medium">
                      {elem.question}
                    </span>
                    <span className="p-1 bg-[#8bc34a] rounded-full text-white text-xs">
                      {elem.isOpen ? <TiMinus /> : <TiPlus />}
                    </span>
                  </div>
                  <div
                    className={`border ${
                      elem.isOpen ? "opened-answer" : "closed-answer"
                    }`}
                  >
                    <p
                      className="text-xs md:text-base text-[#4d4d4db0] frequentlyAnswer"
                      style={{ minHeight: 0 }}
                    >
                      {elem.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              {frequently.slice(3).map((elem) => (
                <div
                  key={elem.id}
                  onClick={() => dispatch(openAswer(elem.id))}
                  className="cursor-pointer bg-white w-full relative"
                >
                  <div className="flex items-center justify-between border p-5">
                    <span className="text-xs md:text-lg font-medium pointer-events-none">
                      {elem.question}
                    </span>
                    <span className="p-1 bg-[#8bc34a] rounded-full text-white text-xs">
                      {elem.isOpen ? <TiMinus /> : <TiPlus />}
                    </span>
                  </div>
                  <div
                    className={`border ${
                      elem.isOpen ? "opened-answer" : "closed-answer"
                    }`}
                  >
                    <p
                      className="text-xs md:text-base text-[#4d4d4db0]"
                      style={{ minHeight: 0 }}
                    >
                      {elem.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
