"use client";
import Link from 'next/link';
import React from 'react';
import { redirect } from "next/navigation";

export function RedirectionActivationEmail({ timer, url, arialLabel }) {
  const [count, setCount] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const intervalRef = React.useRef(null);
  const [speed, setSpeed] = React.useState(0);
  
  React.useEffect(() => {
    const taille = 100;
    const calculatedSpeed = Math.round(timer / taille);
    setSpeed(calculatedSpeed);
    return () => clearInterval(intervalRef.current);
  }, [timer]);

  React.useEffect(() => {
    if (count >= 100) {
      redirect(`${url}`);
    }
    
    const incrementTime = () => {
      setCount((prev) => prev + 1);
    };
    
    if (!isHovered && speed > 0) {
      intervalRef.current = setInterval(incrementTime, speed);
    } else {
      clearInterval(intervalRef.current);
    }
    
    return () => clearInterval(intervalRef.current);
  }, [count, isHovered, speed, url]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Link href={`${url}`} aria-label={arialLabel}>
        <button
          className="relative bg-neutral-300 py-2 px-4 rounded-xl md:hover:fill-mahogany-950 md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-ha w-48"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            overflow: 'hidden',
          }}
        >
          <div
            className="absolute bottom-0 left-0 bg-neutral-400 transition-all duration-100 ease-linear"
            style={{
              width: `${count}%`,
              height: '100%',
              opacity: isHovered ? 0 : 1
            }}
          />
          <p className="relative z-10">Redirection</p>
        </button>
      </Link>
    </div>
  );
}