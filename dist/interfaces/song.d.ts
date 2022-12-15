export interface Song {
    id: string;
    videoId: string;
    title: string;
    artist: string;
    image: string;
    duration: number;
    addedAt?: number;
}
export interface PlaylistSong {
    videoId: string;
    playlistId: number;
    addedAt: number;
    idx: number;
}
