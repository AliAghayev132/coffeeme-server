// Packages
import jwt from 'jsonwebtoken';
// Config
import { config } from "#config/config.js";
// Utils
import { MessagesService } from '#services/MessagesService.js';

const authenticateToken = (tokenType) => {
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

        const secretKey = tokenType === 'access' ? config.adminAccessSecretKey : config.adminRefreshSecretKey;

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ messages: MessagesService.error.E401, success: false });
            }

            req.user = user;
            next();
        });
    };
};

// Admin access token authentication middleware
const adminAuthenticateToken = authenticateToken('access');

// Admin refresh token authentication middleware
const adminAuthenticateTokenWithRefresh = authenticateToken('refresh');

export { adminAuthenticateToken, adminAuthenticateTokenWithRefresh };