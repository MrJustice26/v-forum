interface ICommentModel {
    author: string
    createdAt: string
    content: string
    likes: number
    addedInPost: string
    repliedOn: string | null
}

export default ICommentModel
