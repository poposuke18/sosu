"use client"

import React, { createContext, useContext, useRef, useCallback, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from 'lucide-react'

interface AudioContextType {
  playBGM: () => void;
  stopBGM: () => void;
  playEffect: (effectName: 'correct' | 'wrong' | 'stageClear') => void;
  setVolume: (volume: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType>({
  playBGM: () => {},
  stopBGM: () => {},
  playEffect: () => {},
  setVolume: () => {},
  isMuted: false,
  toggleMute: () => {},
});

export const useAudio = () => useContext(AudioContext);

interface AudioManagerProps {
  children: React.ReactNode;
}

type EffectType = {
  [K in 'correct' | 'wrong' | 'stageClear']: HTMLAudioElement;
};

export const AudioManager = ({ children }: AudioManagerProps) => {
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const effectsRef = useRef<EffectType | null>(null);
  const [volume, setVolumeState] = useState(0.5);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    effectsRef.current = {
      correct: new Audio('/sounds/correct.mp3'),
      wrong: new Audio('/sounds/wrong.mp3'),
      stageClear: new Audio('/sounds/stage-clear.mp3'),
    };

    bgmRef.current = new Audio('/sounds/BGM1.mp3');
    if (bgmRef.current) {
      bgmRef.current.loop = true;
      bgmRef.current.volume = volume;
      bgmRef.current.addEventListener('canplaythrough', () => {
        setIsLoaded(true);
        console.log('BGM loaded and ready to play');
      });
    }

    if (effectsRef.current) {
      Object.values(effectsRef.current).forEach(audio => {
        audio.volume = volume;
      });
    }

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
      }
    };
  }, [volume]);

  const playBGM = useCallback(() => {
    if (bgmRef.current && !isMuted && isLoaded) {
      console.log('Attempting to play BGM');
      bgmRef.current.play()
        .then(() => console.log('BGM started playing successfully'))
        .catch(e => {
          console.error('BGM play failed:', e);
          // ユーザーインタラクション後に再試行するためのフラグを設定
          setIsLoaded(false);
        });
    }
  }, [isMuted, isLoaded]);

  const stopBGM = useCallback(() => {
    if (bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current.currentTime = 0;
    }
  }, []);

  const playEffect = useCallback((effectName: 'correct' | 'wrong' | 'stageClear') => {
    if (effectsRef.current?.[effectName] && !isMuted) {
      effectsRef.current[effectName].currentTime = 0;
      effectsRef.current[effectName].play().catch(e => 
        console.error(`Effect ${effectName} play failed:`, e)
      );
    }
  }, [isMuted]);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    if (bgmRef.current) {
      bgmRef.current.volume = newVolume;
    }
    if (effectsRef.current) {
      Object.values(effectsRef.current).forEach(audio => {
        audio.volume = newVolume;
      });
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev;
      if (newMuted) {
        bgmRef.current?.pause();
      } else if (bgmRef.current && isLoaded) {
        bgmRef.current.play().catch(e => console.error('BGM play failed:', e));
      }
      return newMuted;
    });
  }, [isLoaded]);

  const contextValue: AudioContextType = {
    playBGM,
    stopBGM,
    playEffect,
    setVolume,
    isMuted,
    toggleMute,
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {/* サウンドコントロール */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          onClick={toggleMute}
          className="rounded-full bg-white/90 shadow-md"
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      </div>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioManager;