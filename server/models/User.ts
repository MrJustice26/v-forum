import {Schema, model} from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String, unique: true
    },
    password: {
        type: String
    },
    refreshToken: {
        type: String
    }
})

export default model<any>('User', UserSchema);