import User from "~/server/models/User";

export default defineEventHandler(async (event) => {

    const {username} = await readBody(event);

    const users = await User.find({"username":username});

    if(users.length){
        return {
            status: 400,
            data: {
                message: 'User with this username is already exists!'
            }
        }
    }
    return {
        status: 200,
        data: {
            users: users
        }
    }
    
})