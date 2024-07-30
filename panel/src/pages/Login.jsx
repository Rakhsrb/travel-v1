import { Eye, EyeClosed } from "@phosphor-icons/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../toolkit/Slicer";

const Login = () => {
  const { userData, baseUrlApi } = useSelector((state) => state.mainSlice);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [errorAdmin, setErrorAdmin] = useState({
    message: "",
    error: false,
  });
  const [errorPass, setErrorPass] = useState({
    message: "",
    error: false,
  });

  useEffect(() => {
    if (userData.isLogin) {
      navigate("/");
    }
  }, [userData.isLogin]);

  const handleGetValues = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(baseUrlApi + "api/admins/login", {
        ...userInfo,
      });
      if (response.data.AdminNotFound) {
        setErrorAdmin({
          ...errorAdmin,
          message: response.data.AdminNotFound,
          error: true,
        });
      }
      if (response.data.PasswordIsNotCorrect) {
        setErrorPass({
          ...errorPass,
          message: response.data.PasswordIsNotCorrect,
          error: true,
        });
      }
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("adminInfo", JSON.stringify(response.data.data));
        dispatch(checkLogin(true));
        setErrorAdmin({
          ...errorAdmin,
          message: "",
          error: false,
        });
        setErrorPass({
          ...errorPass,
          message: "",
          error: false,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col justify-center bg-blue-100 items-center h-screen ">
      <h1 className="text-slate-800 text-5xl">LOGIN</h1>
      <form
        className="flex flex-col w-full lg:w-1/2 xl:w-1/3 p-10 gap-4"
        onSubmit={loginUser}
      >
        {errorAdmin.error ? (
          <h1 className="text-xl text-red-600">{errorAdmin.message}</h1>
        ) : null}
        <input
          type="email"
          placeholder="Enter email"
          name="email"
          className="outline-none p-2 rounded-md text-lg"
          value={userInfo.email}
          onChange={handleGetValues}
        />
        {errorPass.error ? (
          <h1 className="text-xl text-red-600">{errorPass.message}</h1>
        ) : null}
        <div className="bg-white text-lg flex items-center gap-3 p-2 rounded-md">
          <input
            required
            type={showPass ? "text" : "password"}
            placeholder="Parol kiriting"
            className="outline-none w-full"
            name="password"
            value={userInfo.password}
            onChange={handleGetValues}
          />
          <span
            onClick={() => (showPass ? setShowPass(false) : setShowPass(true))}
          >
            {showPass ? <Eye /> : <EyeClosed />}
          </span>
        </div>
        <button
          type="submit"
          className="text-2xl p-2 bg-blue-700 text-white rounded-md"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </section>
  );
};

export default Login;
