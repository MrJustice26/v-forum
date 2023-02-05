
import User from "~/server/models/User/user-model";
import bcrypt from 'bcryptjs';
import { UserDto } from "~/server/dtos/user-dto";
import tokenService from "~/server/services/token-service";
import ApiError from "~/server/exceptions/api-error";
import {v4 as uuidv4} from 'uuid';
import userModel from "~~/server/models/User/user-model";


class UserService {

    async login(email: string, password: string){

        const user = await User.findOne({email})
        if(!user){
            return ApiError.loginCredentialsIncorrect();
        }

        const arePassEquals = await bcrypt.compare(password, user.password);
        if(!arePassEquals){
        return ApiError.loginCredentialsIncorrect();
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});


        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async register(email: string, password: string){
        const users = await User.find({"email":email});
        if(users.length){
            return ApiError.userAlreadyExists();
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const isActivated = false;
        const activationLink = uuidv4();


        const userPayload = {
            email,
            password: encryptedPassword,
            isActivated,
            activationLink
        }
        
        const tokens = tokenService.generateTokens(userPayload);
        const newUser = await User.create(userPayload);
        const userDto = new UserDto(newUser);
        
        tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async refresh(refreshToken: string){
        if(!refreshToken){
            throw ApiError.unAuthorized();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const receivedToken = await tokenService.findToken(refreshToken);
        if(!userData || !receivedToken){
            throw ApiError.unAuthorized();
        }
        const user = await userModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }
}

export default new UserService();