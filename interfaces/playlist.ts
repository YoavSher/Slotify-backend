import { MiniUser } from "./user"
import { Song } from "./song"

export interface Playlist {
    _id?: string,
    name: string,
    image: string,
    // createdBy: MiniUser,
    creatorId: number
    // likedByUsers: MiniUser[],
}





