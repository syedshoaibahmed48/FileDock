import { Document } from "mongoose";

export interface FileMetaData {
    name: string;
    size: number;
    type: string;
    dateUploaded: string;
}

export interface UserAuthData {
    username: string;
    isValidUsername?: boolean;
    email?: string;
    isValidEmail?: boolean;
    password: string;
    isValidPassword?: boolean;
    confirmPassword?: string;
    passwordsMatch?: boolean;
}

export interface UserDocument extends Document {
    username: string;
    email: string;
    password?: string;
    isDemoUser: boolean;
}

export interface UserSignUpValidationResult{
    isValid: boolean;
    message?: string;
}