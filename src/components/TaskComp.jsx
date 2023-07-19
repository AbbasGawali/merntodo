import React from "react";

const TaskComp = ({ id, title, description, updateHandler, deleteHandler }) => {
  return (
    <div className="flex justify-between px-4 items-center mt-8 bg-white py-8 w-[70%]">
      <div className="data">
        <h3 className="font-bold ">{title}</h3>
        <p>{description}</p>
      </div>
      <div className="functions flex items-center ">
        <input
          onClick={()=>updateHandler(id)}
          className="w-[28px] h-[28px] mr-4"
          type="checkbox"
        />
        <button
          onClick={()=>deleteHandler(id)}
          className="bg-black border text-white px-8 py-[4px] border-black  hover:bg-white hover:text-black duration-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskComp;
