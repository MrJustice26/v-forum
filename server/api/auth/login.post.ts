import User from "~/server/models/User";
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig(); 

    const {email, password} = await readBody(event);

    const errorAuthCredentialsAreIncorrect = "Email or password are incorrect!"


    const user = await User.findOne({email})
    if(!user){
        event.node.res.statusCode = 401
        event.node.res.statusMessage = errorAuthCredentialsAreIncorrect;
        return {}
    }

    const result = await bcrypt.compare(password, user.password);
    if(!result){
        event.node.res.statusCode = 401
        event.node.res.statusMessage = errorAuthCredentialsAreIncorrect;
        return {}
    }

    
    setCookie(event,'refreshToken', user.refreshToken, {maxAge:6 * 60 * 60 * 1000 });

    return {
        user
    }

})