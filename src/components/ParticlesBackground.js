import React, { useCallback, useState, useEffect } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ParticlesBackground = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    let scrollTimer;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => setIsScrolling(false), 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);
  
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesConfig = {
    fullScreen: {
      enable: false,
      zIndex: 0
    },
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: isMobile ? 60 : 120,
    interactivity: {
      events: {
        onClick: {
          enable: !isMobile,
          mode: 'push',
        },
        onHover: {
          enable: !isMobile && !isScrolling,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: isMobile ? 2 : 4,
        },
        repulse: {
          distance: isMobile ? 50 : 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ['#a855f7', '#ec4899', '#8b5cf6', '#d946ef'],
      },
      links: {
        color: '#a855f7',
        distance: isMobile ? 100 : 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: !isScrolling,
        outModes: {
          default: 'bounce',
        },
        random: false,
        speed: isMobile ? 0.5 : 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: isMobile ? 20 : 80,
      },
      opacity: {
        value: 0.5,
        random: true,
        animation: {
          enable: !isMobile,
          speed: 1,
          minimumValue: 0.1,
          sync: false,
        },
      },
      shape: {
        type: ['circle', 'triangle', 'polygon'],
        polygon: {
          sides: 6,
        },
      },
      size: {
        value: { min: 1, max: 5 },
        random: true,
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.1,
          sync: false,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <div className="particles-container">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
      />
    </div>
  );
};

export default ParticlesBackground;
