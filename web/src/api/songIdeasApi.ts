import type { CreateLyricsInput, CreateRecordingInput, CreateSongInput } from "../types";

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const fetchSongIdeaDetail = async (id: string) => {
    const res = await fetch(`${baseUrl}/song-ideas/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch song idea detail');
    }
    return res.json();
};


export const fetchSongIdeasList = async () => {
    const res = await fetch(`${baseUrl}/song-ideas`);
    if (!res.ok) {
        throw new Error('Failed to fetch song ideas list');
    }
    return res.json();
}

export const createSongIdea = async (newSong: CreateSongInput) => {
    const res = await fetch(`${baseUrl}/song-ideas`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSong),
    });
    if (!res.ok) {
        throw new Error('Failed to create song idea');
    }
    return res.json();
}

export const createRecording = async (input: CreateRecordingInput) => {
    const { ideaId, name, description, blob } = input;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('ideaId', ideaId);
    formData.append('audio', blob, 'recording.webm');

    const res = await fetch(`${baseUrl}/recordings/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        throw new Error('Failed to create recording');
    }
    return res.json();
}

export const createLyric = async (input: CreateLyricsInput) => {
    const res = await fetch(`${baseUrl}/lyrics`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
    }); 
    if (!res.ok) {
        throw new Error('Failed to create lyric');
    }
    return res.json();
}

