import type { CreateSongInput } from "../types";

const baseUrl = 'http://localhost:5000/api';

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

