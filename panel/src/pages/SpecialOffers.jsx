import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteSpecialOffer,
  getSpecialOffersError,
  getSpecialOffersPending,
  getSpecialOffersSuccess,
} from "../toolkit/Slicer";

export const SpecialOffers = () => {
  const dispatch = useDispatch();
  const { specialOffers, baseUrlApi, config } = useSelector(
    (state) => state.mainSlice
  );
  const { data, isError, isPending } = specialOffers;

  useEffect(() => {
    async function getData(url) {
      try {
        dispatch(getSpecialOffersPending());
        const response = (await axios.get(url + "api/specialOffers/")).data
          .data;
        dispatch(getSpecialOffersSuccess(response));
      } catch (error) {
        dispatch(getSpecialOffersError());
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
        dispatch(deleteSpecialOffer(id));
        await axios.delete(
          baseUrlApi + "api/specialOffers/delete/" + id,
          config
        );
        Swal.fire({
          title: "Deleted!",
          icon: "success",
        });
      } catch (error) {
        console.error("Error deleting project:", error);
        Swal.fire({
          title: "Failed to delete project!",
          icon: "error",
        });
      }
    }
  };

  return (
    <section className="h-screen pt-5 pb-32 px-7 bg-blue-50 overflow-y-auto">
      <div className="h-[20vh] flex justify-between items-center mb-8">
        <h1 className="text-5xl font-semibold text-blue-900">Special Offers</h1>
        <Link
          to={"/add-offer"}
          className="bg-green-700 hover:bg-green-800 transition-colors duration-200 py-3 px-5 rounded-md text-white font-semibold"
        >
          Add New Offer
        </Link>
      </div>
      <table className="w-full bg-white rounded-md shadow-md overflow-hidden">
        <thead className="bg-sky-700 text-white">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Category</th>
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
                  <td className="p-4">{elem.title}</td>
                  <td className="p-4">
                    <img
                      src={elem.previewImage}
                      className="mx-auto w-20 h-20 object-cover"
                      alt={elem.title}
                    />
                  </td>
                  <td className="p-4">{elem.price.toLocaleString()} So'm</td>
                  <td className="p-4">{elem.category}</td>
                  <td className="p-4 flex gap-3">
                    <Link
                      to={`/special-offer/${elem._id}`}
                      className="bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white rounded-md py-1 px-3"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit-special-offer/${elem._id}`}
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
