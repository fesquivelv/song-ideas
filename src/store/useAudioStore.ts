import { create } from "zustand";
import type { Recording } from "../types";

interface AudioState {
  activeRecording: Recording | null;
  isPlaying: boolean;
  play: (recording: Recording) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  activeRecording: null,
  isPlaying: false,
  play: (recording) =>
    set({ activeRecording: recording, isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  resume: () => set({ isPlaying: true }),
  stop: () => set({ activeRecording: null, isPlaying: false }),
}));