import { PencilSimple, SignOut, TrashSimple } from "@phosphor-icons/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteAdmin } from "../toolkit/Slicer";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { baseUrlApi, config } = useSelector((state) => state.mainSlice);
  const admin = JSON.parse(localStorage.getItem("adminInfo"));
  const [loading, setLoading] = useState(false);

  const LogOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2196f3",
      cancelButtonColor: "#ffffff",
      confirmButtonText: "Yes, delete it",
    });
    if (confirm.isConfirmed) {
      try {
        await axios.delete(baseUrlApi + "api/admins/delete/" + id, config);
        dispatch(deleteAdmin(id));
        LogOut();
        Swal.fire({
          title: "Deleted!",
          text: "The admin has been deleted successfully.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error deleting admin:", error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred while deleting the admin.",
          icon: "error",
        });
      }
    }
    setLoading(false);
  };

  return (
    <section className="h-full flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl text-gray-800 mb-4">{admin?.name}</h1>
        <h2 className="text-xl text-gray-600 mb-6">{admin?.email}</h2>
        <div className="flex gap-4 items-center">
          <Link
            to={`edit-admin/${admin._id}`}
            className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded-md"
          >
            <PencilSimple />
            Edit Profile
          </Link>
          <button
            onClick={() => handleDelete(admin._id)}
            className="btn btn-danger bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading && <span className="spinner-border spinner-border-sm" />}
            <TrashSimple />
            Delete Admin
          </button>
          <button
            className="btn btn-secondary bg-gray-500 hover:bg-gray-600 text-white flex items-center gap-2 px-4 py-2 rounded-md"
            onClick={LogOut}
          >
            <SignOut />
            Log Out
          </button>
        </div>
      </div>
    </section>
  );
};
