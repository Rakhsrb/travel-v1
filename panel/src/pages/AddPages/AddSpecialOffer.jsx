import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddSpecialOffer = () => {
  const { userData, baseUrlApi, config } = useSelector(
    (state) => state.mainSlice
  );
  const [offerData, setOfferData] = useState({
    category: "",
    title: "",
    price: "",
    description: "",
    location: "",
    more: "",
    previewImage: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.isLogin) {
      navigate("/");
    }
  }, [userData, navigate]);

  const handleGetValue = (e) => {
    const { name, value } = e.target;
    setOfferData((prevData) => ({ ...prevData, [name]: value }));
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

      if (name === "previewImage") {
        setOfferData((prevData) => ({
          ...prevData,
          previewImage: data.images[0],
        }));
      } else {
        setOfferData((prevData) => ({
          ...prevData,
          images: [...prevData.images, ...data.images],
        }));
      }

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
      await axios.post(
        baseUrlApi + "api/specialOffers/create",
        offerData,
        config
      );
      setOfferData({
        category: "",
        title: "",
        price: "",
        description: "",
        location: "",
        more: "",
        previewImage: "",
        images: [],
      });
      setLoading(false);
      navigate("/special-offers");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "New Offer Has Been Added",
        showConfirmButton: false,
        timer: 3500,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Failed to add new offer. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#ecfeff] h-screen overflow-y-auto p-40 flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded p-10"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={offerData.category}
            onChange={handleGetValue}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Category</option>
            <option value="hotelandrooms">Hotel & Rooms</option>
            <option value="restaurants">Restaurants</option>
            <option value="tourpackages">Tour Packages</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={offerData.title}
            onChange={handleGetValue}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Title"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            id="price"
            type="number"
            name="price"
            value={offerData.price}
            onChange={handleGetValue}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Price"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={offerData.description}
            onChange={handleGetValue}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Description"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <select
            id="location"
            name="location"
            value={offerData.location}
            onChange={handleGetValue}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Location</option>
            <option value="moscow">Moscow</option>
            <option value="peter">Saint Petersburg</option>
            <option value="korea">South Korea</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="more"
          >
            More Information
          </label>
          <textarea
            id="more"
            name="more"
            value={offerData.more}
            onChange={handleGetValue}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="More Information"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="previewImage"
          >
            Preview Image
          </label>
          <input
            id="previewImage"
            type="file"
            name="previewImage"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="images"
          >
            Additional Images
          </label>
          <input
            id="images"
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Loading..." : "Add Special Offer"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddSpecialOffer;
