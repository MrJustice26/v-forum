import apiError from '~/server/exceptions/api-error'
import userService from '~~/server/services/user-service'

export default defineEventHandler(async (event) => {
    const { userId } = event.context.params
    if (!userId) return apiError.badRequest()

    const user = await userService.getUserById(userId)
    return user
})
