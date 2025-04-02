import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/LandingPage/Header";
import Hero from "./components/LandingPage/Hero";
import Features from "./components/LandingPage/Features";
import Pricing from "./components/LandingPage/Pricing";
import Footer from "./components/LandingPage/Footer";
import ButtonGradient from "./assets/ButtonGradient";
import  SidebarDemo  from "./components/Dashboard/Dashb";
import Sign from "./components/SignIn/Sign";
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute component
import ShareBox from "./components/Dashboard/ui/sidebarComponents/ShareBox";
import SharableDashboard from "./components/Dashboard/ui/sharableDashB";
import ProfileLayout from "./components/Dashboard/ui/profilePage";


function App() {
  return (
    <Router>
      <AppWithRouter />
    </Router>
  );
}


function AppWithRouter() {
  

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
        <Route path="/profile"  element={<ProtectedRoute
              element={<ProfileLayout/>} // Protect the dashboard route
            />} />

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
