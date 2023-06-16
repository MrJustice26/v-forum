import { Schema, model } from 'mongoose'
import ITokenModel from '~~/server/models/Token/token-model.type'

const TokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true },
})

export default model<ITokenModel>('Token', TokenSchema)
