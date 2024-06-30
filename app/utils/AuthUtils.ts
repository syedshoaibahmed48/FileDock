import validationRegex from "@/assets/user_validation_rules.json";
import { UserSignUpValidationResult } from "@/app/models/app-interfaces";
import User from "@/app/models/UserModel";

export async function validateUserSignUp(username: string, email: string, password: string) : Promise<UserSignUpValidationResult>{
    // check if a user with same username or email exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (!username || !username.match(validationRegex.usernameRegex)) {
       return { isValid: false,  message: validationRegex.usernameInvalidMessage };
    }
    else if (!email || !email.match(validationRegex.emailRegex)) {
        return { isValid: false,  message: validationRegex.emailInvalidMessage };
    }
    else if (!password || !password.match(validationRegex.passwordRegex)) {
        return { isValid: false, message: validationRegex.passwordInvalidMessage };
    }
    else if(existingUser){
        if(existingUser.username === username) return { isValid: false,  message: validationRegex.usernameExistsMessage };
        else return { isValid: false, message: validationRegex.emailExistsMessage };
    }
    else return { isValid: true }
}
