import { useRef, useState } from 'react';
import type { Recording } from '../types';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useAudioStore } from '../store/useAudioStore';

interface Props {
    recordings: Recording[];
    onStop?: (blob: Blob) => void;
}

const Recorder = ({ recordings, onStop }: Props) => {
    const { status, startRecording, stopRecording } = useReactMediaRecorder({
        video: false,
        onStop: (mediaBlobUrl, blob) => {
            clearInterval(intervalRef.current);
            setSeconds(0);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onStop && mediaBlobUrl && onStop(blob);
        },
    });
    const [seconds, setSeconds] = useState(0);

    const isRecording = status === 'recording';
    const intervalRef = useRef(0);

    const startTimer = () => {
        intervalRef.current = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(intervalRef.current);
        setSeconds(0);
    };

    const hadleStartRecording = () => {
        if (!isRecording) {
            startRecording();
            startTimer();
        } else {
            stopRecording();
            stopTimer();
        }
    };

    const formatTime = (totalSeconds: number) => {
        // Calculate minutes and seconds
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        // Use padStart to add a leading zero if the number is less than 10
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const playRecording = useAudioStore((state) => state.play);

    return (
        <>
            <div className='flex flex-col items-center'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    className={`size-24 ${isRecording ? ' fill-red-500' : ' fill-secondary'}`}
                >
                    <path d='M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z' />
                    <path d='M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z' />
                </svg>
                <button
                    className={`text-1xl py-2 px-3 rounded-3xl my-2 ${isRecording ? ' bg-red-500' : ' bg-secondary'}`}
                    onClick={hadleStartRecording}
                >
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
                <div>{formatTime(seconds)}</div>
            </div>
            <div className='flex full-width flex-col'>
                <h1 className='text-2xl'>Recordings:</h1>
                <ul>
                    {recordings.map((rec: Recording, index: number) => (
                        <li key={index} className='border p-2 mb-2'>
                            <button
                                onClick={() => playRecording(rec)}
                                className='hover:text-indigo-400 transition-colors'
                            >
                                🎵 {rec.name || 'Untitled Take'}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Recorder;
