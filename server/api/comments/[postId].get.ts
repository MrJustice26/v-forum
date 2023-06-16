import apiError from '~/server/exceptions/api-error'
import commentService from '~/server/services/comment-service'

export default defineEventHandler(async (event) => {
    const { postId } = event.context.params
    if (!postId) return apiError.badRequest()

    const comments = await commentService.getCommentsByPostId(postId)
    return comments
})
