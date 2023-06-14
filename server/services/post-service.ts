import postModel from '../models/Post/post-model'
import apiError from '../exceptions/api-error'
import userModel from '../models/User/user-model'

enum PostReaction {
    LIKE = 'like',
    DISLIKE = 'dislike',
    SWITCH_TO_LIKE = 'switchToLike',
    SWITCH_TO_DISLIKE = 'switchToDislike',
    FROM_LIKE_TO_NONE = 'fromLikeToNone',
    FROM_DISLIKE_TO_NONE = 'fromDislikeToNone',
    NONE = 'none',
}

interface PostPayload {
    title: string
    content: string
    author: string
}

class PostService {
    async getRecentPosts(limit: number) {
        const recentPosts = await postModel
            .find()
            .limit(limit)
            .sort({ createdAt: -1 })

        return recentPosts
    }

    async getPostById(id: string) {
        if (!id) return apiError.badRequest()

        const post = await postModel
            .findById(id)
            .populate({ path: 'author', select: 'username' })

        return post
    }

    async getPostsByUserId(userId: string, limit?: number) {
        const DEFAULT_LIMIT = 15

        if (!userId) return apiError.unAuthorized()

        const posts = await postModel
            .find({ author: userId })
            .limit(limit || DEFAULT_LIMIT)
            .sort({ createdAt: -1 })

        return posts
    }

    async createPost(postPayload: PostPayload) {
        const receivedUserFromDB = await userModel.findById(postPayload.author)
        if (!receivedUserFromDB) return apiError.unAuthorized()

        const { title, content } = postPayload

        if (!title || !content) return apiError.badRequest()

        const newPost = await postModel.create(postPayload)

        if (!newPost) return apiError.internalError()

        return newPost
    }

    async performReaction(postKey: string, postReaction: PostReaction) {
        const post = await postModel.findById(postKey)
        if (!post) return apiError.badRequest()

        let likes = post.likes

        switch (postReaction) {
            case PostReaction.LIKE:
                await post.updateOne({ likes: post.likes + 1 })
                likes += 1
                break

            case PostReaction.DISLIKE:
                await post.updateOne({ likes: post.likes - 1 })
                likes -= 1
                break

            case PostReaction.SWITCH_TO_LIKE:
                await post.updateOne({ likes: post.likes + 2 })
                likes += 2
                break

            case PostReaction.SWITCH_TO_DISLIKE:
                await post.updateOne({ likes: post.likes - 2 })
                likes -= 2
                break

            case PostReaction.FROM_DISLIKE_TO_NONE:
                await post.updateOne({ likes: post.likes + 1 })
                likes += 1
                break

            case PostReaction.FROM_LIKE_TO_NONE:
                await post.updateOne({ likes: post.likes - 1 })
                likes -= 1
                break
        }

        return likes
    }
}

export default new PostService()
