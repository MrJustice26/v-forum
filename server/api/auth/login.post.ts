import User from "~/server/models/User";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig(); 

    const {email, password} = await readBody(event);

    if(!email || !password){
        return {
            status: 400,
            data: {
                message: "Fields must not be empty!"
            }
        }
    }

    const user = await User.findOne({email})
    if(!user){
        return {
            status: 400,
            data: {
                message: "Email or password is not correct!"
            }
        }
    }

    const result = await bcrypt.compare(password, user.password);
    if(!result){
        return {
            status: 400,
            data: {
                message: "Email or password is not correct!"
            }
        }
    }

    const userPayload = {
        email,
        password: user.password
    }
    
    const token = jwt.sign(userPayload, config.jwtAccessSecret, {expiresIn: '1h'})

    setHeader(event, 'Authorization', `Bearer ${token}`)

    return {
        status: 200,
        data: {
            message: "Successfull login!"
        }
    }

})