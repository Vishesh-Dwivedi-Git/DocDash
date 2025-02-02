import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuthStore } from "../../store";

export default function Sign() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login=useAuthStore((state)=>state.login);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const userData = {
      username,
      password
    };
  
    try {
      const endpoint = isSignUp ? "http://localhost:3000/api/v1/signup" : "http://localhost:3000/api/v1/signIn";
      const response = await axios.post(endpoint, userData);
  
      if (!isSignUp) {
        // If sign-in, save the token and navigate to the dashboard
        localStorage.setItem('token', response.data.token);
        login(response.data.token);
        navigate("/dashboard"); // Redirect to dashboard after successful sign-in
      } else {
        // If sign-up, alert the user and do not navigate
        alert("User created successfully");
      }
  
      // Handle successful response, like saving token or user data
      console.log(response.data);
    } catch (error) {
      console.error("Error during authentication:", error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div className="h-screen bg-black text-white flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-6">
        {isSignUp ? "Sign Up" : "Sign In"}
      </h1>
      <form onSubmit={handleFormSubmit} className="w-80 flex flex-col space-y-4">
        <input
          type="username"
          placeholder="Email"
          className="bg-gray-800 px-4 py-2 rounded-md text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-800 px-4 py-2 rounded-md text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-purple-500 px-4 py-2 rounded-md hover:bg-purple-600 transition"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="mt-4 text-purple-400 hover:underline"
      >
        {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
}
