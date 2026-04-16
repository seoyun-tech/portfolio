import React, { createContext, useState, useEffect, useContext } from 'react';

const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <CursorContext.Provider value={mousePos}>
      {children}
      <div 
        className="cursor-dot" 
        style={{ 
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px`,
          transform: `translate(-50%, -50%)`,
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999
        }}
      />
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
