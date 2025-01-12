import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">About Us</h3>
            <p className="text-gray-400">We provide secure and easy-to-use file storage solutions for individuals and businesses.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/#features" className="text-gray-400 hover:text-white">Features</Link></li>
              <li><Link to="/#pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              {/* Add social media icons here */}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

