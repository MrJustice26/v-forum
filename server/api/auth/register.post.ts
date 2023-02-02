import User from "~/server/models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig();

    const errorFieldsMustBeFilled = {
        status: 400,
        data: {
            message: "Error: Email and password must not be empty!"
        }
    }
    const errorUserAlreadyExists = {
        status: 400,
        data: {
            message: "Error: User with this email is already exists!"
        }
    }

    const {email, password} = await readBody(event);
    
    if(!email || !password) return errorFieldsMustBeFilled;

    const users = await User.find({"email":email});
    if(users.length){
        return errorUserAlreadyExists;
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    
    const newUserData = {
        email,
        password: encryptedPassword,
    }
    
    const token = jwt.sign(newUserData, config.jwtRefreshSecret, { expiresIn: '6h'})

    newUserData.refreshToken = token;

    const newUser = new User(newUserData)
    await newUser.save();
    
    setCookie(event, 'token', token, {httpOnly: true})
    return {
        status: 200,
        data: {
            message: `User with email ${email} is created successfully!`
        }
    }
})