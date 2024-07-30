import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMap } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import bg from "../../assets/backgrounds/bg_r.jpg";
import { CardUI } from "../../components/UI/CardUI";
import "./Adetails.css";

export const RestDetails = () => {
  const { id } = useParams();
  const [restaurantData, setRestaurantData] = useState({});
  const { baseUrl, restaurants } = useSelector((state) => state.mainSlice);
  useEffect(() => {
    async function getDataById() {
      try {
        const response = (await axios.get(`${baseUrl}api/specialOffers/${id}`))
          .data.data;
        setRestaurantData(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    getDataById();
  }, [id]);

  const backgroundImageStyle = {
    backgroundImage: `url(${bg})`,
  };
  const { images, location, title, more, description, previewImage } =
    restaurantData;
  const { isPending, data, isError } = restaurants;

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
          <div className="flex gap-5 items-center uppercase text-xs md:text-sm text-white font-medium">
            <Link to={"/"}>Home</Link>
            <span>Hotel</span>
            <span>Restaurant Single</span>
          </div>
          <h1 className="text-3xl md:text-6xl capitalize font-semibold text-[#e4e4e4]">
            Restaurant Details
          </h1>
        </div>
      </main>
      <section>
        <div className="relative slider-cards !py-5 md:!py-20 container">
          <Swiper
            spaceBetween={20}
            effect="fade"
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={{
              nextEl: ".slider-next-button",
              prevEl: ".slider-prev-button",
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[EffectFade, Navigation, Pagination, Autoplay]}
            className="mySwiper"
          >
            {images?.length > 0 ? (
              images.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div
                      className="bg-no-repeat bg-cover h-[50vh] lg:h-[70vh]"
                      style={{ backgroundImage: `url(${item})` }}
                    />
                  </SwiperSlide>
                );
              })
            ) : (
              <h1>No data...</h1>
            )}
          </Swiper>
          <button className="slider-next-button right-4 lg:right-[20px] xl:right-[-30px]">
            <FaChevronRight
              className="text-[#e4e4e4] lg:text-[#f85959]"
              fontSize={25}
            />
          </button>
          <button className="slider-prev-button left-4 lg:left-[20px] xl:left-[-30px]">
            <FaChevronLeft
              className="text-[#e4e4e4] lg:text-[#f85959]"
              fontSize={25}
            />
          </button>
        </div>
      </section>
      <section>
        <div className="flex flex-col gap-5 container">
          <div>
            <p className="text-[#4d4d4d]">Our Luxury Restaurants</p>
            <h1 className="text-2xl capitalize">
              {title} in {location}
            </h1>
            <span className="flex gap-2 items-center">
              <IoMap color="#f85959" /> {location}
            </span>
          </div>
          <div className="flex flex-col gap-2 lg:gap-5 text-[#4d4d4db6] text-xs lg:text-md">
            <p>{more}</p>
          </div>
        </div>
      </section>
      {/* <section className="py-12 md:py-20">
        <div className="flex flex-col gap-5 container ">
          <span className="text-2xl font-medium">Our Menu</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] items-center">
            {menu?.length > 0 ? (
              menu.map(({ id, title, price, preview }) => (
                <div className="flex flex-col" key={id}>
                  <div className="relative imgHover">
                    <Link
                      className="bg-no-repeat bg-cover bg-center block h-[200px]"
                      style={{ backgroundImage: `url(${preview})` }}
                    ></Link>
                    <span className="w-[60px] h-[60px] bg-white absolute flex justify-center items-center">
                      <SlMagnifier />
                    </span>
                  </div>
                  <hr />
                  <div className="p-4 bg-white border border-[#e6e6e6] border-t-transparent flex flex-col gap-4">
                    <div className="flex gap-2 flex-col">
                      <h4 className="text-xl font-semibold">{title}</h4>
                      <p className="text-[#f85959] flex flex-col text-xl ">
                        <span>{price}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>no data</div>
            )}
          </div>
          <h1 className="capitalize text-xl font-semibold flex items-center gap-5">
            More Menus:{" "}
            <Link className="underline text-[#f85959]">Website Link</Link>
          </h1>
        </div>
      </section> */}
      <section className="py-12 md:py-20 ">
        <div className="container flex flex-col gap-5">
          <span className="text-2xl font-medium">
            Check Availability & Booking
          </span>
          <form className="flex flex-col gap-3 details-form">
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Name" name="name" />
              <input type="text" placeholder="Date" name="date" />
              <div className="details-form_select flex justify-between items-center">
                <select name="guests" id="guestSelect" className="w-full">
                  <option value="" hidden>
                    Guest
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <label htmlFor="guestSelect">
                  <FaChevronDown />
                </label>
              </div>
              <input type="email" placeholder="Email" name="email" />
            </div>
            <button className="bg-[#f85959] w-full py-4 border border-[#F85959] hover:bg-white text-lg text-white hover:text-[#f85959] transition duration-200">
              Check Availability
            </button>
          </form>
        </div>
      </section>
      <section className="py-12 md:py-20">
        <div className="container flex flex-col gap-5">
          <span className="text-2xl font-medium">Related Restaurants</span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {!isError ? (
              isPending ? (
                <h1>Loading...</h1>
              ) : data?.length > 0 ? (
                data
                  .slice(0, 4)
                  .map((elem) => (
                    <CardUI
                      cardID={elem._id}
                      description={elem.description}
                      btnTitle={"Book Now"}
                      imgUrl={elem.previewImage}
                      location={elem.location}
                      price={elem.price}
                      title={elem.title}
                      key={elem._id}
                      imgHeight={200}
                      detailsURL={"restaurant-details"}
                      btnLinkTo={"/restaurant-details/" + elem._id}
                    />
                  ))
              ) : (
                <h1>No data...</h1>
              )
            ) : (
              <h1>Not found. Something went wrong</h1>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
