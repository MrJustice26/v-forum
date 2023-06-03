interface ICommentModel {
    author: string
    createdAt: Date
    title: string
    text: string
    likes: number
    replies: ICommentModel[]
}

export default ICommentModel
