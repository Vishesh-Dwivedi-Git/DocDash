import React, { useState } from 'react';
import { Link } from 'react-scroll';
import Button from '../design/Button';
import '../../index.css';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../Store';

const navigation = [
  { name: 'Home', href: 'Home' },
  { name: 'Features', href: 'features' },
  { name: 'Pricing', href: 'pricing' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const login=useAuthStore((state)=>state.login);
  const isAutnenticated=useAuthStore((state)=>state.isAuthenticated);
  const navigate=useNavigate();

  return (
    <nav className="bg-black bg-opacity-60 backdrop-blur-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20"> {/* Increased height */}
          {/* Left Section: Product Name */}
          <div className="flex-shrink-0">
            <span className="text-purple-400 font-code font-bold  cursor-pointer text-xl">DocDash</span>
          </div>

          {/* Center Section: Navigation */}
          <div className="hidden md:flex">
            <div className="flex space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  smooth={true}
                  duration={500}
                  className="font-sora text-gray-200 hover:text-purple-400 hover:shadow-lg px-4 py-2 rounded-lg text-lg font-semibold transition-all cursor-pointer"
                  activeClass="text-white bg-gray-700"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section: Sign In (aligns with nav items) */}
          <div className="hidden md:flex items-center"> {/* Added flex and items-center */}
          <Button  className="font-code font-semibold text-lg">

                  <button 
                   onClick={() => {
                      const token = localStorage.getItem("token");
                      if (token) {
                          login(token);  // Log in using stored token
                           navigate("/dashboard");  //  Redirect to dashboard if token exists
                       } else {
                            navigate("/login");  // Go to login page if no token
                            }
                          }}
                    className="font-code font-semibold text-lg"
                                >
                          Get Started
                      </button>

           </Button>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="-mr-2 flex md:hidden">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-md text-gray-400 hover:text-white focus:ring-2 transition-all"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden h-screen items-center justify-center flex" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 -space-y-40 flex flex-col justify-center items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                smooth={true}
                duration={500}
                className="font-code text-gray-200 hover:text-purple-400 block px-3 py-2 rounded-md font-semibold transition-all cursor-pointer text-lg"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button  className="font-code font-semibold text-lg">

             <button 
            onClick={() => {
            const token = localStorage.getItem("token");
              if (token) {
             login(token);  // Log in using stored token
             navigate("/dashboard");  //  Redirect to dashboard if token exists
            } else {
             navigate("/login");  // Go to login page if no token
           }
           console.log(isAutnenticated);
         }}
           className="font-code font-semibold text-lg"
         >
     Get Started
</button>

            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
