import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditFeaturedDestination = () => {
  const { userData, baseUrlApi, config } = useSelector(
    (state) => state.mainSlice
  );
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [isPenging, setIsPending] = useState(false);

  const [featureData, setFeatureData] = useState({});

  useEffect(() => {
    async function getData(url) {
      try {
        setIsPending(true);
        const response = (
          await axios.get(url + "api/featuredDestinations/" + id)
        ).data.data;
        setFeatureData(response);
        setIsPending(false);
      } catch (error) {
        setIsPending(false);
        console.log(error);
      }
    }
    getData(baseUrlApi);
  }, [id]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.isLogin) {
      navigate("/");
    }
  }, [userData, navigate]);

  const handleGetValue = (e) => {
    const { name, value } = e.target;
    setFeatureData((prevData) => ({ ...prevData, [name]: value }));
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
      setFeatureData((prevData) => ({
        ...prevData,
        [name]: name === "image" ? data.images[0] : null,
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
      await axios.put(
        baseUrlApi + "api/featuredDestinations/edit/" + id,
        featureData,
        config
      );
      setFeatureData({
        location: "",
        image: "",
      });
      setLoading(false);
      navigate("/featured-destinations");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "New Feature Has Been Added",
        showConfirmButton: false,
        timer: 3500,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Failed to add new Feature. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#ecfeff] h-screen overflow-y-auto p-40 flex flex-col justify-center items-center">
      {isPenging ? (
        "Loading"
      ) : (
        <>
          {" "}
          <h1 className="text-5xl mb-4">Add New Feature</h1>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white shadow-md rounded p-10"
          >
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
                value={featureData.location}
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
                htmlFor="previewImage"
              >
                Image
              </label>
              <input
                id="previewImage"
                type="file"
                name="image"
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
        </>
      )}
    </section>
  );
};

export default EditFeaturedDestination;
