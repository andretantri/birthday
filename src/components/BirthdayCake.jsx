import { useEffect, useState } from 'react';
import './BirthdayCake.css';

export default function BirthdayCake({ name, introTitle, introSubtitle, onContinue }) {
  const [phase, setPhase] = useState('cake'); // cake → text → button
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 1800);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== 'text') return;
    const full = introTitle.replace('[Nama]', name);
    let i = 0;
    const iv = setInterval(() => {
      setDisplayedText(full.slice(0, i + 1));
      i++;
      if (i >= full.length) {
        clearInterval(iv);
        setTimeout(() => setPhase('button'), 600);
      }
    }, 60);
    return () => clearInterval(iv);
  }, [phase, name, introTitle]);

  return (
    <div className="cake-scene">
      <div className="cake-wrapper">
        {/* Cake SVG illustration */}
        <div className="cake">
          {/* Candles */}
          <div className="candles-row">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="candle-wrap">
                <div className="flame">
                  <div className="flame-inner" />
                </div>
                <div className="candle" style={{ background: ['#ff6b9d','#c084fc','#fb7185','#a78bfa','#f472b6'][i] }} />
              </div>
            ))}
          </div>

          {/* Cake layers */}
          <div className="cake-top-layer">
            <div className="cake-decoration">
              <span>🎀</span>
              <span className="dots">·····</span>
              <span>🎀</span>
            </div>
          </div>
          <div className="cake-middle-layer">
            <div className="cake-decoration">
              <span>✨</span>
              <span className="dots">·····</span>
              <span>✨</span>
            </div>
          </div>
          <div className="cake-bottom-layer">
            <div className="cake-decoration">
              <span>🌸</span>
              <span className="dots">·····</span>
              <span>🌸</span>
            </div>
          </div>
          <div className="cake-plate" />
        </div>

        {/* Text */}
        <div className={`cake-text ${phase !== 'cake' ? 'visible' : ''}`}>
          <h1 className="cake-title">{displayedText}<span className="cursor">|</span></h1>
          <p className={`cake-subtitle ${phase === 'button' ? 'visible' : ''}`}>{introSubtitle}</p>
        </div>

        {/* CTA Button */}
        <button
          className={`cake-btn ${phase === 'button' ? 'visible' : ''}`}
          onClick={onContinue}
        >
          Buka Hadiah <span>🎁</span>
        </button>
      </div>
    </div>
  );
}
