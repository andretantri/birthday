import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './Closing.css';

export default function Closing({ data, onRestart }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });

    const shoot = () => {
      myConfetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#f472b6', '#a78bfa', '#fb7185', '#fbbf24', '#34d399'],
      });
      myConfetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#f472b6', '#a78bfa', '#fb7185', '#fbbf24', '#34d399'],
      });
    };

    // Initial burst
    shoot();
    const interval = setInterval(shoot, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="closing-scene">
      <canvas ref={canvasRef} className="confetti-canvas" />

      {/* Floating hearts */}
      <div className="hearts-container">
        {['💕', '❤️', '🌸', '💖', '✨', '💝', '🌺', '💗'].map((emoji, i) => (
          <span key={i} className="floating-heart" style={{
            left: `${10 + i * 11}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${3 + (i % 3)}s`,
            fontSize: `${1.2 + (i % 3) * 0.4}rem`,
          }}>
            {emoji}
          </span>
        ))}
      </div>

      <div className="closing-content">
        <div className="closing-icon">🎂</div>
        <h1 className="closing-title">{data.closingMessage}</h1>
        <p className="closing-subtext">{data.closingSubtext}</p>
        <p className="closing-signature">{data.closingSignature}</p>

        <button className="restart-btn" onClick={onRestart}>
          ↺ Mulai Lagi
        </button>
      </div>
    </div>
  );
}
