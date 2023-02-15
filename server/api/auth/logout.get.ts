import userService from "~/server/services/user-service";

export default defineEventHandler(async (event) => {
    const refreshToken = getCookie(event, 'refreshToken');
    const tokenData = await userService.logout(refreshToken!);
    deleteCookie(event, 'refreshToken');
    setHeader(event, 'Authorization', '');
    return tokenData;
})