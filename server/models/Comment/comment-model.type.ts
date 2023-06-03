interface ICommentModel {
    author: string
    createdAt: Date
    title: string
    text: string
    score: number
    replies: ICommentModel[]
}

export default ICommentModel
