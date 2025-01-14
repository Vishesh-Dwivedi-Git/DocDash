import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sign() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform sign-in/sign-up logic here (e.g., API calls)
    navigate("/dashboard"); // Redirect to dashboard after success
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-6">
        {isSignUp ? "Sign Up" : "Sign In"}
      </h1>
      <form onSubmit={handleFormSubmit} className="w-80 flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="bg-gray-800 px-4 py-2 rounded-md text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-800 px-4 py-2 rounded-md text-white"
          required
        />
        {isSignUp && (
          <input
            type="text"
            placeholder="Full Name"
            className="bg-gray-800 px-4 py-2 rounded-md text-white"
          />
        )}
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
