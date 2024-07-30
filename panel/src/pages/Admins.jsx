import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  getAdminsError,
  getAdminsPending,
  getAdminsSuccess,
} from "../toolkit/Slicer";

export const Admins = () => {
  const { admins, baseUrlApi, config } = useSelector(
    (state) => state.mainSlice
  );
  const dispatch = useDispatch();
  const { data, isError, isPending } = admins;

  useEffect(() => {
    async function getData(url) {
      try {
        dispatch(getAdminsPending());
        const response = (await axios.get(url + "api/admins/", config)).data
          .data;
        dispatch(getAdminsSuccess(response));
      } catch (err) {
        dispatch(getAdminsError());
        console.log(err);
      }
    }
    getData(baseUrlApi);
  }, [dispatch, baseUrlApi, config]);

  const deleteAdmin = async (id) => {
    try {
      await axios.delete(baseUrlApi + "api/admins/delete/" + id, config);
      const newData = data.filter((item) => item._id !== id);
      dispatch(getAdminsSuccess(newData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen p-5 bg-blue-50">
      <div className="h-[20vh] flex justify-between items-center mb-8">
        <h1 className="text-5xl font-semibold text-blue-900">Admins</h1>
        <Link
          to={"/add-admin"}
          className="bg-green-700 hover:bg-green-800 transition-colors duration-200 py-3 px-5 rounded-md text-white font-semibold"
        >
          Create New Admin
        </Link>
      </div>
      <table className="w-full bg-white rounded-md shadow-md overflow-hidden">
        <thead className="bg-sky-700 text-white">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <tr className="border-t">
              <td className="p-4" colSpan="3">
                Loading...
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((elem) => (
              <tr key={elem._id} className="border-t text-sky-700">
                <td className="p-4">
                  <Link
                    to={`/admin/${elem._id}`}
                    className="hover:border-b hover:border-sky-700"
                  >
                    {elem.name}
                  </Link>
                </td>
                <td className="p-4">
                  <Link
                    to={`/admin/${elem._id}`}
                    className="hover:border-b hover:border-sky-700"
                  >
                    {elem.email}
                  </Link>
                </td>
                <td className="p-4 flex gap-3">
                  <Link
                    to={`/edit-admin/${elem._id}`}
                    className="bg-cyan-600 hover:bg-cyan-700 transition-colors duration-200 text-white rounded-md py-1 px-3"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteAdmin(elem._id)}
                    className="bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white rounded-md py-1 px-3"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="border-t">
              <td className="p-4" colSpan="3">
                No Data...
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {isError && (
        <div className="text-red-600 mt-4 text-center">
          An error occurred while fetching the data.
        </div>
      )}
    </section>
  );
};
