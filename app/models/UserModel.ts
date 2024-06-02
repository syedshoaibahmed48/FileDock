import mongoose from "mongoose";
import { UserDocument } from "./app-interfaces";

function isPasswordRequired(this: UserDocument){
    return !this.isDemoUser;
}

const userSchema = new mongoose.Schema<UserDocument>({
    username:{
        type: String,
        required: [true, "Please provide a user name"],
        unique: true
    },
    email:{
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password:{
        type: String,
        required: isPasswordRequired
    },
    isDemoUser:{
        type: Boolean,
        required: true,
        default: false
    }
}, {collection: "users"});

const User = mongoose.models.users || mongoose.model<UserDocument>("users", userSchema);

export default User;