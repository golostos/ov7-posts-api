"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const db_1 = __importDefault(require("../db"));
exports.postsRouter = (0, express_1.Router)();
// RESTful API
// CRUD resources
// Create
// Read
// Update
// Delete
// Read
exports.postsRouter.get('/', async (req, res) => {
    const { skip, limit } = req.query;
    if (typeof skip === 'string' && typeof limit === 'string') {
        const posts = await db_1.default.post.findMany({
            skip: +skip,
            take: +limit
        });
        res.send(posts);
    }
    else {
        const allPosts = await db_1.default.post.findMany({});
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
exports.postsRouter.post('/', async (req, res, next) => {
    const schema = zod_1.z.object({
        title: zod_1.z.string(),
        text: zod_1.z.string(),
        // author: z.string(),
        // userId
    });
    const newPost = await schema.parseAsync(req.body);
    const newPostDB = await db_1.default.post.create({
        data: newPost
    });
    res.send(newPostDB);
});
// Update
exports.postsRouter.patch('/:postId', async (req, res, next) => {
    const schemaBody = zod_1.z.object({
        title: zod_1.z.string().optional(),
        text: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
    });
    const schemaPostId = zod_1.z.number();
    const postId = await schemaPostId.parseAsync(+req.params.postId);
    const updatedPost = await schemaBody.parseAsync(req.body);
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
    const schemaPostId = zod_1.z.number();
    const postId = await schemaPostId.parseAsync(+req.params.postId);
    const removedPost = await db_1.default.post.delete({
        where: {
            id: postId
        }
    });
    res.send(removedPost);
});
//# sourceMappingURL=posts.js.map