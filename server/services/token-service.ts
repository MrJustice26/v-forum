import jwt from 'jsonwebtoken';
import tokenModel from '~~/server/models/Token/token-model';

interface Tokens {
    accessToken: string,
    refreshToken: string
}
class TokenService {
    private config
    constructor(){
        this.config = useRuntimeConfig();
    }
    generateTokens(payload: any): Tokens {
        const tokens: Tokens = {
            refreshToken: jwt.sign(payload, this.config.jwtRefreshSecret, { expiresIn: '15d'}),
            accessToken: jwt.sign(payload, this.config.jwtAccessSecret, {expiresIn: '30m'})
        };
    
        return tokens;
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, this.config.jwtAccessSecret)
            return userData;
        } catch(e) {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, this.config.jwtRefreshSecret)
            return userData;
        } catch(e) {
            return null;
        }
    }

    async saveToken(userId: string, refreshToken: string){
        const tokenData = await tokenModel.findOne({user: userId});
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await tokenModel.create({user: userId, refreshToken});
        return token;
    }

    async removeToken(refreshToken: string){
        const tokenData = await tokenModel.deleteOne({refreshToken});
        return tokenData;
    }

    async findToken(refreshToken: string){
        const tokenData = await tokenModel.findOne({refreshToken});
        return tokenData;
    }
}

export default new TokenService();