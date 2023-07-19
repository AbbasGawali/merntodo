import React from "react";
import error from "../assets/imgs/error.png";
const ErrPage = () => {
  return (
    <div>
      <div className="flex h-screen items-center justify-center flex-col">
        <img src={error} className="w-[6rem]" alt="" />
        <h3 className="text-4xl my-4">404</h3>
        <p className="text-3xl">Page Not Found </p>
      </div>
    </div>
  );
};

export default ErrPage;
