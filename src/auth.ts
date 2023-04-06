import { RequestHandler } from 'express'
import { sign, verify } from 'jsonwebtoken'
import { promisify } from 'util'
// create own promisify method
const signAsync = promisify(sign)
const verifyAsync = promisify(verify)

export async function createToken(userId: number) {
    const token = await signAsync({ userId }, 'supersecret') as string
    return token
}

