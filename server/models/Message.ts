import {Schema, model} from 'mongoose'

const MessageSchema = new Schema({
    usernameId: {type: String, ref: 'User'},
    title: {type:String},
    content: {type:String},
})

export default model<any>('Message', MessageSchema);