import express from 'express'
import cors from 'cors'

// Routes
import postsRouter from './routes/posts.js'

const app = express()
const PORT = 3000

app.use(express.urlencoded())
app.use(express.json())
app.use(cors())
app.use(express.static('static'))

app.use('/posts', postsRouter)

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
