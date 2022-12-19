export interface MiniUser {
    _id: string;
    fullName: string;
}
export interface NewUser {
    username: string;
    fullName: string;
    password: string;
    email: string;
}
export interface User extends NewUser {
    _id: number;
}
