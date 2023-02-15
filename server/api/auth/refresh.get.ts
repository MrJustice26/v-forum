import userService from "~/server/services/user-service";
export default defineEventHandler(async (event) => {
    const refreshToken = getCookie(event, 'refreshToken');
    if(!refreshToken) return;
    const userData = await userService.refresh(refreshToken);
    if(!userData) return;
    setCookie(event, 'refreshToken', userData.refreshToken, {maxAge: 6 * 60 * 60 * 1000, httpOnly: true})
    setHeader(event, 'Authorization', `Bearer ${userData.accessToken}`)

    return userData;
})