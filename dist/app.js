"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-check
const library_1 = require("@prisma/client/runtime/library");
const express_1 = __importDefault(require("express"));
require('express-async-errors');
const zod_1 = require("zod");
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
// body parser (json)
app.use(express_1.default.json());
// API - application programming interface
app.get('/hello', (req, res) => {
    res.send('Hello world');
});
// RESTful API
// CRUD resources
// Create
// Read
// Update
// Delete
// Read
app.get('/api/posts', async (req, res) => {
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
app.get('/api/posts/:postId', async (req, res) => {
    const schema = zod_1.z.number();
    const postId = await schema.safeParseAsync(+req.params.postId);
    if (postId.success) {
        const post = await db_1.default.post.findUnique({
            where: {
                id: postId.data
            }
        });
        res.send(post);
    }
    else {
        res.status(400).send({ message: 'Wrong PostID' });
    }
});
// Create
app.post('/api/posts', async (req, res, next) => {
    const schema = zod_1.z.object({
        title: zod_1.z.string(),
        text: zod_1.z.string(),
        author: zod_1.z.string(),
    });
    const newPost = await schema.parseAsync(req.body);
    const newPostDB = await db_1.default.post.create({
        data: newPost
    });
    res.send(newPostDB);
});
// Update
app.patch('/api/posts/:postId', async (req, res, next) => {
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
app.delete('/api/posts/:postId', async (req, res) => {
    const schemaPostId = zod_1.z.number();
    const postId = await schemaPostId.parseAsync(+req.params.postId);
    const removedPost = await db_1.default.post.delete({
        where: {
            id: postId
        }
    });
    res.send(removedPost);
});
/** @type {express.ErrorRequestHandler} */
const errorHandler = (error, req, res, next) => {
    if (error instanceof zod_1.ZodError) {
        res.status(400).send({
            errors: error.errors
        });
    }
    if (error instanceof library_1.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
            res.status(400).send({
                message: "The Post ID doesn't exist"
            });
        }
        else {
            res.status(400).send({
                message: error.message,
                code: error.code
            });
        }
    }
};
app.use(errorHandler);
app.listen(3333);
//# sourceMappingURL=app.js.map