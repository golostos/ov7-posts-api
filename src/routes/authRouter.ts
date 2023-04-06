import { Router } from "express"
import { z } from "zod"
import db from "../db"
import { createToken } from "../auth"
import { compareSync } from "bcryptjs"

export const authRouter = Router()

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
        res.send({
            token
        })
    } else {
        res.status(401).send({
            message: 'Wrong credentials'
        })
    }
})

authRouter.post('/api/signup', async (req, res, next) => {
    
})