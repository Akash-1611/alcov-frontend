import { useEffect } from 'react';

const GlobalCursor = () => {
  useEffect(() => {
    console.log('GlobalCursor: Component mounted');
    
    // Create a container that can't be affected by other styles
    const container = document.createElement('div');
    container.id = 'cursor-container';
    container.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      pointer-events: none !important;
      z-index: 2147483647 !important;
      overflow: visible !important;
    `;
    
    // Create cursor element
    const cursor = document.createElement('div');
    cursor.id = 'global-cursor';
    cursor.style.cssText = `
      position: absolute !important;
      width: 40px !important;
      height: 40px !important;
      background: red !important;
      border: 3px solid yellow !important;
      border-radius: 50% !important;
      pointer-events: none !important;
      z-index: 2147483647 !important;
      top: 0 !important;
      left: 0 !important;
      margin-left: -20px !important;
      margin-top: -20px !important;
      transition: none !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      will-change: transform !important;
      box-shadow: 0 0 20px rgba(255,0,0,0.8) !important;
    `;
    
    container.appendChild(cursor);
    document.body.appendChild(container);
    console.log('GlobalCursor: Cursor element added to body', cursor);

    const updateCursor = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });
    };

    // Use window instead of document and capture phase
    window.addEventListener('mousemove', updateCursor, true);
    document.addEventListener('mousemove', updateCursor, true);
    document.body.addEventListener('mousemove', updateCursor, true);
    console.log('GlobalCursor: Mouse move listener added');

    return () => {
      console.log('GlobalCursor: Cleanup');
      window.removeEventListener('mousemove', updateCursor, true);
      document.removeEventListener('mousemove', updateCursor, true);
      document.body.removeEventListener('mousemove', updateCursor, true);
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, []);

  return null;
};

export default GlobalCursor;