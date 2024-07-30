import { Pagination, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Filter } from "../../components/Filters/Filter";
import { CardUI } from "../../components/UI/CardUI";

export const Tours = () => {
  const { tourpackages } = useSelector((state) => state.mainSlice);
  const { isPending, data, isError } = tourpackages;

  const backgroundImageStyle = {
    backgroundImage: `url('https://images.wallpaperscraft.ru/image/single/lodka_gory_ozero_135258_3840x2400.jpg')`,
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
            <span>Tour</span>
          </div>
          <h1 className="text-4xl md:text-6xl capitalize font-semibold text-[#e4e4e4]">
            Destiantion
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
