import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/LandingPage/Header';
import Hero from './components/LandingPage/Hero';
import Features from './components/LandingPage/Features';
import Pricing from './components/LandingPage/Pricing';
import Footer from './components/LandingPage/Footer';
import ButtonGradient from './assets/ButtonGradient';
import DashbB from './components/Dashboard/Dashb';
import Sign from './components/SignIn/Sign';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Routes>
        <Route path="/login" element={<Sign/>} />
          <Route path="/dashboard" element={<DashbB/>} />
          <Route path="/" element={ 
            <>
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
             <Features/>
              <Pricing />
            </>
          } />
          
          {/* Add more routes here if needed */}
        </Routes>
        <Footer />
        </>}/>
        </Routes>
      </div>
      <ButtonGradient/>
    </Router>
  );
}

export default App;

