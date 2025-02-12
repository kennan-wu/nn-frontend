"use client";

import { useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/images/gold_leaf_brain_1.jpg",
    "/images/gold_leaf_brain_2.jpg",
    "/images/gold_leaf_brain_3.jpg",
    "/images/gold_leaf_brain_4.jpg",
    "/images/gold_leaf_brain_5.jpg",
  ];

  const handleAnimationEnd = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    console.log(images[currentIndex]);
  };

  return (
    <div className="relative min-h-screen w-screen p-7 bg-black flex justify-center items-center sm:justify-start sm:items-start sm:p-0 flex-col">
      <div className="bg-white flex-grow z-10 relative max-w-full min-w-96 p-16 auth-window">
        <div className="w-full h-full">
          <div className="logo-with-name">
            <img src="/images/neural-labs-logo.png" className="logo-sm" />
            <p className="logo-name">neural labs</p>
          </div>
          {children}
        </div>
      </div>
      <div
        className="absolute inset-0 bg-cover bg-center z-0 bg-pan-slideshow"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
        onAnimationIteration={handleAnimationEnd}
      ></div>
    </div>
  );
}
