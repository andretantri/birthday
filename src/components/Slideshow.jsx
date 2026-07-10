import { useState, useEffect, useCallback, useMemo } from 'react';
import './Slideshow.css';

// Auto-detect photos from public/photos using Vite's glob import
// We use /* and filter in JS to avoid any brace expansion bugs
const photoFiles = import.meta.glob('/public/photos/*', { eager: true, query: '?url', import: 'default' });

const detectedPhotos = Object.keys(photoFiles)
  .filter(path => /\.(jpg|jpeg|png|webp)$/i.test(path))
  .map(path => path.replace('/public', ''));

// Fallback just in case none are detected
const basePhotos = detectedPhotos.length > 0 ? detectedPhotos : [
  '/photos/photo1.jpg', 
  '/photos/photo2.jpg', 
  '/photos/photo3.jpg', 
  '/photos/photo4.jpg'
];

// Shuffle and duplicate photos to ensure we have enough to fill the collage screen
let collagePhotos = [...basePhotos].sort(() => Math.random() - 0.5);
while (collagePhotos.length < 16) {
  collagePhotos = collagePhotos.concat(basePhotos);
}
collagePhotos = collagePhotos.slice(0, 16); // Dikurangi dari 30 ke 16 agar jauh lebih ringan di-load

function useTypewriter(text, active, speed = 40) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!active) { setDisplayed(''); return; }
    setDisplayed('');
    let i = 0;
    const iv = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(iv);
    }, speed);
    return () => clearInterval(iv);
  }, [text, active, speed]);

  return displayed;
}

export default function Slideshow({ slides, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [typeActive, setTypeActive] = useState(true);

  const slide = slides[current];
  const captionText = useTypewriter(slide.caption, typeActive, 45);

  const goTo = useCallback((index) => {
    if (transitioning) return;
    setTransitioning(true);
    setTypeActive(false);
    setTimeout(() => {
      setCurrent(index);
      setTransitioning(false);
      setTimeout(() => setTypeActive(true), 100);
    }, 500); // 500ms fade transition for text
  }, [transitioning]);

  const goNext = useCallback(() => {
    if (current === slides.length - 1) {
      onFinish();
    } else {
      goTo(current + 1);
    }
  }, [current, slides.length, goTo, onFinish]);

  const goPrev = useCallback(() => {
    if (current > 0) goTo(current - 1);
  }, [current, goTo]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  const pad = (n) => String(n).padStart(2, '0');

  // Randomize rotation slightly for collage items just once
  const collageStyles = useMemo(() => {
    return collagePhotos.map(() => ({
      transform: `rotate(${Math.random() * 6 - 3}deg) scale(${0.9 + Math.random() * 0.2})`,
      animationDelay: `${Math.random() * 2}s`
    }));
  }, []);

  return (
    <div className="slideshow">
      {/* Background Collage */}
      <div className="collage-wrapper">
        <div className="collage-grid">
          {collagePhotos.map((photo, i) => (
            <img 
              key={i} 
              src={photo}
              className="collage-item" 
              style={collageStyles[i]} 
              loading="lazy"
              decoding="async"
              alt="collage"
            />
          ))}
        </div>
      </div>

      {/* Overlay for text readability */}
      <div className="slide-overlay" />

      {/* Text Content */}
      <div className={`slide-content ${transitioning ? 'hidden' : 'visible'}`}>
        <div className="slide-number">
          <span className="slide-num-current">{pad(current + 1)}</span>
          <span className="slide-num-sep">/</span>
          <span className="slide-num-total">{pad(slides.length)}</span>
        </div>

        <div className="slide-text-box">
          <p className="slide-caption">
            {captionText}
            <span className="type-cursor">|</span>
          </p>
          {slide.subcaption && (
            <p className="slide-subcaption">{slide.subcaption}</p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="slide-nav">
        <button
          className="nav-btn prev"
          onClick={goPrev}
          disabled={current === 0}
          aria-label="Previous"
        >
          ‹
        </button>

        <div className="slide-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          className="nav-btn next"
          onClick={goNext}
          aria-label={current === slides.length - 1 ? 'Finish' : 'Next'}
        >
          {current === slides.length - 1 ? '💕' : '›'}
        </button>
      </div>

      {/* Progress bar */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((current + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
