import React from "react";

export function GridBackgroundDemo({children}) {
  return (
    (<div
      className="h-[15rem] w-full dark:bg-black bg-black  dark:bg-grid-white/[0.2] bg-grid-white/[0.3] relative flex items-center rounded-lg  justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div
        className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p
        className="text-4xl sm:text-7xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-200 py-8">
       {children}
      </p>
    </div>)
  );
}
