import { create } from 'zustand';

interface RecordState {
  isRecording: boolean;
  activeSongId: string | null;
  startRecording: (songId: string) => void;
  stopRecording: () => void;
}

export const useRecordStore = create<RecordState>((set) => ({
  isRecording: false,
  activeSongId: null,
  startRecording: (songId) => set({ isRecording: true, activeSongId: songId }),
  stopRecording: () => set({ isRecording: false, activeSongId: null }),
}));