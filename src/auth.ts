import { RequestHandler } from 'express'
import { sign, verify } from 'jsonwebtoken'
import { promisify } from 'util'
import db from './db'
// create own promisify method
const signAsync = promisify(sign)
// const verifyAsync = promisify(verify)
type JWTPayload = { userId: number }
const verifyAsync = function (token: string, secret: string): Promise<JWTPayload> {
    return new Promise((resolve, reject) => {
        verify(token, secret, (err, decodedToken) => {
            if (err) reject(err)
            else resolve(decodedToken as JWTPayload)
        })
    })
}

export async function createToken(userId: number) {
    const token = await signAsync({ userId }, 'supersecret') as string
    return token
}

// Middleware express function
// Autorisation
export const verifyToken: RequestHandler = async (req, res, next) => {
    const token: string = req.cookies.token
    if (token) {
        try {
            const decodedToken = await verifyAsync(token, 'supersecret')
            const user = await db.user.findUnique({
                where: {
                    id: decodedToken.userId
                }
            })
            if (user) {
                // @ts-ignore
                req.user = user
                next()
            } else {
                res.status(401).send({
                    message: 'Wrong userid in the token'
                })
            }
        } catch (error) {
            res.status(401).send({
                message: 'Wrong token'
            })
        }
    }
}