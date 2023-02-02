import {Schema, model} from 'mongoose'

const MessageSchema = new Schema({
    _id: Schema.Types.ObjectId,
    usernameId: {type: String, ref: 'User'},
    title: {type:String},
    content: {type:String},
})

export default model<any>('Message', MessageSchema);