// @ts-check
import express from 'express';
require('express-async-errors');
import { postsRouter } from './routes/posts';
import { errorHandler } from './errorHandler';
import { usersRouter } from './routes/users';
import { authRouter } from './routes/authRouter';
import cookieParser from 'cookie-parser'
console.log('App starting...')
// import cors from 'cors';
const app = express()
// app.use(cors({
//     origin: ['http://127.0.0.1:5173', 'http://localhost:5173']
// }))

// body parser (json)
app.use(express.json())

app.use(cookieParser())

// HTTP API - application programming interface

app.use('/api/posts', postsRouter)
app.use('/api/users', usersRouter)
app.get('/api/health', (req, res) => res.send('OK'))
app.use(authRouter)

app.use(errorHandler)

app.listen(3333, () => console.log('Server started on http://localhost:3333'))