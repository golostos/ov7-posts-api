import { Router } from "express"
import { z } from "zod"
import db from "../db"
import { createToken } from "../auth"
import { compareSync, hashSync } from "bcryptjs"

export const authRouter = Router()

// Authentication => Login + Password => Token
authRouter.post('/api/login', async (req, res, next) => {
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(3).max(20),
    })
    const user = await schema.parseAsync(req.body)
    const userDb = await db.user.findUnique({
        where: {
            email: user.email
        }
    })
    if (userDb && compareSync(user.password, userDb.passwordHash)) {
        const token = await createToken(userDb.id)
        // XSS atack
        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 2 * 24 * 3600 * 1000),
        })
        res.cookie('test', 'Hello world')
        res.send({
            message: 'Successful login'
        })
    } else {
        res.status(401).send({
            message: 'Wrong credentials'
        })
    }
})

authRouter.post('/api/signup', async (req, res, next) => {
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(3).max(20),
        name: z.string().max(30)
    })
    const newUser = await schema.parseAsync(req.body)
    const passwordHash = hashSync(newUser.password)
    const userDb = await db.user.create({
        data: {
            email: newUser.email,
            name: newUser.name,
            passwordHash
        }
    })
    const token = await createToken(userDb.id)
    // XSS atack
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 2 * 24 * 3600 * 1000),
    })
    // res.cookie('token', '')
    res.send({
        message: 'Successful signup'
    })
})