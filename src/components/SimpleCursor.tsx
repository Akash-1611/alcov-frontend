import { useEffect, useState } from 'react';

const SimpleCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', updatePosition);
    return () => document.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x - 10,
        top: position.y - 10,
        width: '20px',
        height: '20px',
        backgroundColor: 'red',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate3d(0, 0, 0)',
      }}
    />
  );
};

export default SimpleCursor;