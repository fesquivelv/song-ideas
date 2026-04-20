import type { CreateLyricsInput, CreateRecordingInput, CreateSongInput } from "../types";
import client from "./client";

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const fetchSongIdeaDetail = async (id: string) => {
    const res = await client.get(`/song-ideas/${id}`);
    if (res.status !== 200) {
        throw new Error('Failed to fetch song idea detail');
    } 
    return res.data;
};


export const fetchSongIdeasList = async () => {
    const res = await client.get(`/song-ideas`);
    if (res.status !== 200) {
        throw new Error('Failed to fetch song ideas list');
    }
    return res.data;
}

export const createSongIdea = async (newSong: CreateSongInput) => {
    const res = await client.post(`/song-ideas`, newSong);
    if (res.status !== 201) {
        throw new Error('Failed to create song idea');
    }
    return res.data;
}

export const createRecording = async (input: CreateRecordingInput) => {
    const { ideaId, name, description, blob } = input;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('ideaId', ideaId);
    formData.append('audio', blob, 'recording.webm');

    const res = await client.post(`/recordings/upload`, formData, {   
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    if (res.status !== 201) {
        throw new Error('Failed to create recording');
    }
    return res.data;
}

export const createLyric = async (input: CreateLyricsInput) => {
    const res = await client.post(`/lyrics`, input); 
    if (res.status !== 201) {
        throw new Error('Failed to create lyric');
    }
    return res.data;
}

