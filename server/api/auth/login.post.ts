import User from "~/server/models/User";
import bcrypt from 'bcryptjs';
import ApiError from '~/server/exceptions/api-error';

export default defineEventHandler(async (event) => {

    const {email, password} = await readBody(event);

    const user = await User.findOne({email})
    if(!user){
        return ApiError.loginCredentialsIncorrect();
    }

    const result = await bcrypt.compare(password, user.password);
    if(!result){
       return ApiError.loginCredentialsIncorrect();
    }

    setCookie(event,'refreshToken', user.refreshToken, {maxAge: 6 * 60 * 60 * 1000 });

    return {
        user
    }

})