import { config } from "../../config";
import jwt from 'jsonwebtoken';

const authService = {
    createNewToken: (user) => {
        return jwt.sign({ id: user.id }, config.secrets.jwt, {
            expiresIn: config.secrets.jwtExp
        });
    },

    verifyToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.secrets.jwt, (err, payload) => {
                if(err){
                    reject(err);
                }
                resolve(payload);
            });
        });
    }
}

export default authService;