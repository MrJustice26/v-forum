import apiError from '~~/server/exceptions/api-error'
import postService from '~~/server/services/post-service'
import tokenService from '~~/server/services/token-service'

export default defineEventHandler(async (event) => {
    const refreshToken = getCookie(event, 'refreshToken')

    if (!refreshToken) {
        return apiError.unAuthorized()
    }
    const receivedUserId = await tokenService.findUserByToken(refreshToken!)

    const { title, content } = await readBody(event)

    const result = await postService.createPost({
        title,
        content,
        author: receivedUserId,
    })

    return result
})
