import { MiniUser } from "./user"
import { Song } from "./song"

export interface Playlist {
    _id?: string,
    name: string,
    imgUrl: string,
    tags: string[],
    // createdBy: MiniUser,
    creatorId: number
    likedByUsers: MiniUser[],
    songs: Song[]
}





