import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddBlogs = () => {
  const { userData, baseUrlApi, config } = useSelector(
    (state) => state.mainSlice
  );

  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    more: "",
    previewImage: "",
    images: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.isLogin) {
      navigate("/");
    }
  }, []);

  const handleGetValues = async (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const formImageData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formImageData.append("images", files[i]);
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        baseUrlApi + "api/upload",
        formImageData,
        config
      );
      setBlogData((prevData) => ({
        ...prevData,
        [name]:
          name === "previewImage"
            ? data.images[0]
            : [...prevData.images, ...data.images],
      }));
      setLoading(false);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Failed to upload images. Please try again.",
      });
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(baseUrlApi + "api/blogs/create", blogData, config);
      setBlogData({
        title: "",
        description: "",
        more: "",
        previewImage: "",
        images: [],
      });
      setLoading(false);
      navigate("/blogs");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "New Blog Has Been Added",
        showConfirmButton: false,
        timer: 3500,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Failed to add new blog. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <section className="bg-blue-50 flex flex-col justify-center items-center min-h-screen py-10">
      <form
        className="border p-10 rounded-md bg-white shadow-lg w-full max-w-2xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-semibold mb-7 text-blue-800">
          Add New Blog
        </h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="serviceTitle" className="text-lg text-blue-800">
              Title:
            </label>
            <input
              placeholder="Enter the title"
              type="text"
              className="border py-2 px-5 text-md"
              id="serviceTitle"
              name="title"
              value={blogData.title || ""}
              onChange={handleGetValues}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="serviceDescription"
              className="text-lg text-blue-800"
            >
              Description:
            </label>
            <textarea
              placeholder="Enter the description"
              className="border py-2 px-5 text-md min-h-32"
              id="serviceDescription"
              onChange={handleGetValues}
              value={blogData.description || ""}
              name="description"
            ></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="sa" className="text-lg text-blue-800">
              Preveiw Image:
            </label>
            <input
              type="file"
              className="border py-1 px-5 text-lg"
              id="sa"
              onChange={handleFileChange}
              name="previewImage"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="serviceImage" className="text-lg text-blue-800">
              Images:
            </label>
            <input
              type="file"
              className="border py-1 px-5 text-lg"
              id="serviceImage"
              onChange={handleFileChange}
              multiple
              name="images"
            />
          </div>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="py-2 bg-blue-600 hover:bg-blue-700 px-10 mt-10 w-full rounded-sm text-white font-medium"
        >
          {loading ? "Loading..." : "Add"}
        </button>
      </form>
    </section>
  );
};

export default AddBlogs;
