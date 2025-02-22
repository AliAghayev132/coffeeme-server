// Packages
import jwt from 'jsonwebtoken';
// Config
import { config } from "#config/config.js";
// Utils
import { MessagesService } from '#services/MessagesService.js';

// General authenticateToken function that accepts token type as a parameter
const authenticateToken = (tokenType, secretKey) => {
    return (req, res, next) => {
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(403).json({ messages: MessagesService.error.E401, success: false });
        }

        let token = authHeader.replace(/^Bearer\s/, ''); // Bearer kısmını çıkar
        let currentTokenType = 'access'; // Varsayılan olarak access

        if (token.includes(' type=')) {
            [token, currentTokenType] = token.split(' type=');
        }

        if (currentTokenType !== tokenType) {
            return res.status(403).json({ messages: MessagesService.error.E401, success: false });
        }

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ messages: MessagesService.error.E401, success: false });
            }

            req.user = user;
            next();
        });
    };
};

// Token type specific middleware for user-related routes
const userAuthenticateToken = authenticateToken('access', config.accessSecretKey);
const userAuthenticateTokenWithRefresh = authenticateToken('refresh', config.refreshSecretKey);
const userAuthenticateTokenWithRegister = authenticateToken('register', config.registerSecretKey);

export { 
    userAuthenticateToken, 
    userAuthenticateTokenWithRefresh, 
    userAuthenticateTokenWithRegister 
};