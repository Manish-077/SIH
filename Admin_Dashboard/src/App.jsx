import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Farmers from "./pages/Farmers";
import Analytics from "./pages/Analytics";
import Data from "./pages/Data";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/farmers" element={<Farmers />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/data" element={<Data />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
