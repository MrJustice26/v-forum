import { Schema, model } from 'mongoose'
import ICommentModel from './comment-model.type'

const CommentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    title: { type: String, required: true },
    text: { type: String, required: true },
    likes: { type: Number, default: 0 },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
})

export default model<ICommentModel>('Comment', CommentSchema)
