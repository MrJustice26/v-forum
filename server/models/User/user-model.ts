import {Schema, model} from 'mongoose'
import IUserModel from '~/server/models/User/user-model.type';

const UserSchema = new Schema({
    email: {
        type: String, unique: true,
        required: true
    },
    password: {
        type: String,
        required: true

    },
    activationLink: {
        type: String,
        unique: true,
        required: true
    },
    isActivated: {
        type: Boolean,
        required: true
    },
})

export default model<IUserModel>('User', UserSchema);
