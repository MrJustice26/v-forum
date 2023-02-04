import jwt from 'jsonwebtoken';

interface Tokens {
    accessToken: string,
    refreshToken: string
}

const config = useRuntimeConfig();

class TokenService {
    generateTokens(payload: any): Tokens {
        const tokens: Tokens = {
            refreshToken: jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: '15d'}),
            accessToken: jwt.sign(payload, config.jwtAccessSecret, {expiresIn: '30m'})
        };
    
        return tokens;
    }

    validateAccessToken(token: string) {
        return jwt.verify(token, config.jwtAccessSecret);
    }

    validateRefreshToken(token: string) {
        return jwt.verify(token, config.jwtRefreshSecret);
    }
}

export default new TokenService();