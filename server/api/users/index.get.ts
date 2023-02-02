import User from "~/server/models/User";

export default defineEventHandler(async (event) => {

    const users = await User.find();
    return {
        users
    }
})