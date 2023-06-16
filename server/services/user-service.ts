import User from '~/server/models/User/user-model'
import bcrypt from 'bcryptjs'
import { UserDto } from '~/server/dtos/user-dto'
import tokenService from '~/server/services/token-service'
import ApiError from '~/server/exceptions/api-error'
import { v4 as uuidv4 } from 'uuid'
import userModel from '~~/server/models/User/user-model'

interface UserServiceAuthResponse {
    refreshToken: string
    accessToken: string
    user: UserDto
}
class UserService {
    async login(
        email: string,
        password: string
    ): Promise<UserServiceAuthResponse | void> {
        const user = await User.findOne({ email })
        if (!user) {
            return ApiError.loginCredentialsIncorrect()
        }

        const arePassEquals = await bcrypt.compare(password, user.password)
        if (!arePassEquals) {
            return ApiError.loginCredentialsIncorrect()
        }

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async register(
        username: string,
        email: string,
        password: string
    ): Promise<UserServiceAuthResponse | void> {
        const existedUserByEmail = await User.find({ email })
        if (existedUserByEmail.length) {
            return ApiError.userAlreadyExists()
        }

        const existedUserByUsername = await User.find({ username })
        if (existedUserByUsername.length) {
            return ApiError.userAlreadyExists()
        }

        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password, salt)

        const isActivated = false
        const activationLink = uuidv4()

        const userPayload = {
            username,
            email,
            password: encryptedPassword,
            isActivated,
            activationLink,
        }

        const tokens = tokenService.generateTokens(userPayload)
        const newUser = await User.create(userPayload)
        const userDto = new UserDto(newUser)

        tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    async refresh(
        refreshToken: string
    ): Promise<UserServiceAuthResponse | void> {
        if (!refreshToken) {
            return ApiError.unAuthorized()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const receivedToken = await tokenService.findToken(refreshToken)
        if (!userData || !receivedToken) {
            return ApiError.unAuthorized()
        }
        const user = await userModel.findById(receivedToken.user)
        if (!user) {
            return ApiError.unAuthorized()
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async logout(refreshToken: string) {
        if (!refreshToken) return ApiError.unAuthorized()
        const tokenData = await tokenService.removeToken(refreshToken)
        return tokenData
    }

    async activate(activationLink: string) {
        const user = await User.findOne({ activationLink })
        if (user?.isActivated) return ApiError.userEmailAreadyActivated()

        if (!user) return ApiError.invalidActivationLink()
        user.isActivated = true
        await user.save()
        return {
            message: 'Your email has been activated!',
        }
    }

    async getUserById(userId: string) {
        const user = await User.findOne({ _id: userId })
        return user
    }
}

export default new UserService()
