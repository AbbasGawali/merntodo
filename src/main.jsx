import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

export const context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({});

  return (
    <context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loader,
        setLoader,
        user,
        setUser,
      }}
    >
      <App />
    </context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AppWrapper />
  </>
);
