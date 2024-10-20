import express from 'express'
import cors from 'cors'
import 'dotenv/config'

// Routes
import postsRouter from './routes/posts.js'
import pageRouter from './routes/pages.js'

// Middleware
import db from './middleware/db.js'

const app = express()
const PORT = 3000

app.use(express.urlencoded())
app.use(express.json())
app.use(cors())
app.use(express.static('static'))

app.use(db({
  client: 'pg',
  searchPath: ['public'],
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB,
    password: process.env.DB_PASS
  }
}))

app.use('/posts', postsRouter)
app.use(pageRouter)

app.get('/', (_, res) => {
  res.sendFile('index.html', { root: './public' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
