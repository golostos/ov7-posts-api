import { Router } from "express"
import { z } from "zod"
import db from "../db"
import { hashSync } from "bcryptjs"
import { Prisma } from "@prisma/client"

export const usersRouter = Router()
// RESTful API
// CRUD resources
// Create
// Read
// Update
// Delete

// Read
usersRouter.get('/', async (req, res) => {
    const { skip, limit } = req.query
    if (typeof skip === 'string' && typeof limit === 'string') {
        const posts = await db.user.findMany({
            skip: +skip,
            take: +limit
        })
        res.send(posts)
    } else {
        const allPosts = await db.user.findMany({})
        res.send(allPosts)
    }
})

// GET /api/posts/12345
usersRouter.get('/:userId', async (req, res) => {
    const schema = z.number()
    const userId = await schema.safeParseAsync(+req.params.userId)
    if (userId.success) {
        const post = await db.user.findUnique({
            where: {
                id: userId.data
            }
        })
        res.send(post)
    } else {
        res.status(400).send({ message: 'Wrong userId' })
    }
})

// Create
usersRouter.post('/', async (req, res, next) => {
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(3).max(20),
        name: z.string().max(30)
    })
    const newUser = await schema.parseAsync(req.body)
    const passwordHash = hashSync(newUser.password)
    const newUserDB = await db.user.create({
        data: {
            email: newUser.email,
            name: newUser.name,
            passwordHash: passwordHash
        }
    })
    res.send(newUserDB)
})

// Update
usersRouter.patch('/:userId', async (req, res, next) => {
    const schemaBody = z.object({
        email: z.string().email().optional(),
        password: z.string().min(3).max(20).optional(),
        name: z.string().max(30).optional()
    })
    const schemauserId = z.number()
    const userId = await schemauserId.parseAsync(+req.params.userId)
    const parsedUser = await schemaBody.parseAsync(req.body)
    const updatedUser: Prisma.UserUpdateInput = {}
    if (parsedUser.email) updatedUser.email = parsedUser.email
    if (parsedUser.name) updatedUser.name = parsedUser.name
    if (parsedUser.password) updatedUser.passwordHash = hashSync(parsedUser.password)
    
    const updatedUserDb = await db.user.update({
        where: {
            id: userId
        },
        data: updatedUser
    })
    res.send(updatedUserDb)
})

// Delete
usersRouter.delete('/:userId', async (req, res) => {
    const schemauserId = z.number()
    const userId = await schemauserId.parseAsync(+req.params.userId)
    const removedUser = await db.user.delete({
        where: {
            id: userId
        }
    })
    res.send(removedUser)
})