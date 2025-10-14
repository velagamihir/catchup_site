import React from "react";
import { useNavigate } from "react-router-dom";
import "../output.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
      <h1 className="text-6xl font-extrabold text-[#FF7F00] mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <button
              onClick={() => navigate("/home")}
        className="bg-[#FF7F00] text-white px-6 py-2  w-50 rounded-lg hover:opacity-90 transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
