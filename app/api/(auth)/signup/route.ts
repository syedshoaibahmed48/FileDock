import { connectToMongoDB } from "@/app/configs/mongodb-config";
import User from "@/app/models/UserModel";
import validationRegex from "@/assets/validation_regex.json";

import { NextRequest, NextResponse } from "next/server";

connectToMongoDB();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

         // Validate username
         if (!username || !username.match(validationRegex.usernameRegex)) {
            return NextResponse.json({ message: validationRegex.usernameValidMessage }, { status: 400 });
        }

        // Validate email
        if (!email || !email.match(validationRegex.emailRegex)) {
            return NextResponse.json({ message: validationRegex.emailValidMessage }, { status: 400 });
        }

        // Validate password
        if (!password || !password.match(validationRegex.passwordRegex)) {
            return NextResponse.json({ message: validationRegex.passwordValidMessage }, { status: 400 });
        }
        
        const newUser = new User({
            username, email, password
        })
        const savedUser = await newUser.save();
        return NextResponse.json({ message: "User Signed up" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "User Signup failed" }, { status: 500 });
    }
}