import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { context } from "../main";
import { toast } from "react-hot-toast";
import { serverUrl } from "../App";
import axios from "axios";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, loader, setLoader } =
    useContext(context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const { data } = await axios.post(
        `${serverUrl}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoader(false);
    } catch (error) {
      toast.error(error.response.data.message);

      setIsAuthenticated(false);
      setLoader(false);
    }

    setEmail("");
    setPassword("");
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="form w-full h-screen flex flex-col items-center  justify-center">
      <form
        onSubmit={submitHandler}
        action=""
        className="flex flex-col items-center "
      >
        <input
          type="email"
          placeholder="Email"
          required
          autoComplete="on"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-2 py-2 border-[1px] w-[30rem] border-slate-400"
        />
        <input
          type="password"
          className="px-2 py-2 border-[1px] w-[30rem] border-slate-400 my-4"
          required
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          disabled={loader}
          className="text-lg text-center px-2 py-2 text-white font-bold duration-500 border-black border-[1px]  hover:bg-white hover:text-black   bg-black w-[13rem] "
        >
          Login
        </button>

        <h3 className="mt-4  text-right w-full">
          Don't Have an account{" "}
          <Link to="/signup" className="font-bold">
            Sign Up
          </Link>
        </h3>
      </form>
    </div>
  );
};

export default Login;
