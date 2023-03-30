// @ts-check
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import express from 'express';
require('express-async-errors');
import { z, ZodError } from 'zod';
import db from './db';
const app = express()

// body parser (json)
app.use(express.json())

// API - application programming interface

app.get('/hello', (req, res) => {
    res.send('Hello world')
})

// RESTful API
// CRUD resources
// Create
// Read
// Update
// Delete

// Read
app.get('/api/posts', async (req, res) => {
    const { skip, limit } = req.query
    if (typeof skip === 'string' && typeof limit === 'string') {
        const posts = await db.post.findMany({
            skip: +skip,
            take: +limit
        })
        res.send(posts)
    } else {
        const allPosts = await db.post.findMany({})
        res.send(allPosts)
    }
})

// GET /api/posts/12345
app.get('/api/posts/:postId', async (req, res) => {
    const schema = z.number()
    const postId = await schema.safeParseAsync(+req.params.postId)
    if (postId.success) {
        const post = await db.post.findUnique({
            where: {
                id: postId.data
            }
        })
        res.send(post)
    } else {
        res.status(400).send({ message: 'Wrong PostID' })
    }
})

// Create
app.post('/api/posts', async (req, res, next) => {
    const schema = z.object({
        title: z.string(),
        text: z.string(),
        // author: z.string(),
        // userId
    })
    type Post = Required<z.infer<typeof schema>>
    const newPost = await schema.parseAsync(req.body) as Post
    const newPostDB = await db.post.create({
        data: newPost
    })
    res.send(newPostDB)
})

// Update
app.patch('/api/posts/:postId', async (req, res, next) => {
    const schemaBody = z.object({
        title: z.string().optional(),
        text: z.string().optional(),
        author: z.string().optional(),
    })
    const schemaPostId = z.number()
    const postId = await schemaPostId.parseAsync(+req.params.postId)
    const updatedPost = await schemaBody.parseAsync(req.body)
    const updatedPostDb = await db.post.update({
        where: {
            id: postId
        },
        data: updatedPost
    })
    res.send(updatedPostDb)
})

// Delete
app.delete('/api/posts/:postId', async (req, res) => {
    const schemaPostId = z.number()
    const postId = await schemaPostId.parseAsync(+req.params.postId)
    const removedPost = await db.post.delete({
        where: {
            id: postId
        }
    })
    res.send(removedPost)
})

/** @type {express.ErrorRequestHandler} */
const errorHandler = (error, req, res, next) => {
    if (error instanceof ZodError) {
        res.status(400).send({
            errors: error.errors
        })
    }
    if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
            res.status(400).send({
                message: "The Post ID doesn't exist"
            })
        } else {
            res.status(400).send({
                message: error.message,
                code: error.code
            })
        }
    }
}

app.use(errorHandler)

app.listen(3333)