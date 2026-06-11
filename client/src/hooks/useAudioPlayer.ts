import { useState, useRef, useCallback, useEffect } from "react";

interface AudioPlayerState {
  isPlaying: boolean;
  currentAudio: string | null;
  duration: number;
  currentTime: number;
  error: string | null;
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentAudio: null,
    duration: 0,
    currentTime: 0,
    error: null,
  });

  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;

    const onTimeUpdate = () => {
      setState((s) => ({ ...s, currentTime: audio.currentTime }));
    };

    const onLoadedMetadata = () => {
      setState((s) => ({ ...s, duration: audio.duration }));
    };

    const onEnded = () => {
      setState((s) => ({ ...s, isPlaying: false, currentAudio: null }));
    };

    const onError = () => {
      setState((s) => ({ ...s, error: "Failed to load audio", isPlaying: false }));
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const play = useCallback((url: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (state.currentAudio !== url) {
      audio.src = url;
      audio.load();
    }

    audio
      .play()
      .then(() => {
        setState((s) => ({ ...s, isPlaying: true, currentAudio: url, error: null }));
      })
      .catch(() => {
        setState((s) => ({ ...s, error: "Failed to play audio" }));
      });
  }, [state.currentAudio]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setState((s) => ({ ...s, isPlaying: false }));
  }, []);

  const resume = useCallback(() => {
    audioRef.current?.play();
    setState((s) => ({ ...s, isPlaying: true }));
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setState({
      isPlaying: false,
      currentAudio: null,
      duration: 0,
      currentTime: 0,
      error: null,
    });
  }, []);

  return { ...state, play, pause, resume, seek, stop };
}
