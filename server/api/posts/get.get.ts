import postService from '~~/server/services/post-service'

export default defineEventHandler(async (event) => {
    const POSTS_LIMIT = 15

    let { limit } = getQuery(event)
    limit = limit && Number(limit)
    const posts = await postService.getRecentPosts(
        (limit as undefined | number) || POSTS_LIMIT
    )

    return posts
})
