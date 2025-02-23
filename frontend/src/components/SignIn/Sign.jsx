import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin, googleLogout, GoogleOAuthProvider } from "@react-oauth/google";
import { FaGoogle, FaGithub, FaDiscord } from "react-icons/fa";

export default function Sign() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const backendURL = "http://localhost:3000/api/v1";

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, password };

    try {
      const endpoint = isSignUp ? `${backendURL}/signup` : `${backendURL}/signIn`;
      const response = await axios.post(endpoint, userData);

      if (!isSignUp) {
        localStorage.setItem("token", response.data.token);
        login(response.data.token);
        toast.success("✨ Logged in successfully!", { autoClose: 3000 });
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        toast.success("🎉 Account created successfully!", { autoClose: 3000 });
      }
    } catch (error) {
      toast.error("⚠️ Authentication failed!", { autoClose: 3000 });
    }
  };

  const handleOAuthLogin = async (provider, code) => {
    try {
      const response = await axios.post(`${backendURL}/oauth/${provider}`, { code });

      localStorage.setItem("token", response.data.token);
      login(response.data.token);
      toast.success(`✅ ${provider} login successful!`);
      navigate("/dashboard");
    } catch (error) {
      toast.error(`❌ ${provider} login failed!`);
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">  
    <div className="h-screen bg-black text-white flex flex-col justify-center items-center space-y-8">
      <ToastContainer position="top-right" theme="dark" closeOnClick />

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-purple-400 shadow-lg drop-shadow-xl">
        {isSignUp ? "Create an Account" : "Welcome Back"}
      </h1>

      {/* Form */}
      <form onSubmit={handleFormSubmit} className="w-96 flex flex-col space-y-5">
        <input
          type="text"
          placeholder="Username"
          className="bg-gray-900 px-4 py-3 rounded-md text-white focus:ring-2 focus:ring-purple-500 transition-all outline-none shadow-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-900 px-4 py-3 rounded-md text-white focus:ring-2 focus:ring-purple-500 transition-all outline-none shadow-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-purple-600 px-4 py-3 rounded-md hover:bg-purple-700 transition-all text-lg font-semibold shadow-lg transform hover:scale-105 duration-200 ease-in-out"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

      {/* OAuth Login Buttons */}
      <div className="flex space-x-4">
        {/* Google Login */}
        <GoogleLogin
          onSuccess={(response) => {
            handleOAuthLogin("google", response.credential);
          }}
          onError={() => toast.error("❌ Google Login Failed!")}
          useOneTap
        />

        {/* GitHub Login */}
        <button
          onClick={() => window.location.href = `${backendURL}/oauth/github`}
          className="w-14 h-14 flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-lg transition transform hover:scale-110"
        >
          <FaGithub size={24} />
        </button>

        {/* Discord Login */}
        <button
          onClick={() => window.location.href = `${backendURL}/oauth/discord`}
          className="w-14 h-14 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition transform hover:scale-110"
        >
          <FaDiscord size={24} />
        </button>
      </div>

      {/* Toggle Sign In/Up */}
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="text-purple-400 hover:underline transition-all font-medium"
      >
        {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </button>

      {/* 🏠 Go to Landing Page Button */}
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 border-2 border-purple-500 text-purple-400 rounded-xl shadow-lg hover:bg-purple-500 hover:text-white transition-all transform hover:scale-105 duration-300 ease-in-out"
      >
        🏠 Go to Landing Page
      </button>
    </div>
    </GoogleOAuthProvider>
  );
}
