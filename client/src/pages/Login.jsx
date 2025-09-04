import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/authContext";
const Login = () => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({ ...prevLogin, [name]: value }));
  };
  const navigate = useNavigate();
  const { login: loginFn, user } = useAuthContext();
  // useEffect นั้นใช้สำหรับการในการโหลดหน้าเว็ป
  useEffect(
    () => {
      if (user) {
        navigate("/");
      }
    },
    //ถ้าไม่ได้ใส่อะไรเลยไปในนี้นั้นจะทำให้เรานั้นจะทำการ refresce หน้าเดียว
    [user]
  );

  const handleSubmit = async () => {
    console.log(123);
    try {
      const currentUser = await AuthService.login(
        login.username,
        login.password
      );

      if (currentUser.status === 200) {
        Swal.fire({
          title: "User login",
          text: "login succesfully",
          icon: "success",
        }).then(() => {
          setLogin({
            username: "",
            password: "",
          });
          loginFn(currentUser.data);
          navigate("/");
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "User login",
        text: error?.response?.data?.message,
        icon: "error",
      });
    }
  };

  const handleCancel = () => {
    setLogin({
      username: "",
      password: "",
    });
  };

  return (
    <div className="container mx-auto">
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Login
          </h1>
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                value={login.username}
                onChange={handleChange}
                className="w-full input input-bordered"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={login.password}
                onChange={handleChange}
                className="w-full input input-bordered"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-center items-center my-6 space-x-4">
              <button
                type="submit"
                className="btn bg-green-500 text-white px-6"
                onClick={handleSubmit}
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn bg-red-500 text-white px-6"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
