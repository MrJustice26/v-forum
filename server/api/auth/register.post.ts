import User from "~/server/models/User";
import bcrypt from 'bcryptjs';
import TokenService from "../../services/token-service";
import ApiError from "~/server/exceptions/api-error";

export default defineEventHandler(async (event) => {
    const {email, password} = await readBody(event);


    const users = await User.find({"email":email});
    if(users.length){
        return ApiError.userAlreadyExists();
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    
    const newUserData = {
        email,
        password: encryptedPassword,
    }
    
    const tokens = TokenService.generateTokens(newUserData);

    const newUser = new User({...newUserData, refreshToken: tokens.refreshToken})
    await newUser.save();
    
    setCookie(event, 'token', tokens.refreshToken, {httpOnly: true, maxAge: 6 * 60 * 60 * 1000 })

    return {
        accessToken: tokens.accessToken
    }
})