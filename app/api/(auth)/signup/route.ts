import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken'
import { connectToMongoDB } from "@/app/configs/mongodb-config";
import User from "@/app/models/UserModel";
import { validateUserSignUp } from "@/app/utils/AuthUtils";

connectToMongoDB();

export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody;

        //validate user signup details
        const validation = await validateUserSignUp(username, email, password);
        if(!validation.isValid) return NextResponse.json({ message: validation.message }, { status: 400 });

        //hash password
        const salt = await genSalt(7);
        const hashedPassword = await hash(password, salt);

        //add new user
        const newUser = new User({
            username, 
            email, 
            password: hashedPassword
        })
        const savedUser = await newUser.save();

        //generate JWT
        const tokenData = {
            id: savedUser._id, 
            username, 
            email
        }
        const authToken = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!);

        // return token in cookies
        const response = NextResponse.json({ message: "User Signed up" }, { status: 201 });
        response.cookies.set("AuthToken", authToken);
        return response
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "User Signup failed" }, { status: 500 });
    }
}