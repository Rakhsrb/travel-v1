import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteBlog,
  getBlogsError,
  getBlogsPending,
  getBlogsSuccess,
} from "../toolkit/Slicer";

export const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, baseUrlApi, config } = useSelector((state) => state.mainSlice);
  const { data, isError, isPending } = blogs;

  useEffect(() => {
    async function getData(url) {
      try {
        dispatch(getBlogsPending());
        const response = (await axios.get(url + "api/blogs/")).data.data;
        dispatch(getBlogsSuccess(response));
      } catch (error) {
        dispatch(getBlogsError());
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
        await axios.delete(baseUrlApi + "api/blogs/delete/" + id, config);
        dispatch(deleteBlog(id));
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
        <h1 className="text-5xl font-semibold text-blue-900">Blogs</h1>
        <Link
          to={"/add-blog"}
          className="bg-green-700 hover:bg-green-800 transition-colors duration-200 py-3 px-5 rounded-md text-white font-semibold"
        >
          Add New Blog
        </Link>
      </div>
      <table className="w-full bg-white rounded-md shadow-md overflow-hidden">
        <thead className="bg-sky-700 text-white">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isError ? (
            isPending ? (
              <tr className="border-t">
                <td className="p-4 text-center" colSpan="3">
                  Loading...
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((elem) => (
                <tr key={elem._id} className="border-t">
                  <td className="p-4">{elem.title}</td>
                  <td className="p-4">
                    {elem.previewImage ? (
                      <img
                        src={elem.previewImage}
                        className="w-20 h-20 object-cover"
                        alt={elem.title}
                      />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td className="p-4 flex gap-3">
                    <Link
                      to={`/edit-blog/${elem._id}`}
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
                <td className="p-4 text-center" colSpan="3">
                  No Data...
                </td>
              </tr>
            )
          ) : (
            <tr className="border-t">
              <td className="p-4 text-center text-red-600" colSpan="3">
                Not Found. Something went wrong
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};
