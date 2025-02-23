import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/LandingPage/Header";
import Hero from "./components/LandingPage/Hero";
import Features from "./components/LandingPage/Features";
import Pricing from "./components/LandingPage/Pricing";
import Footer from "./components/LandingPage/Footer";
import ButtonGradient from "./assets/ButtonGradient";
import { SidebarDemo } from "./components/Dashboard/Dashb";
import Sign from "./components/SignIn/Sign";
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute component
import { useAuthStore } from "./store";
import { useNavigate } from "react-router-dom";
import ShareBox from "./components/Dashboard/ui/sidebarComponents/ShareBox";
import SharableDashboard from "./components/Dashboard/ui/sharableDashB";


function App() {
  return (
    <Router>
      <AppWithRouter />
    </Router>
  );
}
import ProfileLayout from "./components/Dashboard/ui/profilePage";

function AppWithRouter() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if there's a token in localStorage on app load
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     login(token); // Log the user in using the token from localStorage
  //     navigate("/dashboard");  // Optionally navigate to the dashboard
  //   } else {
  //     navigate("/login");  // Optionally navigate to the login page if no token exists
  //   }
  // }, [login, navigate]); // Run this only once on initial load

  return (
    <div className="min-h-screen bg-black text-white">
      <Routes>
        {/* Login Page */}
     
        <Route path="/login" element={<Sign />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={<SidebarDemo />} // Protect the dashboard route
            />
          }
        />
        <Route path="/share/:hash" element={<SharableDashboard/>} />
        <Route path="/share" element={<SharableDashboard/>} />
        <Route path="/profile" element={<ProfileLayout />} />

        {/* Landing Page */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Hero />
              <Features />
              <Pricing />
              <Footer />
            </>
          }
        />
      </Routes>

      {/* Button Gradient Component */}
      <ShareBox /> 
      <ButtonGradient />
    </div>
  );
}

export default App;
