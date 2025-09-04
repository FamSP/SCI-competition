import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const register = () => {
  const [register, setRegister] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((Register) => ({ ...Register, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log(123);
    try {
      const newUser = await AuthService.register(
        register.username,
        register.name,
        register.email,
        register.password
      );

      if (newUser.status === 200) {
        Swal.fire({
          title: "User Register",
          text: newUser.data.message,
          icon: "success",
        });
        setRegister({
          username: "",
          name: "",
          email: "",
          password: "",
        });
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        title: "User Register",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="container mx-auto ">
      <h1 className="title justify-center text-3xl text-center m-5 p-5">
        {" "}
        Regiter
      </h1>
      <div className="mt-10">
        <div className="flex justify-center">
          <fieldset className="fieldset">
            <legend className="fieldset-legend jus">Username</legend>
            <input
              type="text"
              value={register.username}
              name="username"
              onChange={handleChange}
              className="input input-bordered input-lg w-[700px]"
              placeholder="USERNAME"
            />
          </fieldset>
        </div>

        <div className="flex justify-center space-y-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend jus">Name</legend>
            <input
              type="text"
              value={register.name}
              name="name"
              onChange={handleChange}
              className="input input-bordered input-lg w-[700px]"
              placeholder="NAME"
            />
          </fieldset>
        </div>
        <div className="flex justify-center space-y-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend jus">Email</legend>
            <input
              type="text"
              name="email"
              value={register.email}
              onChange={handleChange}
              className="input input-bordered input-lg w-[700px]"
              placeholder="EMAIL"
            />
          </fieldset>
        </div>
        <div className="flex justify-center space-y-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend jus">Password</legend>
            <input
              type="password"
              name="password"
              value={register.password}
              onChange={handleChange}
              className="input input-bordered input-lg w-[700px]"
              placeholder="PASSWORD"
            />
          </fieldset>
        </div>
      </div>

      <div className="flex justify-end gap-5 px-80 mt-10">
        <button className="btn btn-accent" onClick={handleSubmit}>
          Add
        </button>
        <a className="btn btn-error">Cancel</a>
      </div>
    </div>
  );
};

export default register;
