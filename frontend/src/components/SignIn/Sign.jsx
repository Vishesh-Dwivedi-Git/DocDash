import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { FaGoogle, FaGithub, FaDiscord } from "react-icons/fa";

export default function Sign() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const backendURL = "http://localhost:3000/api/v1";

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      login(token);
      toast.success("✅ Login successful!");
      navigate("/dashboard");
    }
  }, [navigate, login]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(username)) {
      setEmailError("Invalid email address");
      return;
    }
    setEmailError("");
    const userData = { username, password };

    try {
      const endpoint = isSignUp ? `${backendURL}/signup` : `${backendURL}/signIn`;
      const response = await axios.post(endpoint, userData);
      const token = response.data.token;

      localStorage.setItem("token", token);
      login(token);
      toast.success(isSignUp ? "🎉 Account created successfully!" : "✨ Logged in successfully!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      toast.error("⚠️ Authentication failed! Check your credentials.");
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">  
      <div className="h-screen bg-black text-white flex flex-col justify-center items-center space-y-8">
        <ToastContainer position="top-right" theme="dark" closeOnClick />

        <h1 className="text-4xl font-extrabold text-purple-400 shadow-lg drop-shadow-xl">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h1>

        <form onSubmit={handleFormSubmit} className="w-96 flex flex-col space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="bg-gray-900 px-4 py-3 rounded-md text-white focus:ring-2 focus:ring-purple-500 outline-none shadow-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-900 px-4 py-3 rounded-md text-white focus:ring-2 focus:ring-purple-500 outline-none shadow-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-purple-600 px-4 py-3 rounded-md hover:bg-purple-700 text-lg font-semibold shadow-lg transform hover:scale-105 duration-200 ease-in-out"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="flex space-x-4">
          <GoogleLogin
            onSuccess={(response) => window.location.href = `${backendURL}/oauth/google?token=${response.credential}`}
            onError={() => toast.error("❌ Google Login Failed!")}
            useOneTap
          />

          <button
            onClick={() => window.location.href = `${backendURL}/oauth/github`}
            className="w-14 h-14 flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-lg transform hover:scale-110"
          >
            <FaGithub size={24} />
          </button>

          <button
            onClick={() => window.location.href = `${backendURL}/oauth/discord`}
            className="w-14 h-14 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transform hover:scale-110"
          >
            <FaDiscord size={24} />
          </button>
        </div>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-purple-400 hover:underline font-medium"
        >
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 border-2 border-purple-500 text-purple-400 rounded-xl shadow-lg hover:bg-purple-500 hover:text-white transform hover:scale-105"
        >
          🏠 Go to Landing Page
        </button>
      </div>
    </GoogleOAuthProvider>
  );
}
