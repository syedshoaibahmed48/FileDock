import { NextRequest, NextResponse } from "next/server";
import { compare } from 'bcrypt';
import { connectToMongoDB } from "@/app/configs/mongodb-config";
import jwt from 'jsonwebtoken'
import User from "@/app/models/UserModel";

connectToMongoDB();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { username, password } = reqBody;

        // check if user exists
        const savedUser = await User.findOne({username});
        if(!savedUser) return NextResponse.json({ message: "Invalid Username" }, { status: 401 });
        
        //check if passwords match
        const passwordsMatch = await compare(password, savedUser.password);
        if(!passwordsMatch) return NextResponse.json({ message: "Invalid Password" }, { status: 401 });

        //generate JWT
        const tokenData = {
            id: savedUser._id, 
            username, 
            email: savedUser.email
        }
        const authToken = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!);

        // return token in cookies
        const response = NextResponse.json({ message: "User Signed in" }, { status: 200 });
        response.cookies.set("AuthToken", authToken);
        return response
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "User Signin failed" }, { status: 500 });
    }
}