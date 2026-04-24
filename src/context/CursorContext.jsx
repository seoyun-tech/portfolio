import { useState, useEffect } from 'react';

export const CursorProvider = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  useEffect(() => {
    if (isTouchDevice) return;
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouchDevice]);

  return (
    <>
      {children}
      {!isTouchDevice && (
        <div
          className="cursor-dot"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transform: 'translate(-50%, -50%)',
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        />
      )}
    </>
  );
};
