import { BsHeartPulse } from "react-icons/bs";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaHotel,
} from "react-icons/fa";
import { GiSherlockHolmes } from "react-icons/gi";
import { GrMapLocation } from "react-icons/gr";
import { IoMdRestaurant } from "react-icons/io";
import { MdOutlineSupportAgent } from "react-icons/md";
import { SiLeaderprice } from "react-icons/si";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useState } from "react";
import CountUp from "react-countup";
import { BiCommentDetail } from "react-icons/bi";
import { CiMap } from "react-icons/ci";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import funfacts_bg from "../../assets/backgrounds/funfacts_bg.jpg";
import { CardUI } from "../../components/UI/CardUI";
import "./home.css";

export const Home = () => {
  const {
    featured,
    testimonials,
    blogs,
    restaurants,
    tourpackages,
    hotelandrooms,
  } = useSelector((state) => state.mainSlice);
  const {
    isPending: featuredIsPending,
    data: featuredData,
    isError: featuredIsError,
  } = featured;
  const {
    isPending: blogsIsPending,
    data: blogsData,
    isError: blogsIsError,
  } = blogs;
  const {
    isPending: restIsPending,
    data: restData,
    isError: restIsError,
  } = restaurants;
  const {
    isPending: tourIsPending,
    data: tourData,
    isError: tourIsError,
  } = tourpackages;
  const {
    isPending: hotelIsPending,
    data: hotelData,
    isError: hotelIsError,
  } = hotelandrooms;

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const funFacts = [
    {
      id: 1,
      title: "Happy Customers",
      count: 100000,
    },
    {
      id: 2,
      title: "Destination Places",
      count: 40000,
    },
    {
      id: 3,
      title: "Hotels",
      count: 87000,
    },
    {
      id: 4,
      title: "Restaurants",
      count: 56400,
    },
  ];

  const [search, setSearch] = useState({
    title: "",
    location: "",
    category: "",
  });

  const getSearchValues = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <input
        type="checkbox"
        className="absolute top-[-430430px]"
        autoFocus={true}
      />
      <main className="overlay_bg h-[100vh]">
        <div className="container relative top-5 md:top-0" data-aos="fade-up">
          <div className="flex flex-col gap-6 px-5 lg:px-0">
            <h1 className="text-2xl xs:text-4xl sm:text-5xl md:text-6xl text-white">
              <strong>
                Explore <br />
              </strong>
              your amazing city
            </h1>
            <p className="text-[#ffffffcc] text-sm sm:text-lg md:text-xl">
              Find great places to stay, eat, shop, or visit from local experts
            </p>
            <div>
              <form className="form-control flex items-start flex-col gap-4 md:w-[600px]">
                <div className="flex flex-col gap-2 w-full">
                  <input
                    type="text"
                    placeholder="Ex: food, service, hotel"
                    className="sm:w-auto w-full"
                    name="title"
                    onChange={getSearchValues}
                    required
                  />
                  <div className="grid sm:grid-cols-2 gap-2">
                    <div className="flex items-center selectfield">
                      <select
                        className="w-full sm:w-auto"
                        name="location"
                        onChange={getSearchValues}
                        required
                      >
                        <option value="">Select Location</option>
                        <option value="moscow">Moscow</option>
                        <option value="peter">Saint Petersburg</option>
                        <option value="korea">South Korea</option>
                      </select>
                      <FaChevronDown />
                    </div>
                    <div className="flex items-center selectfield justify-between">
                      <select
                        className="w-full"
                        name="category"
                        onChange={getSearchValues}
                        required
                      >
                        <option value="" hidden>
                          Select Category
                        </option>
                        <option value="hotelandrooms">Hotels</option>
                        <option value="tourpackages">Tour Packages</option>
                        <option value="Restaurants">Restaurants</option>
                      </select>
                      <FaChevronDown />
                    </div>
                  </div>
                </div>
                <Link
                  to={`/search/${search.title}/${search.category}/${search.location}`}
                  className="w-full search-button flex justify-center items-center rounded-md"
                >
                  Search
                </Link>
              </form>
            </div>
            <p className="text-[#ffffffcc] text-sm sm:text-lg md:text-xl">
              Or browse the highlights
            </p>
            <div>
              <ul className="browse_highlights grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:flex items-center gap-3 ">
                <li>
                  <Link
                    to={"#restaurants"}
                    className="flex items-center gap-2 font-light text-md md:text-lg"
                  >
                    <span className="md:text-2xl">
                      <IoMdRestaurant />
                    </span>
                    Restaurants
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/hotels"}
                    className="flex items-center gap-2 text-md md:text-lg"
                  >
                    <span className="md:text-xl">
                      <FaHotel />
                    </span>
                    Hotel
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/tours"}
                    className="flex items-center gap-2 text-md md:text-lg"
                  >
                    <span className="md:text-2xl">
                      <GrMapLocation />
                    </span>
                    Tours
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <section className="py-24 bg-[#f8faff]">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 service_cards md:mt-[-140px] gap-10">
            <div
              className="flex flex-col items-center text-center"
              data-aos="fade-up"
            >
              <SiLeaderprice fontSize={80} />
              <h3 className="text-xl font-semibold">Best Price Gauarantee</h3>
              <p className="text-md text-gray-500">
                A small river named Duden flows by their place and supplies
              </p>
            </div>
            <div
              className="flex flex-col items-center text-center"
              data-aos="fade-up"
            >
              <BsHeartPulse fontSize={80} />
              <h3 className="text-xl font-semibold">Travellers Love Us</h3>
              <p className="text-md text-gray-500">
                A small river named Duden flows by their place and supplies
              </p>
            </div>
            <div
              className="flex flex-col items-center text-center"
              data-aos="fade-up"
            >
              <GiSherlockHolmes fontSize={80} />
              <h3 className="text-xl font-semibold">Best Travel Agent</h3>
              <p className="text-md text-gray-500">
                A small river named Duden flows by their place and supplies
              </p>
            </div>
            <div
              className="flex flex-col items-center text-center"
              data-aos="fade-up"
            >
              <MdOutlineSupportAgent fontSize={80} />
              <h3 className="text-xl font-semibold">Our Dedicated Support</h3>
              <p className="text-md text-gray-500">
                A small river named Duden flows by their place and supplies
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-20">
        <div className="container">
          <div data-aos="fade-up">
            <span className="text-gray-500 text-sm">Featured</span>
            <h2 className="text-2xl md:text-3xl">
              <strong>Featured</strong> Destiantion
            </h2>
          </div>
          <div className="relative slider-cards py-10 md:!py-20">
            {!featuredIsError ? (
              featuredIsPending ? (
                <h1>Loading...</h1>
              ) : (
                <>
                  <Swiper
                    data-aos="fade-up"
                    className="mySwiper"
                    slidesPerView={1}
                    spaceBetween={30}
                    breakpoints={{
                      500: {
                        sliidesPerView: 2,
                        spaceBetween: 20,
                      },
                      750: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                      },
                      1000: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                      },
                    }}
                    loop={true}
                    navigation={{
                      nextEl: ".slider-next-button",
                      prevEl: ".slider-prev-button",
                    }}
                    modules={[Navigation, Autoplay]}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                  >
                    {featuredData.length > 0 ? (
                      featuredData.map((item) => {
                        return (
                          <SwiperSlide key={item._id} className="flex flex-col">
                            <Link
                              to={`/tour-details/${item._id}`}
                              className="bg-no-repeat bg-cover bg-center "
                              style={{ backgroundImage: `url(${item.image})` }}
                            ></Link>
                            <div className="p-4 flex flex-col gap-2 border border-[#e6e6e6] border-t-transparent">
                              <h3 className="text-xl font-semibold">
                                <CiMap fontSize={20} /> {item.location}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {item.listing}
                              </p>
                            </div>
                          </SwiperSlide>
                        );
                      })
                    ) : (
                      <h1>No data...</h1>
                    )}
                  </Swiper>
                  <button className="slider-next-button  right-0 lg:right-[-20px] xl:right-[-30px]">
                    <FaChevronRight color="#f85959" fontSize={25} />
                  </button>
                  <button className="slider-prev-button left-0 lg:left-[-20px] xl:left-[-30px]">
                    <FaChevronLeft color="#f85959" fontSize={25} />
                  </button>
                </>
              )
            ) : (
              <h1>Not found. Something went wrong</h1>
            )}
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24 bg-[#f8faff]">
        <div className="container" data-aos="fade-up">
          <span className="text-gray-500 text-sm">Special Offers</span>
          <h2 className="text-2xl md:text-3xl">
            <strong>Top</strong> Tour Packages
          </h2>
        </div>
        <div className="container-fluid py-12 md:py-24">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] items-center"
            data-aos="fade-up"
          >
            {!tourIsError ? (
              tourIsPending ? (
                <h1>Loading...</h1>
              ) : tourData?.length > 0 ? (
                tourData
                  .slice(0, 4)
                  .map((elem) => (
                    <CardUI
                      cardID={elem._id}
                      description={elem.description}
                      btnTitle={"discover"}
                      imgUrl={elem.previewImage}
                      location={elem.location}
                      price={elem.price}
                      title={elem.title}
                      key={elem._id}
                      imgHeight={200}
                      detailsURL={"tour-details"}
                      btnLinkTo={"/tour-details/" + elem._id}
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
      <section
        className={`py-20 md:py-[140px] bg-center bg-cover bg-no-repeat funfacts relative z-0`}
        style={{ backgroundImage: `url(${funfacts_bg})` }}
      >
        <div
          className="container text-center text-white"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h2 className="text-2xl md:text-4xl mb-5">Some fun facts</h2>
          <span className="text-lg md:text-xl">
            More than 100,000 websites hosted
          </span>
          <ul
            className="mt-20 flex justify-center items-center flex-col sm:flex-row gap-10 sm:gap-16 md:gap-24 lg:gap-32"
            ref={ref}
          >
            {funFacts?.map(({ id, title, count }) => (
              <li key={id}>
                {inView && (
                  <CountUp
                    start={0}
                    end={count}
                    duration={5}
                    separator=","
                    className="text-3xl"
                  />
                )}
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="py-12 md:py-24 bg-[#f8faff]">
        <div className="container" data-aos="fade-up">
          <span className="text-[#4d4d4d]">Special Offers</span>
          <h1 className="text-2xl md:text-4xl mt-4">
            <strong>Popular</strong> Hotels & Rooms
          </h1>
        </div>
        <div className="container-fluid py-12 md:py-24">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center lg:grid-cols-5 gap-[30px]"
            data-aos="fade-up"
          >
            {!hotelIsError ? (
              hotelIsPending ? (
                <h1>Loading...</h1>
              ) : hotelData?.length > 0 ? (
                hotelData
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
                      detailsURL={"hotel-details"}
                      btnLinkTo={"/hotel-details/" + elem._id}
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
      <section className="py-12 md:py-24">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div data-aos="fade-up">
            <span className="text-[#4d4d4d] text-md md:text-base">
              Best Directory Website
            </span>
            <h2 className="text-2xl md:text-4xl mt-4">
              <strong>Why</strong> Choose Us?
            </h2>
            <div className="text-sm flex flex-col gap-3 text-[#4d4d4daf] mt-12">
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. Separated
                they live in Bookmarksgrove right at the coast of the Semantics,
                a large language ocean.
              </p>
              <p>
                Even the all-powerful Pointing has no control about the blind
                texts it is an almost unorthographic life.
              </p>
            </div>
            <Link className="text-[#f85959] text-md py-4 px-5 border border-[#f85959] rounded-full inline-block mt-10 hover:bg-[#f85959] hover:text-white transition duration-[.3s]">
              Read more
            </Link>
          </div>
          <div className="relative" data-aos="fade-up">
            <span className="text-[#4d4d4d]">Testimony</span>
            <h2 className="text-2xl md:text-4xl mt-4">
              <strong>Our</strong> Guests Says
            </h2>
            <div>
              <Swiper
                className="mySwiper"
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                navigation={{
                  nextEl: ".slider-next-button",
                  prevEl: ".slider-prev-button",
                }}
                parallax={true}
                modules={[Navigation, Autoplay]}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
              >
                {testimonials.length > 0 ? (
                  testimonials.map(({ id, photo, comment, name, from }) => {
                    return (
                      <SwiperSlide key={id} className="p-[30px]">
                        <div className="flex gap-5">
                          <div className="relative">
                            <img
                              src={photo}
                              alt=""
                              className="rounded-full w-[200px]"
                            />
                          </div>
                          <div className="flex flex-col gap-10">
                            <p className="text-[#4d4d4d] text-xs sm:text-base">
                              {comment}
                            </p>
                            <div>
                              <h3>{name}</h3>
                              <span>Guest from {from}</span>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })
                ) : (
                  <h1>No data...</h1>
                )}
              </Swiper>
              <button className="slider-next-button  right-0 lg:right-[-20px] xl:right-[-30px]">
                <FaChevronRight color="#f85959" fontSize={25} />
              </button>
              <button className="slider-prev-button left-0 lg:left-[-20px] xl:left-[-30px]">
                <FaChevronLeft color="#f85959" fontSize={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24" id="restaurants">
        <div className="container">
          <div data-aos="fade-up">
            <span className="text-[#4d4d4d]">Special Offers</span>
            <h1 className="text-2xl md:text-4xl mt-4">
              <strong>Popular</strong> Restaurants
            </h1>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] py-12 md:py-24"
            data-aos="fade-up"
          >
            {!restIsError ? (
              restIsPending ? (
                <h1>Loading...</h1>
              ) : restData?.length > 0 ? (
                restData
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
      <section className="py-12 md:py-24">
        <div className="container">
          <div data-aos="fade-up">
            <span className="text-[#4d4d4d]">Recent Blog</span>
            <h1 className="text-2xl md:text-4xl mt-4">
              <strong>Tips</strong> & Articles
            </h1>
          </div>
          <div
            className="py-12 md:py-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]"
            data-aos="fade-up"
          >
            {!blogsIsError ? (
              blogsIsPending ? (
                <h1>Loading...</h1>
              ) : blogsData?.length > 0 ? (
                blogsData
                  .slice(0, 4)
                  .map(
                    ({ _id, previewImage, title, description, comments }) => (
                      <div key={_id}>
                        <Link
                          to={`/blog-details/${_id}`}
                          className="bg-no-repeat bg-cover bg-center block h-[200px]"
                          style={{ backgroundImage: `url(${previewImage})` }}
                        ></Link>
                        <div className="p-4 bg-white border border-[#e6e6e6] border-t-transparent flex flex-col gap-4">
                          <div className="flex justify-between">
                            <h4 className="text-xs text-[#4d4d4db2]">
                              {title}
                            </h4>
                          </div>
                          <Link
                            to={`/blog-details/${_id}`}
                            className="text-lg hover:text-[#f85959] transition duration-[.3s]"
                          >
                            {description}
                          </Link>
                          <hr />
                          <div className="flex justify-between items-start">
                            <span className="text-[#4d4d4d] flex items-center gap-2 hover:text-gray-500 cursor-pointer transition duration-[.3s]">
                              <BiCommentDetail /> {comments.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  )
              ) : (
                <h1>No Data</h1>
              )
            ) : (
              <h1>Not found. Something went wrong</h1>
            )}
          </div>
        </div>
      </section>
      <section className="py-[90px] md:py-[140px] subscribeSection flex flex-col gap-12 justify-center items-center px-5">
        <div data-aos="fade-up" className="flex flex-col gap-5">
          <div className="text-white text-center flex flex-col justify-center items-center">
            <h1 className="text-2xl md:text-5xl">Subcribe to our Newsletter</h1>
            <p className="text-sm md:text-xl w-2/3 mt-5 text-[#f3f3f3e8]">
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0 w-full">
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full md:w-auto bg-transparent md:border-r-0 border p-3 pr-20 text-[#ededede8] text-xl placeholder:text-[#e4e4e4e8]"
            />
            <button className="border px-5 py-3 text-white text-xl w-full md:w-auto">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
