interface ICommentModel {
    author: string
    createdAt: string
    content: string
    likes: number
    addedInPost: string
    repliedOn: string | null
    replies: string[]
}

export default ICommentModel
