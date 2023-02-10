import userService from "~/server/services/user-service";
export default defineEventHandler(async (event) => {
    const refreshToken = getCookie(event, 'refreshToken');
    const userData = await userService.refresh(refreshToken);
    setCookie(event, 'refreshToken', userData.refreshToken, {maxAge: 6 * 60 * 60 * 1000, httpOnly: true})
    return userData;
})