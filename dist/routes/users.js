"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const db_1 = __importDefault(require("../db"));
const bcryptjs_1 = require("bcryptjs");
const auth_1 = require("../auth");
exports.usersRouter = (0, express_1.Router)();
// RESTful API
// CRUD resources
// Create
// Read
// Update
// Delete
// Read
exports.usersRouter.get('/', auth_1.verifyToken, async (req, res) => {
    const { skip, limit } = req.query;
    // Guard condition
    if (!req.user?.isAdmin)
        return res.status(403).send({
            message: 'No permisions'
        });
    if (typeof skip === 'string' && typeof limit === 'string') {
        const posts = await db_1.default.user.findMany({
            skip: +skip,
            take: +limit
        });
        res.send(posts);
    }
    else {
        const allPosts = await db_1.default.user.findMany({});
        res.send(allPosts);
    }
});
// GET /api/posts/12345
// isAdmin
exports.usersRouter.get('/:userId', auth_1.verifyToken, async (req, res) => {
    const schema = zod_1.z.number();
    const userId = await schema.safeParseAsync(+req.params.userId);
    if (userId.success) {
        if (req.user?.id !== userId.data && !req.user?.isAdmin)
            return res.status(403).send({
                message: 'No permisions'
            });
        const user = await db_1.default.user.findUnique({
            where: {
                id: userId.data
            }
        });
        if (user)
            res.send(user);
        else
            res.status(404).send({
                message: 'Cannot find this UserID'
            });
    }
    else {
        res.status(400).send({ message: 'Wrong userId' });
    }
});
// Create
exports.usersRouter.post('/', auth_1.verifyToken, async (req, res, next) => {
    // Guard condition
    if (!req.user?.isAdmin)
        return res.status(403).send({
            message: 'No permisions'
        });
    const schema = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(3).max(20),
        name: zod_1.z.string().max(30)
    });
    const newUser = await schema.parseAsync(req.body);
    const passwordHash = (0, bcryptjs_1.hashSync)(newUser.password);
    const newUserDB = await db_1.default.user.create({
        data: {
            email: newUser.email,
            name: newUser.name,
            passwordHash: passwordHash
        }
    });
    res.send(newUserDB);
});
// Update
exports.usersRouter.patch('/:userId', async (req, res, next) => {
    const schemaBody = zod_1.z.object({
        email: zod_1.z.string().email().optional(),
        password: zod_1.z.string().min(3).max(20).optional(),
        name: zod_1.z.string().max(30).optional()
    });
    const schemauserId = zod_1.z.number();
    const userId = await schemauserId.parseAsync(+req.params.userId);
    const parsedUser = await schemaBody.parseAsync(req.body);
    const updatedUser = {};
    if (parsedUser.email)
        updatedUser.email = parsedUser.email;
    if (parsedUser.name)
        updatedUser.name = parsedUser.name;
    if (parsedUser.password)
        updatedUser.passwordHash = (0, bcryptjs_1.hashSync)(parsedUser.password);
    const updatedUserDb = await db_1.default.user.update({
        where: {
            id: userId
        },
        data: updatedUser
    });
    res.send(updatedUserDb);
});
// Delete
exports.usersRouter.delete('/:userId', async (req, res) => {
    const schemauserId = zod_1.z.number();
    const userId = await schemauserId.parseAsync(+req.params.userId);
    const removedUser = await db_1.default.user.delete({
        where: {
            id: userId
        }
    });
    res.send(removedUser);
});
//# sourceMappingURL=users.js.map