import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import bg from "../../assets/backgrounds/bg_4.jpg.webp";

export const BlogDetails = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState({});
  const { title, description, more, previewImage, images, comments } = blogData;
  const { blogs, baseUrl } = useSelector((state) => state.mainSlice);
  useEffect(() => {
    async function getDataById() {
      try {
        const response = (await axios.get(`${baseUrl}api/blogs/${id}`)).data
          .data;
        setBlogData(response);
      } catch (error) {
        console.log(error);
      }
    }
    getDataById();
  }, [id]);

  const backgroundImageStyle = {
    backgroundImage: `url(${bg})`,
  };

  const { isPending, data, isError } = blogs;
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
          <div className="flex gap-5 items-center uppercase text-xs md:text-sm text-[#fff] font-medium">
            <Link to={"/"}>Home</Link>
            <Link to={"/blog"}>Blogs</Link>
            <span>Blog Single</span>
          </div>
          <h1 className="text-4xl md:text-6xl capitalize font-semibold text-[#e4e4e4]">
            Tips & Articles
          </h1>
        </div>
      </main>
      <section className="py-12 md:py-20 flex flex-col gap-12">
        <div className="container flex gap-12 flex-col lg:flex-row">
          <div className="flex flex-col gap-12">
            <div key={id} className="flex flex-col gap-5">
              <h1 className="text-xl md:text-4xl font-medium">{title}</h1>
              <p className="text-xs md:text-[15px] text-[#4d4d4db5]">
                {description}
              </p>
              <img src={previewImage} alt="" />
              <p>{more}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]">
                {images?.length > 0 ? (
                  images?.map((img, ind) => (
                    <img key={ind} src={img} alt="" className="rounded-md" />
                  ))
                ) : (
                  <h1>No images</h1>
                )}
              </div>
            </div>
            <h1 className="text-xl md:text-3xl font-medium">
              {comments?.length} Comments
            </h1>
            {comments?.length > 0 ? (
              comments?.map(({ id, photo, name, date, comment, replies }) => (
                <div className="flex gap-5 md:flex-row flex-col" key={id}>
                  <figure className="w-1/5">
                    <img
                      src={photo}
                      alt=""
                      className=" rounded-sm md:rounded-full"
                    />
                  </figure>
                  <div className="flex flex-col gap-3 items-start">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-md font-semibold md:text-xl">
                        {name}
                      </h4>
                      <span className="text-xs md:text-sm text-[#e0e0e0]">
                        {date}
                      </span>
                      <p className="text-[11px] md:text-lg">{comment}</p>
                    </div>
                    <button className="px-3.5 py-1 hover:bg-black hover:text-white bg-[#e6e6e6] uppercase rounded-md text-xs transition duration-150">
                      Reply
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h1>Оставьте комментарий первым</h1>
            )}
            <h1 className="text-xl md:text-4xl font-medium">Leave a Comment</h1>
            <form className="blogDetails-form flex flex-col gap-5 *:flex *:flex-col *:gap-3 px-10 items-start">
              <div className="w-full">
                <label htmlFor="userName">Name *</label>
                <input type="text" id="userName" />
              </div>
              <div className="w-full">
                <label htmlFor="userEmail">Email *</label>
                <input type="email" id="userEmail" />
              </div>
              <div className="w-full">
                <label htmlFor="website">Website</label>
                <input type="text" id="website" />
              </div>
              <div className="w-full">
                <label htmlFor="message">Message *</label>
                <textarea
                  rows={15}
                  name="message"
                  id="message"
                  className="resize-none"
                ></textarea>
              </div>
              <button className="py-4 px-6 bg-[#f85959] border border-[#f85959] hover:text-[#f85959] hover:bg-white rounded-full text-white text-md font-medium transition duration-150">
                Post Comment
              </button>
            </form>
          </div>
          <div className="w-full flex flex-col gap-12">
            <div className="flex flex-col gap-5">
              <h2 className="capitalize text-xl">Recent blog</h2>
              <div className="flex flex-col gap-5">
                {!isError ? (
                  isPending ? (
                    <h1>Loading...</h1>
                  ) : data?.length > 0 ? (
                    data
                      .slice(0, 4)
                      .map(
                        ({
                          _id,
                          previewImage,
                          title,
                          description,
                          comments,
                        }) => (
                          <div key={_id}>
                            <Link
                              to={`/blog-details/${_id}`}
                              className="bg-no-repeat bg-cover bg-center block h-[200px]"
                              style={{
                                backgroundImage: `url(${previewImage})`,
                              }}
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
          </div>
        </div>
      </section>
    </>
  );
};
