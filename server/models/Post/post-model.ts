import {Schema, model} from 'mongoose'
import IPostModel from './post-model.type';

const PostSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: {type: Date, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true}
})

export default model<IPostModel>('Post', PostSchema);