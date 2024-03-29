import commentModel from '~~/server/models/Comment/comment-model'
import userModel from '~~/server/models/User/user-model'
import apiError from '~~/server/exceptions/api-error'
import postService from './post-service'

interface CreateCommentPayload {
    addedInPost: string
    content: string
    author: string
    repliedOn: string
}

class CommentService {
    async getCommentsByPostId(postId: string) {
        if (!postId) return apiError.badRequest()
        const comments = await commentModel
            .find({ addedInPost: postId, repliedOn: null })
            .populate({ path: 'author', select: 'username' })
            .populate({
                path: 'replies',
                populate: {
                    path: 'author replies',
                    select: 'username',
                },
            })

            .exec()
        return comments
    }
    async getCommentByCommentId(id: string) {
        if (!id) return apiError.badRequest()

        const post = await commentModel.findById(id)

        return post
    }

    async createComment(commentPayload: CreateCommentPayload) {
        const { addedInPost, content, author, repliedOn } = commentPayload

        const receivedUserFromDB = await userModel.findById(author)
        if (!receivedUserFromDB) return apiError.unAuthorized()

        if (!addedInPost || !content) {
            return apiError.badRequest()
        }

        const doesPostExists = await postService.getPostById(addedInPost)
        if (!doesPostExists) {
            return apiError.badRequest()
        }

        let commentOnWhichHasBeenReplied

        if (repliedOn) {
            commentOnWhichHasBeenReplied = await this.getCommentByCommentId(
                repliedOn
            )

            if (!commentOnWhichHasBeenReplied) {
                return apiError.badRequest()
            }
        }

        const newComment = await commentModel.create(commentPayload)

        commentOnWhichHasBeenReplied?.replies.push(newComment._id)
        await commentOnWhichHasBeenReplied?.save()

        if (!newComment) return apiError.internalError()

        return newComment
    }
}

export default new CommentService()
