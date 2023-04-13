"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const util_1 = require("util");
const db_1 = __importDefault(require("./db"));
// create own promisify method
const signAsync = (0, util_1.promisify)(jsonwebtoken_1.sign);
const verifyAsync = function (token, secret) {
    return new Promise((resolve, reject) => {
        (0, jsonwebtoken_1.verify)(token, secret, (err, decodedToken) => {
            if (err)
                reject(err);
            else
                resolve(decodedToken);
        });
    });
};
async function createToken(userId) {
    const token = await signAsync({ userId }, 'supersecret');
    return token;
}
exports.createToken = createToken;
// Middleware express function
// Autorisation
const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decodedToken = await verifyAsync(token, 'supersecret');
            const user = await db_1.default.user.findUnique({
                where: {
                    id: decodedToken.userId
                }
            });
            if (user) {
                req.user = user;
                next();
            }
            else {
                res.status(401).send({
                    message: 'Wrong userid in the token',
                    url: req.path
                });
            }
        }
        catch (error) {
            res.status(401).send({
                message: 'Wrong token',
                url: req.path
            });
        }
    }
    else {
        res.status(401).send({
            message: 'Token is required',
            url: req.path
        });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.js.map