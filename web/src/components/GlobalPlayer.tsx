import { useRef, useEffect, useState } from 'react';
import { useAudioStore } from '../store/useAudioStore';
import { PauseIcon, PlayIcon, StopIcon } from './Icons';
import { formatTime } from '../utils';

const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

export const GlobalPlayer = () => {
    const { activeRecording, isPlaying, pause, resume, stop } = useAudioStore();
    const audioRef = useRef<HTMLAudioElement>(null);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Sync the HTML5 Audio element with our Zustand state
    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.play().catch(() => {
                // Handle browser autoplay restrictions if necessary
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, activeRecording]);

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;
        const newTime = (Number(e.target.value) / 100) * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    if (!activeRecording) return null;

    // Calculate percentage for the slider
    const progressPercentage = (currentTime / duration) * 100 || 0;

    return (
        <div className='fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-secondary p-4 z-50'>
            <div className='max-w-4xl mx-auto flex flex-col gap-2'>
                {/* Progress Bar */}
                <input
                    type='range'
                    min='0'
                    max='100'
                    value={progressPercentage}
                    onChange={handleSeek}
                    className='w-full h-1 bg-gray-700 appearance-none cursor-pointer border-secondary '
                />

                <div className='flex items-center justify-between'>
                    <div className='flex flex-col'>
                        <span className='text-white font-bold text-sm'>
                            {activeRecording.name}
                        </span>
                        <span className='text-xs text-gray-400'>
                            Guitar Take
                        </span>
                    </div>
                    <div className='flex items-center gap-4'>
                        <button
                            onClick={() => (isPlaying ? pause() : resume())}
                            className='bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center'
                        >
                            {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </button>
                        <button
                            onClick={stop}
                            className='bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center'
                        >
                            <StopIcon />
                        </button>
                    </div>

                    {/* Time Display */}
                    <div className='text-xs text-gray-400 font-mono'>
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                </div>
            </div>
            <audio
                ref={audioRef}
                src={`${baseUrl}${activeRecording.url}`}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleTimeUpdate}
                onEnded={pause}
            />
        </div>
    );
};
