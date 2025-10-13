// src/pages/Login.jsx
import React, { useState } from "react";
// Import necessary Firebase Auth functions and the auth instance
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase"; // <-- Removed 'app'
import { useNavigate, Link } from "react-router-dom"; // <-- Added 'Link'

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  /**
   * Function to handle Google Sign-In using Firebase
   */
  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      // Open the Google sign-in popup
      const result = await signInWithPopup(auth, provider);

      // Login successful!
      const user = result.user;
      console.log("Firebase Google Login Successful! User:", user);

      // 🌟 Navigate to the news upload page, replacing the login page in history
      navigate("/newsUpload", { replace: true });
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error("Firebase Google Login Failed:", errorCode, errorMessage);

      // 🌟 Better error handling (using state or a toast library is ideal,
      // but sticking with alert for minimal change)
      alert(`Login failed (${errorCode}): ${errorMessage}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
      {/* --- HEADER --- */}
      <header className="bg-white shadow-sm border-b-2 border-[#FF7F00] px-8 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          CatchUp<span className="text-[#FF7F00] text-3xl">2.0</span>
        </h1>
        {/* 🌟 Changed <a> to <Link> for SPA navigation */}
        <Link
          to="/" // Go to the root path of the application
          className="text-gray-800 font-semibold hover:text-[#FF7F00] transition"
        >
          ← Back to Home
        </Link>
      </header>

      {/* -------------------------------------------------------------------------------------------------- */}
      {/* --- LOGIN SECTION --- */}
      <main className="flex-grow flex justify-center items-center px-4 py-10">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 border-t-4 border-[#FF7F00] text-center">
          <h2 className="text-2xl font-bold mb-3">Faculty Login Portal</h2>
          <div className="h-10"></div>
          {/* Attach the Firebase handler to the button's onClick */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading} // Disable button while the login process is running
            className={`flex items-center justify-center w-full bg-[#4285F4] text-white font-semibold py-3 rounded-lg transition duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#357ae8]"
            }`}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
              alt="Google Logo"
              className="w-6 h-6 bg-white rounded-full p-1 mr-3"
            />
            {loading ? "Signing In..." : "Login with Google"}
          </button>
        </div>
      </main>
      {/* -------------------------------------------------------------------------------------------------- */}
      {/* --- FOOTER --- */}
      <footer className="bg-white text-center border-t-2 border-[#FF7F00] py-4 text-gray-500 text-sm">
        © 2025 CatchUp2.0. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Login;
