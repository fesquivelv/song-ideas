import { useState } from "react";
import type { Lyric } from "../types";

interface Props {
    lyrics: Lyric[];
    onOpenAddLyricModal: () => void;
}

export default function Lyrycs({lyrics, onOpenAddLyricModal}: Props) {

    
    return (<>
        <div className="flex flex-col items-center">
            <button onClick={onOpenAddLyricModal} className="text-1xl py-2 px-3 rounded-3xl my-2 bg-secondary">
                Add New Lyric
            </button>
        </div>
        <div className="flex full-width flex-col">
            <h1 className="text-2xl">Lyrics</h1>
            <ul>
                {lyrics.map((lyric:Lyric, index:number) => (<li key={index} className="border p-2 mb-2">
                    <button  className="hover:text-indigo-400 transition-colors">{lyric.title}</button>
                </li>))}
            </ul>
        </div>
        </>
    );
}
