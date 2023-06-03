import postModel from '../models/Post/post-model'
import apiError from '../exceptions/api-error'
import userModel from '../models/User/user-model'

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

        const post = await postModel.findById(id)
        if (!post) return apiError.unAuthorized()

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

        return { message: 'OK' }
    }
}

export default new PostService()
