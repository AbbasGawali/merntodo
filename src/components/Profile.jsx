import React, { useContext } from "react";
import { context } from "../main";
import Loader from "./Loader";
import { Navigate } from "react-router-dom";
import userImg from "../assets/imgs/user.png";

const Profile = () => {
  const { isAuthenticated, loader, setLoading, user } = useContext(context);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return loader ? (
    <Loader />
  ) : (
    <div className="bg-slate-200  bg-red w-full h-screen flex flex-col items-center justify-center">
      <div className="card bg-white h-[70%] w-[50%] flex flex-col  items-center justify-center ">
        <img src={userImg} className="w-[10rem]" alt="" />
        <h2 className="font-bold text-2xl">{user.name}</h2>
        <h3 className="mb-2">{user.email}</h3>
        <p className="w-[70%] text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius
          voluptatum eos qui molestiae. Vel laborum ut ea!
        </p>
      </div>

      {/* <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      <h1>{user._id}</h1>
      <h1>{user.createdAt?.slice(0, 10)}</h1> */}
    </div>
  );
};

export default Profile;
