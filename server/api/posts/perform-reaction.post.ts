import postService from '~~/server/services/post-service'
import apiError from '~/server/exceptions/api-error'

enum PostReaction {
    LIKE = 'like',
    DISLIKE = 'dislike',
    SWITCH_TO_LIKE = 'switchToLike',
    SWITCH_TO_DISLIKE = 'switchToDislike',
    FROM_LIKE_TO_NONE = 'fromLikeToNone',
    FROM_DISLIKE_TO_NONE = 'fromDislikeToNone',
    NONE = 'none',
}

export default defineEventHandler(async (event) => {
    const refreshToken = getCookie(event, 'refreshToken')

    if (!refreshToken) {
        return apiError.unAuthorized()
    }

    const {
        postId,
        postReaction,
    }: { postId: string; postReaction: PostReaction } = await readBody(event)

    if (!postId || !postReaction) {
        return apiError.badRequest()
    }

    const updatedPostLikesAmount = await postService.performReaction(
        postId,
        postReaction
    )
    return { likes: updatedPostLikesAmount }
})
