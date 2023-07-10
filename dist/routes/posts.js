"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const db_1 = __importDefault(require("../db"));
const auth_1 = require("../auth");
const promises_1 = require("timers/promises");
exports.postsRouter = (0, express_1.Router)();
// RESTful API
// CRUD resources
// Create
// Read
// Update
// Delete
// Read
exports.postsRouter.get('/', async (req, res) => {
    if (process.env.NODE_ENV !== 'production') {
        await (0, promises_1.setTimeout)(1000);
    }
    const { skip, limit, filter } = req.query;
    if (typeof skip === 'string'
        && Number.isInteger(+skip)
        && +skip >= 0
        && typeof limit === 'string'
        && Number.isInteger(+limit)
        && +limit >= 0) {
        const findParams = {
            skip: +skip,
            take: +limit,
            include: {
                User: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        };
        const countParams = {};
        if (typeof filter === 'string' && filter.length) {
            findParams.where = countParams.where = {
                title: {
                    contains: filter,
                    mode: 'insensitive',
                }
            };
        }
        const posts = await db_1.default.post.findMany(findParams);
        res.setHeader('X-Total-Count', await db_1.default.post.count(countParams));
        res.send(posts);
    }
    else {
        const allPosts = await db_1.default.post.findMany({
            include: {
                User: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });
        res.send(allPosts);
    }
});
// GET /api/posts/12345
exports.postsRouter.get('/:postId', async (req, res) => {
    const schema = zod_1.z.number();
    const postId = await schema.safeParseAsync(+req.params.postId);
    if (postId.success) {
        const post = await db_1.default.post.findUnique({
            where: {
                id: postId.data
            },
            include: {
                User: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });
        if (post)
            res.send(post);
        else
            res.status(404).send({
                message: 'Cannot find this PostID'
            });
    }
    else {
        res.status(400).send({ message: 'Wrong PostID' });
    }
});
// Create
exports.postsRouter.post('/', auth_1.verifyToken, async (req, res, next) => {
    // type guard condition
    if (!req.user)
        return res.status(401).send({
            message: "Wrong token"
        });
    const schema = zod_1.z.object({
        title: zod_1.z.string(),
        text: zod_1.z.string(),
    });
    const newPost = await schema.parseAsync(req.body); // as Prisma.PostCreateInput
    const newPostDB = await db_1.default.post.create({
        data: {
            userId: req.user.id,
            title: newPost.title,
            text: newPost.text
        },
    });
    res.send(newPostDB);
});
// Update
exports.postsRouter.patch('/:postId', auth_1.verifyToken, async (req, res, next) => {
    // type guard condition
    if (!req.user)
        return res.status(401).send({
            message: "Wrong token"
        });
    const schemaBody = zod_1.z.object({
        title: zod_1.z.string().optional(),
        text: zod_1.z.string().optional()
    });
    const schemaPostId = zod_1.z.number();
    const postId = await schemaPostId.parseAsync(+req.params.postId);
    const updatedPost = await schemaBody.parseAsync(req.body);
    const existedPostDb = await db_1.default.post.findUnique({
        where: {
            id: postId
        }
    });
    // guard condition
    if (!existedPostDb)
        return res.status(404).send({
            message: "Wrong PostID"
        });
    if (!req.user.isAdmin && req.user.id !== existedPostDb.userId)
        return res.status(403).send({
            message: 'No permisions'
        });
    const updatedPostDb = await db_1.default.post.update({
        where: {
            id: postId
        },
        data: updatedPost
    });
    res.send(updatedPostDb);
});
// Delete
exports.postsRouter.delete('/:postId', async (req, res) => {
    if (!req.user)
        return res.status(401).send({
            message: "Wrong token"
        });
    const schemaPostId = zod_1.z.number();
    const postId = await schemaPostId.parseAsync(+req.params.postId);
    const existedPostDb = await db_1.default.post.findUnique({
        where: {
            id: postId
        }
    });
    // guard condition
    if (!existedPostDb)
        return res.status(404).send({
            message: "Wrong PostID"
        });
    if (!req.user.isAdmin && req.user.id !== existedPostDb.userId)
        return res.status(403).send({
            message: 'No permisions'
        });
    const removedPost = await db_1.default.post.delete({
        where: {
            id: postId
        }
    });
    res.send(removedPost);
});
//# sourceMappingURL=posts.js.map