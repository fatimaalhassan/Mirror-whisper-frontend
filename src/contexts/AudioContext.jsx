import { createContext, useContext, useRef, useState } from "react";
import startMp3 from "../assets/start.mp3";

const AudioContextX = createContext(null);

export const useAudio = () => useContext(AudioContextX);

export function AudioProvider({ children }) {
  const introRef = useRef(null);
  const calmRef = useRef(null);

  const [introStarted, setIntroStarted] = useState(false);

  const startIntro = () => {
    if (!introRef.current || introStarted) return;
    introRef.current.volume = 0.18;
    introRef.current.currentTime = 0;
    introRef.current.play().catch(() => {});
    setIntroStarted(true);
  };

  const stopIntro = () => {
    if (!introRef.current) return;
    introRef.current.pause();
    introRef.current.currentTime = 0;
    setIntroStarted(false);
  };

  const startCalm = () => {
    if (!calmRef.current) return;
    calmRef.current.volume = 0.15;
    calmRef.current.play().catch(() => {});
  };

  const stopCalm = () => {
    if (!calmRef.current) return;
    calmRef.current.pause();
    calmRef.current.currentTime = 0;
  };

  return (
    <AudioContextX.Provider value={{ startIntro, stopIntro, startCalm, stopCalm }}>
      {/* عناصر الصوت نفسها */}
      {children}

      {/* خليهم آخر شي */}
      <audio ref={introRef} src="/src/assets/start.mp3"loop muted />
    </AudioContextX.Provider>
  );
}
