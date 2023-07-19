import React, { useContext, useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-hot-toast";
import TaskComp from "./TaskComp";
import { context } from "../main";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  const { isAuthenticated } = useContext(context);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${serverUrl}/tasks/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.mesage);
      setRefreshData((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.mesage);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${serverUrl}/tasks/${id}`, {
        withCredentials: true,
      });

      toast.success(data.mesage);
      setRefreshData((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.mesage);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${serverUrl}/tasks/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setTitle("");
      setDescription("");
      setLoading(false);

      setRefreshData((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${serverUrl}/tasks/getAllTask`, {
        withCredentials: true,
      })
      .then((res) => {
        setTask(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refreshData]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="min-h-screen bg-slate-200 w-full flex flex-col items-center">
      <form
        onSubmit={submitHandler}
        action=""
        className="flex flex-col items-center mt-8 bg-white py-16 w-[70%]"
      >
        <input
          type="text"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="w-[70%]  px-4 py-4 outline-none border border-slate-400"
          placeholder="Task Title"
        />
        <input
          type="text"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          className="  w-[70%] px-4 py-4 my-4 outline-none border border-slate-400"
          placeholder="Task Description"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-black border border-black  hover:bg-white hover:text-black duration-500 px-16 py-[0.7rem] text-white"
        >
          Add Task
        </button>
      </form>

      {/* {task.toReversed().map((item) => {})} */}
      {task.map((item) => (
        <TaskComp
          id={item._id}
          key={item._id}
          title={item.title}
          description={item.description}
          updateHandler={updateHandler}
          deleteHandler={deleteHandler}
        />
      ))}
    </div>
  );
};

export default Home;
