import { Pagination, Stack } from "@mui/material";
import React from "react";
import { BiCommentDetail } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import bg from "../../assets/backgrounds/bg_4.jpg.webp";
export const Blogs = () => {
  let { blogs } = useSelector((state) => state.mainSlice);
  const { isPending, data, isError } = blogs;

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
          <div className="flex gap-5 items-center uppercase text-xs md:text-sm text-white font-medium">
            <Link to={"/"}>Home</Link>
            <span>Blog</span>
          </div>
          <h1 className="text-3xl md:text-6xl capitalize font-semibold text-[#e4e4e4]">
            Tips & Articles
          </h1>
        </div>
      </main>
      <section className="py-12 md:py-24 bg-[#f8faff]">
        <div className="container">
          <div className="py-12 md:py-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]">
            {!isError ? (
              isPending ? (
                <h1>Loading...</h1>
              ) : data?.length > 0 ? (
                data
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
