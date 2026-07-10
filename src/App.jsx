import { useState } from 'react';
import Particles from './components/Particles';
import BirthdayCake from './components/BirthdayCake';
import Slideshow from './components/Slideshow';
import Closing from './components/Closing';
import data from './data/data.json';
import './App.css';

const SCENES = { INTRO: 'intro', SLIDES: 'slides', CLOSING: 'closing' };

export default function App() {
  const [scene, setScene] = useState(SCENES.INTRO);
  const [transitioning, setTransitioning] = useState(false);

  const transition = (nextScene) => {
    setTransitioning(true);
    setTimeout(() => {
      setScene(nextScene);
      setTransitioning(false);
    }, 600);
  };

  return (
    <div className={`app ${transitioning ? 'fade-out' : 'fade-in'}`}>
      {/* Stars always visible */}
      <Particles />

      {scene === SCENES.INTRO && (
        <BirthdayCake
          name={data.name}
          introTitle={data.introTitle}
          introSubtitle={data.introSubtitle}
          onContinue={() => transition(SCENES.SLIDES)}
        />
      )}

      {scene === SCENES.SLIDES && (
        <Slideshow
          slides={data.slides}
          onFinish={() => transition(SCENES.CLOSING)}
        />
      )}

      {scene === SCENES.CLOSING && (
        <Closing
          data={data}
          onRestart={() => transition(SCENES.INTRO)}
        />
      )}
    </div>
  );
}
