import apiError from '~~/server/exceptions/api-error'
import commentService from '~~/server/services/comment-service'
import tokenService from '~~/server/services/token-service'

export default defineEventHandler(async (event) => {
    const refreshToken = getCookie(event, 'refreshToken')

    if (!refreshToken) {
        return apiError.unAuthorized()
    }
    const receivedUserId = await tokenService.findUserByToken(refreshToken!)

    const { addedInPost, content, repliedOn } = await readBody(event)

    const createdComment = await commentService.createComment({
        addedInPost,
        content,
        author: receivedUserId,
        repliedOn,
    })

    return createdComment
})
