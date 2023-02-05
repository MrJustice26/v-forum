import userService from '~/server/services/user-service';

export default defineEventHandler(async (event) => {
    const {email, password} = await readBody(event);
    const userData = await userService.login(email, password);

    setCookie(event,'refreshToken', userData.refreshToken, {maxAge: 6 * 60 * 60 * 1000, httpOnly: true });
    return userData;
})