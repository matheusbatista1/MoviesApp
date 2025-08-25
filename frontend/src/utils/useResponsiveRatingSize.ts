import { useEffect, useState } from 'react';

const MOBILE_SIZE = 110;
const TABLET_SIZE = 100;
const DESKTOP_SIZE = 160;

export function useResponsiveRatingSize() {
  const [size, setSize] = useState(DESKTOP_SIZE);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 640) {
        setSize(MOBILE_SIZE);
      } else if (width < 1024) {
        setSize(TABLET_SIZE); 
      } else {
        setSize(DESKTOP_SIZE);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
