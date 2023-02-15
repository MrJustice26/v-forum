import userService from '~/server/services/user-service';

export default defineEventHandler(async (event) => {
    const {email, password} = await readBody(event);
    const userData = await userService.login(email, password);
    if(!userData) return;
    
    setCookie(event,'refreshToken', userData.refreshToken, {maxAge: 6 * 60 * 60 * 1000, httpOnly: true });
    setHeader(event, 'Authorization', `Bearer ${userData.accessToken}`)
    return userData;
})