import userService from "~/server/services/user-service";

export default defineEventHandler(async (event) => {
    const {email, password} = await readBody(event);
    const userData = await userService.register(email, password);
    
    setCookie(event, 'token', userData.refreshToken, {httpOnly: true, maxAge: 6 * 60 * 60 * 1000 })
    return userData;
})