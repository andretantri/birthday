import { useEffect, useRef } from 'react';
import './Particles.css';

const NUM_PARTICLES = 80;

export default function Particles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < NUM_PARTICLES; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      const size = Math.random() * 3 + 1;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.animationDelay = `${Math.random() * 8}s`;
      p.style.animationDuration = `${Math.random() * 6 + 4}s`;
      p.style.opacity = Math.random() * 0.7 + 0.1;
      container.appendChild(p);
    }

    return () => {
      while (container.firstChild) container.removeChild(container.firstChild);
    };
  }, []);

  return <div ref={containerRef} className="particles-container" />;
}
