import { Schema, model } from 'mongoose'
import ICommentModel from './comment-model.type'

const CommentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    addedInPost: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    createdAt: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    repliedOn: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }],
})

export default model<ICommentModel>('Comment', CommentSchema)
