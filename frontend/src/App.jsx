import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import ButtonGradient from './assets/ButtonGradient';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Pricing />
            </>
          } />
          {/* Add more routes here if needed */}
        </Routes>
        <Footer />
      </div>
      <ButtonGradient/>
    </Router>
  );
}

export default App;

