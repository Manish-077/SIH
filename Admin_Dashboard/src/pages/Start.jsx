import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="start w-full h-screen flex justify-center items-center flex-col gap-5">
      <h1 className="text-4xl font-semibold tracking-tighter">Welcome to "ADMIN DASBOARD"</h1>
      <Link to="/login" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-900 transition">
        Lets Go
      </Link>
    </div>
  );
};

export default Start;
