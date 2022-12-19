import { MiniUser } from "./user";

export interface Song {
    id: string,
    videoId: string, 
    title: string,
    artist: string,
    image: string,
    duration: number,
    addedAt?: number,
    idx?: number
}


