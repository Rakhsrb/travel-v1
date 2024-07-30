import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import bg from "../../assets/backgrounds/collage_bg.JPEG";
import { Filter } from "../../components/Filters/Filter";
import { CardUI } from "../../components/UI/CardUI";

export const Search = () => {
  const { baseUrl } = useSelector((state) => state.mainSlice);
  const [searchData, setSearchData] = useState({
    isPending: false,
    data: [],
    isError: false,
  });
  const { title, category, location } = useParams();
  const { isPending, data, isError } = searchData;
  useEffect(() => {
    async function getSearchData() {
      try {
        setSearchData({ ...searchData, isPending: true });
        const res = (
          await axios.get(
            `${baseUrl}api/specialOffers/?title=${title}&?category=${category}&?location=${location}`
          )
        ).data.data;
        setSearchData({ ...searchData, data: res, isPending: false });
      } catch (error) {
        setSearchData({ ...searchData, isPending: false, isError: true });
        console.log(error);
      }
    }
    getSearchData();
  }, [title, category, location]);
  const backgroundImageStyle = {
    backgroundImage: `url(${bg})`,
  };
  return (
    <>
      <main>
        <section
          style={backgroundImageStyle}
          className="bg-center bg-cover bg-no-repeat h-[60vh] md:h-[100vh] flex flex-col justify-center items-center gap-7"
        >
          <div
            className="flex flex-col justify-center items-center gap-7"
            data-aos="fade-up"
          >
            <div className="flex gap-5 items-center uppercase text-xs md:text-sm text-[#fff] font-medium">
              <Link to={"/"}>Home</Link>
              <span>Search</span>
            </div>
            <h1 className="text-4xl md:text-6xl capitalize font-semibold text-[#e4e4e4]">
              Found
            </h1>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container flex flex-col lg:flex-row gap-10">
            <Filter />

            {!isError ? (
              isPending ? (
                <div className="w-full flex justify-center items-center">
                  <span className={isPending ? "loader" : ""}></span>
                </div>
              ) : (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                  data-aos="fade-up"
                >
                  {data?.length > 0 ? (
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
                          detailsURL={"hotel-details"}
                          btnLinkTo={"/hotel-details/" + elem._id}
                        />
                      ))
                  ) : (
                    <h1>No data...</h1>
                  )}
                </div>
              )
            ) : (
              <h1>Not found. Something went wrong</h1>
            )}
          </div>
        </section>
      </main>
    </>
  );
};
