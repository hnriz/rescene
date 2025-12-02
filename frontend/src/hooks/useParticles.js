import { useEffect, useRef } from 'react';

export const useParticles = () => {
  const particlesRef = useRef([]);
  const containerRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const initParticles = () => {
      if (!containerRef.current) return;

      const particleCount = 60;
      
      for (let i = 0; i < particleCount; i++) {
        createParticle();
      }

      animate();
    };

    const createParticle = () => {
      if (!containerRef.current) return;

      const particle = document.createElement('div');
      const size = Math.random() * 3 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const hue = 50;
      const saturation = 90;
      const lightness = Math.random() * 20 + 60;
      const alpha = Math.random() * 0.5 + 0.3;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha});
        border-radius: 50%;
        left: ${posX}%;
        top: ${posY}%;
        box-shadow: 0 0 ${size * 2}px ${size}px hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 0.5});
        opacity: 0;
      `;

      containerRef.current.appendChild(particle);

      particlesRef.current.push({
        element: particle,
        x: posX,
        y: posY,
        size,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: alpha,
        hue,
        saturation,
        lightness,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseSize: 0
      });
    };

    const animate = () => {
      updateParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    const updateParticles = () => {
      particlesRef.current.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x <= 0 || particle.x >= 100) {
          particle.speedX *= -1;
          particle.x = Math.max(0, Math.min(100, particle.x));
        }

        if (particle.y <= 0 || particle.y >= 100) {
          particle.speedY *= -1;
          particle.y = Math.max(0, Math.min(100, particle.y));
        }

        particle.pulseSize += particle.pulseSpeed;
        const pulseFactor = Math.sin(particle.pulseSize) * 0.5 + 0.5;

        particle.element.style.left = `${particle.x}%`;
        particle.element.style.top = `${particle.y}%`;

        const currentSize = particle.size * (0.8 + pulseFactor * 0.4);
        const currentOpacity = particle.opacity * (0.5 + pulseFactor * 0.5);

        particle.element.style.width = `${currentSize}px`;
        particle.element.style.height = `${currentSize}px`;
        particle.element.style.opacity = currentOpacity.toString();

        particle.element.style.boxShadow = `0 0 ${currentSize * 2}px ${currentSize}px hsla(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%, ${currentOpacity * 0.3})`;
      });
    };

    initParticles();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return containerRef;
};