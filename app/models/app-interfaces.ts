export interface FileMetaData {
    name: string;
    size: number;
    type: string;
    dateUploaded: Date;
}

export interface UserAuthData {
    userName: string;
    email?: string;
    password: string;
    confirmPassword?: string;
}