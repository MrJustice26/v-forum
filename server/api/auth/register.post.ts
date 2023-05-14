import userService from '~/server/services/user-service'
import mailService from '~/server/services/mail-service'

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event)
    const userData = await userService.register(email, password)
    if (!userData) return

    await mailService.sendActivationLink(userData.user.id)

    setCookie(event, 'refreshToken', userData.refreshToken, {
        httpOnly: true,
        maxAge: 6 * 60 * 60 * 1000,
    })
    setHeader(event, 'Authorization', `Bearer ${userData.accessToken}`)

    return userData
})
