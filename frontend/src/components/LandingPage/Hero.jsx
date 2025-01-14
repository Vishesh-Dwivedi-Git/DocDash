import React from 'react';
import { Link } from 'react-scroll';
import Button from '../design/Button';
import { GridBackgroundDemo } from '../design/GridBackgroundDemo';

export default function Hero() {
  return (
    
    <div id="Home" className="bg-black text-white py-24  ">
      <div className="container mx-auto px-4 font-grotesk">
      <GridBackgroundDemo>
        <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-4">
          Store Your Digital Life <br /> Securely and Easily
        </h1>
        </GridBackgroundDemo>
        <br />
        <p className="text-xl text-center text-gray-300 mb-6">
          Your one-stop solution for storing files, videos, and documents.
        </p>
        <div className="flex justify-center">
          <Link
            to="features"
            smooth={true} 
            className='z-0'
          ><Button className="font-code font-semibold text-lg"> Explore Features</Button>
          </Link>
          
        </div>
      </div>
    </div>
    
  );
}

