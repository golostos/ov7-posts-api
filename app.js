const express = require('express')
const db = require('./prisma/db')
const app = express()

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
    const allPosts = await db.post.findMany()
    res.send(allPosts)
})

// Create
app.post('/api/posts', async (req, res) => {
    const newPost = req.body
    const newPostDB = await db.post.create({
        data: newPost
    })
    res.send(newPostDB)
})

app.listen(3333)