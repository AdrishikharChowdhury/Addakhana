import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";
import Register from "./pages/Register/Register";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={!authUser ? <Register /> : <Navigate to="/chat" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/chat" />}
        />
        <Route
          path="/chat"
          element={authUser ? <Chat /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfileUpdate /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
};

export default App;
