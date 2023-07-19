import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { context } from "../main";
import { toast } from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "../App";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loader, setLoader } =
    useContext(context);

  const logoutHandler = async () => {
    try {
      setLoader(true);
      await axios.get(
        `${serverUrl}/users/logout`,

        {
          withCredentials: true,
        }
      );
      toast.success("Logout Successfull");
      setIsAuthenticated(false);
      setLoader(false);
    } catch (error) {
      toast.error("Logout Failed");
      console.log(error);

      setIsAuthenticated(true);
      setLoader(false);
    }
  };

  return (
    <div className="text-2xl w-full flex items-center justify-between text-white bg-slate-900 px-4 py-4">
      <Link to={"/"} className="cursor-pointer">
        Todo App.
      </Link>
      <div className="links text-xl ">
        <Link
          to="/"
          className=" px-6 py-2 mx-1 duration-500 hover:bg-white hover:text-black "
        >
          Home
        </Link>
        <Link
          to="/profile"
          className="px-6 py-2 mx-1 duration-500 hover:bg-white hover:text-black"
        >
          Profile
        </Link>

        {isAuthenticated ? (
          <button
            onClick={logoutHandler}
            className="px-6 py-2 mx-1 hover:bg-white duration-500 hover:text-black"
            disabled={loader}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="px-6 py-2 mx-1 hover:bg-white duration-500 hover:text-black"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
