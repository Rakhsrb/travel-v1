import { Pagination, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import bg from "../../assets/backgrounds/bg_7.webp";
import { Filter } from "../../components/Filters/Filter";
import { CardUI } from "../../components/UI/CardUI";

export const Hotels = () => {
  const { hotelandrooms } = useSelector((state) => state.mainSlice);
  const { isPending, data, isError } = hotelandrooms;

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
          <div className="flex gap-5 items-center uppercase text-xs md:text-sm text-[#4d4d4d9d] font-medium">
            <Link to={"/"}>Home</Link>
            <span>Hotel</span>
          </div>
          <h1 className="text-4xl md:text-6xl capitalize font-semibold text-[#4d4d4d48]">
            Hotels
          </h1>
        </div>
      </main>
      <section className="py-12 md:py-24">
        <div className="flex flex-col gap-10">
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
          <div className="relative flex justify-center">
            <Stack spacing={2} className="px-16 md:px-0">
              <Pagination count={10} variant="outlined" className="!static" />
            </Stack>
          </div>
        </div>
      </section>
    </>
  );
};
