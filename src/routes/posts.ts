import { Router } from "express"
import { z } from "zod"
import db from "../db"

export const postsRouter = Router()
// RESTful API
// CRUD resources
// Create
// Read
// Update
// Delete

// Read
postsRouter.get('/', async (req, res) => {
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
postsRouter.get('/:postId', async (req, res) => {
    const schema = z.number()
    const postId = await schema.safeParseAsync(+req.params.postId)
    if (postId.success) {
        const post = await db.post.findUnique({
            where: {
                id: postId.data
            }
        })
        if (post) res.send(post)
        else res.status(404).send({
            message: 'Cannot find this PostID'
        })
    } else {
        res.status(400).send({ message: 'Wrong PostID' })
    }
})

// Create
postsRouter.post('/', async (req, res, next) => {
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
postsRouter.patch('/:postId', async (req, res, next) => {
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
postsRouter.delete('/:postId', async (req, res) => {
    const schemaPostId = z.number()
    const postId = await schemaPostId.parseAsync(+req.params.postId)
    const removedPost = await db.post.delete({
        where: {
            id: postId
        }
    })
    res.send(removedPost)
})