import { useState } from 'react';
import type { Lyric } from '../types';
import { formatDate } from '../utils';

interface Props {
    lyrics: Lyric[];
    onOpenAddLyricModal: () => void;
}

export default function Lyrycs({ lyrics, onOpenAddLyricModal }: Props) {
    const [selectedLyricId, setSelectedLyricId] = useState<string | null>(null);

    const handleLyricClick = (lyricId: string) => {
        setSelectedLyricId(lyricId);
        // You can also trigger any additional actions here, such as opening a modal with the lyric details
    };
    return (
        <>
            <div className='flex flex-col items-center'>
                <button
                    onClick={onOpenAddLyricModal}
                    className='text-1xl py-2 px-3 rounded-3xl my-2 bg-secondary'
                >
                    Add New Lyric
                </button>
            </div>
            <div className='flex full-width flex-col'>
                <h1 className='text-2xl'>Lyrics</h1>
                <ul>
                    {lyrics.map((lyric: Lyric, index: number) => (
                        <li
                            key={index}
                            className='border p-2 mb-2 '
                        >
                            <div className='flex justify-between'>
                                <button
                                    onClick={() => handleLyricClick(lyric.id)}
                                    className='hover:text-indigo-400 transition-colors'
                                >
                                    {lyric.title}
                                </button>
                                <div className='text-secondary text-sm'>
                                    {formatDate(lyric.updatedAt)}
                                </div>
                            </div>

                            {selectedLyricId === lyric.id && (
                                <div className='mt-2 p-2 '>
                                    <p>{lyric.content}</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
