import React from "react";
import imgloader from "../assets/imgs/loader.gif";
const Loader = () => {
  return (
    <div> 
      <div className="flex h-[90vh] items-center justify-center flex-col">
        <img src={imgloader} className="w-[6rem]" alt="" />
        <p className="text-3xl">Loading ... </p>
      </div>
    </div>
  );
};

export default Loader;
