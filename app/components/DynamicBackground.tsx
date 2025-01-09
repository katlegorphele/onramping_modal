import React, { useEffect, useState, ReactNode } from 'react';


interface DynamicBackgroundProps {
  children: ReactNode;
}

const DynamicBackground = ({ children }: DynamicBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate position as percentage of viewport
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div 
        className="absolute inset-0 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgb(238, 242, 255) 0%,
            rgb(224, 231, 255) 25%,
            rgb(199, 210, 254) 50%,
            rgb(165, 180, 252) 75%,
            rgb(129, 140, 248) 100%)`
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default DynamicBackground;