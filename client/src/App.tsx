import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import Hostel from "./pages/Hostel";
import Login from "./pages/Login";
import SendOtp from "./pages/SendOtp";
import Seater from "./pages/Seater";
import FAQ from "./pages/FAQ";
import HostelDetail from "./pages/HostelDetail";
import UserProfile from "./pages/User/UserProfile";
import Contact from "./pages/Contact";
import Dashboard from "./vendor/pages/Dashboard";
import { EmailContext } from "./context/EmailContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import NewLogin from "./pages/NewLogin";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/hostel" element={<Hostel />} />
          <Route path="/login" element={<NewLogin />} />
          <Route path="/send_otp" element={<SendOtp />} />
          <Route path="/seater" element={<Seater />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/view" element={<HostelDetail />} />
          <Route path="/user_profile" element={<UserProfile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthProvider>
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
};

export default App;
