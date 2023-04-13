"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const db_1 = __importDefault(require("../db"));
const auth_1 = require("../auth");
const bcryptjs_1 = require("bcryptjs");
exports.authRouter = (0, express_1.Router)();
// Authentication => Login + Password => Token
exports.authRouter.post('/api/login', async (req, res, next) => {
    const schema = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(3).max(20),
    });
    const user = await schema.parseAsync(req.body);
    const userDb = await db_1.default.user.findUnique({
        where: {
            email: user.email
        }
    });
    if (userDb && (0, bcryptjs_1.compareSync)(user.password, userDb.passwordHash)) {
        const token = await (0, auth_1.createToken)(userDb.id);
        // XSS atack
        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 2 * 24 * 3600 * 1000),
        });
        res.cookie('test', 'Hello world');
        res.send({
            message: 'Successful login'
        });
    }
    else {
        res.status(401).send({
            message: 'Wrong credentials'
        });
    }
});
exports.authRouter.post('/api/signup', async (req, res, next) => {
    const schema = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(3).max(20),
        name: zod_1.z.string().max(30)
    });
    const newUser = await schema.parseAsync(req.body);
    const passwordHash = (0, bcryptjs_1.hashSync)(newUser.password);
    const userDb = await db_1.default.user.create({
        data: {
            email: newUser.email,
            name: newUser.name,
            passwordHash
        }
    });
    const token = await (0, auth_1.createToken)(userDb.id);
    // XSS atack
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 2 * 24 * 3600 * 1000),
    });
    res.send({
        message: 'Successful signup'
    });
});
//# sourceMappingURL=authRouter.js.map