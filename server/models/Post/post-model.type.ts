import ICommentModel from '../Comment/comment-model.type'

interface IPostModel {
    author: string
    createdAt: Date
    title: string
    content: string
    likes: number
    comments: ICommentModel[]
}

export default IPostModel
