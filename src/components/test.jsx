"use client";
import React, { useEffect, useState } from "react";

// Utility function to create a new firefly
const createFirefly = () => ({
  id: Math.random(),
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  animationDuration: `${Math.random() * 5 + 5}s`,
});

const test = () => {
  const [fireflies, setFireflies] = useState([]);

  useEffect(() => {
    // Function to add a new firefly periodically
    const addFireflyPeriodically = () => {
      const newFirefly = createFirefly();
      setFireflies((currentFireflies) => [
        ...currentFireflies.slice(-14),
        newFirefly,
      ]);
    };

    // Set interval to add a new firefly every second
    const interval = setInterval(addFireflyPeriodically, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Inline styles for the firefly
  const fireflyStyle = {
    position: 'absolute',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(253, 255, 80, 0.5) 0%, rgba(217, 217, 217, 0) 100%)',
  };

  // Keyframes for animation
  const keyframes = `
    @keyframes move {
      from { transform: translateY(0); }
      to { transform: translateY(-10px); }
    }
  `;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -10, overflow: 'hidden' }}>
      <style>
        {keyframes}
      </style>
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          style={{
            ...fireflyStyle,
            top: firefly.top,
            left: firefly.left,
            animation: `move ${firefly.animationDuration} infinite alternate`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default test;
