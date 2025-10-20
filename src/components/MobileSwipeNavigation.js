import { useEffect, useRef, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function MobileSwipeNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const routes = useMemo(() => [
    '/',
    '/about',
    '/skills',
    '/projects',
    '/achievements',
    '/experience',
    '/education',
    '/contact'
  ], []);

  const currentIndex = routes.indexOf(location.pathname);

  useEffect(() => {
    // Only enable on touch devices
    if (!('ontouchstart' in window)) {
      return;
    }

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      setIsSwiping(true);
    };

    const handleTouchMove = (e) => {
      touchEndX.current = e.touches[0].clientX;
      touchEndY.current = e.touches[0].clientY;
      
      const diffX = touchEndX.current - touchStartX.current;
      const diffY = touchEndY.current - touchStartY.current;
      
      // Only show swipe animation if horizontal movement is greater than vertical
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Prevent going forward on first page or backward on last page
        if ((diffX > 0 && currentIndex === 0) || (diffX < 0 && currentIndex === routes.length - 1)) {
          setSwipeOffset(diffX * 0.2); // Reduced resistance effect
        } else {
          setSwipeOffset(diffX);
        }
      }
    };

    const handleTouchEnd = () => {
      const diffX = touchStartX.current - touchEndX.current;
      const diffY = touchStartY.current - touchEndY.current;
      
      // Only trigger swipe if horizontal movement is significantly greater than vertical
      const minSwipeDistance = 75;
      const maxVerticalMovement = 50;
      
      if (Math.abs(diffX) > minSwipeDistance && Math.abs(diffY) < maxVerticalMovement) {
        if (diffX > 0) {
          // Swiped left - go to next page
          if (currentIndex < routes.length - 1) {
            navigate(routes[currentIndex + 1]);
          }
        } else {
          // Swiped right - go to previous page
          if (currentIndex > 0) {
            navigate(routes[currentIndex - 1]);
          }
        }
      }
      
      // Reset swipe offset with animation
      setIsSwiping(false);
      setSwipeOffset(0);
    };

    // Add event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Cleanup
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, navigate, routes]);

  // Apply transform to the main content
  useEffect(() => {
    const mainContent = document.querySelector('.min-h-screen');
    if (mainContent) {
      mainContent.style.transform = `translateX(${swipeOffset}px)`;
      mainContent.style.transition = isSwiping ? 'none' : 'transform 0.3s ease-out';
    }
  }, [swipeOffset, isSwiping]);

  return null;
}

export default MobileSwipeNavigation;
