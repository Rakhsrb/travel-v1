import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Eye, EyeClosed } from "@phosphor-icons/react";

const AddAdmin = () => {
  const [showPass, setShowPass] = useState(false);
  const { userData, baseUrlApi, config } = useSelector(
    (state) => state.mainSlice
  );

  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.isLogin) {
      navigate("/");
    }
  }, []);

  const handleGetValues = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const AddNewAdmin = async (e) => {
    e.preventDefault();
    const adminForm = {
      name: adminData.name,
      email: adminData.email,
      password: adminData.password,
    };
    try {
      const response = await axios.post(
        baseUrlApi + "api/admins/create",
        adminForm,
        config
      );
      setAdminData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/admins");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "New Admin Added",
        showConfirmButton: false,
        timer: 3500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-blue-100 flex flex-col justify-center items-center min-h-screen">
      <form
        className="border p-5 rounded-lg bg-white shadow-md w-full max-w-md"
        onSubmit={AddNewAdmin}
      >
        <h1 className="text-4xl font-semibold mb-7 text-center text-blue-900">New Admin</h1>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <input
              required
              value={adminData.name || ""}
              onChange={handleGetValues}
              placeholder="Enter Name"
              type="text"
              className="border rounded-md py-2 px-4 text-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              name="name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <input
              required
              value={adminData.email || ""}
              onChange={handleGetValues}
              placeholder="Enter Email"
              type="email"
              className="border rounded-md py-2 px-4 text-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              name="email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="border rounded-md py-2 px-4 text-md flex items-center gap-3 outline-none focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <input
                required
                value={adminData.password || ""}
                onChange={handleGetValues}
                type={showPass ? "text" : "password"}
                placeholder="Enter Password"
                className="outline-none w-full"
                name="password"
              />
              <span
                onClick={() => setShowPass((prev) => !prev)}
                className="cursor-pointer text-blue-700"
              >
                {!showPass ? <EyeClosed /> : <Eye />}
              </span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="py-2 bg-blue-700 hover:bg-blue-800 transition-colors duration-200 px-10 mt-8 w-full rounded-md text-white uppercase font-medium"
        >
          Add Admin
        </button>
      </form>
    </section>
  );
};

export default AddAdmin;
