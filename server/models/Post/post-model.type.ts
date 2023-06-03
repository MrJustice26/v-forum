import ICommentModel from '../Comment/comment-model.type'

interface IPostModel {
    author: string
    createdAt: Date
    title: string
    content: string
    score: number
    comments: ICommentModel[]
}

export default IPostModel
