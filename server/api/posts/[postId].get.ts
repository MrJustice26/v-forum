import apiError from '~/server/exceptions/api-error'
import postService from '~/server/services/post-service'

export default defineEventHandler(async (event) => {
    const { postId } = event.context.params
    if (!postId) return apiError.badRequest()

    const post = await postService.getPostById(postId)
    return post
})
