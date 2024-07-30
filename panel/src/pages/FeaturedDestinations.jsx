import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteFeaturedDestination,
  getFeaturedDestinationsError,
  getFeaturedDestinationsPending,
  getFeaturedDestinationsSuccess,
} from "../toolkit/Slicer";

export const FeaturedDestinations = () => {
  const dispatch = useDispatch();
  const { featuredDestinations, baseUrlApi, config } = useSelector(
    (state) => state.mainSlice
  );
  const { data, isError, isPending } = featuredDestinations;

  useEffect(() => {
    async function getData(url) {
      try {
        dispatch(getFeaturedDestinationsPending());
        const response = (await axios.get(url + "api/featuredDestinations/"))
          .data.data;
        dispatch(getFeaturedDestinationsSuccess(response));
      } catch (error) {
        dispatch(getFeaturedDestinationsError());
        console.log(error);
      }
    }
    getData(baseUrlApi);
  }, [dispatch, baseUrlApi]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      try {
        await axios.delete(
          baseUrlApi + "api/featuredDestinations/delete/" + id,
          config
        );
        dispatch(deleteFeaturedDestination(id));
        Swal.fire({
          title: "Deleted!",
          icon: "success",
        });
      } catch (error) {
        console.error("Error deleting project:", error);
        Swal.fire({
          title: "Error!",
          icon: "error",
        });
      }
    }
  };

  return (
    <section className="min-h-screen p-5 bg-blue-50">
      <div className="h-[20vh] flex justify-between items-center mb-8">
        <h1 className="text-5xl font-semibold text-blue-900">
          Featured Destinations
        </h1>
        <Link
          to={"/add-featured-destination"}
          className="bg-green-700 hover:bg-green-800 transition-colors duration-200 py-3 px-5 rounded-md text-white font-semibold"
        >
          Add New Feature
        </Link>
      </div>
      <table className="w-full bg-white rounded-md shadow-md overflow-hidden">
        <thead className="bg-sky-700 text-white">
          <tr>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isError ? (
            isPending ? (
              <tr className="border-t">
                <td className="p-4 text-center" colSpan="4">
                  Loading...
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((elem) => (
                <tr key={elem._id} className="border-t">
                  <td className="p-4 flex justify-center">
                    {elem.image ? (
                      <img
                        src={elem.image}
                        className="w-20 h-20 object-cover rounded-lg"
                        alt={elem.title}
                      />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td className="p-4">{elem.location}</td>
                  <td className="p-4 flex gap-3">
                    <Link
                      to={`/edit-featured-destination/${elem._id}`}
                      className="bg-cyan-600 hover:bg-cyan-700 transition-colors duration-200 text-white rounded-md py-1 px-3"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(elem._id)}
                      className="bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white rounded-md py-1 px-3"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-t">
                <td className="p-4 text-center" colSpan="4">
                  No Data...
                </td>
              </tr>
            )
          ) : (
            <tr className="border-t">
              <td className="p-4 text-center text-red-600" colSpan="4">
                Not Found. Something went wrong
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};
