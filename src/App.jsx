import React, { useContext, useEffect } from "react";
// import BrowserRouter as Router from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { context } from "./main";
import ErrPage from "./components/ErrPage";

export const serverUrl = "https://backendnodejs-todoapp2.onrender.com/api/v1";

const App = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    loader,
    setLoader,
    user,
    setUser,
  } = useContext(context);

  useEffect(() => {
    try {
      setLoader(true);
      axios
        .get(`${serverUrl}/users/getMyProfile`, {
          withCredentials: true,
        })
        .then((res) => {
          setUser(res.data.user);
          setIsAuthenticated(true);
          setLoader(false);
        })
        .catch((err) => {
          setUser({});
          setIsAuthenticated(false);
          setLoader(false);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<ErrPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
