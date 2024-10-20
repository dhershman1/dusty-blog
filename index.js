import express from 'express'
import cors from 'cors'
import session from 'express-session'
import 'dotenv/config'

// Routes
import postsRouter from './routes/posts.js'
import pageRouter from './routes/pages.js'
import userRouter from './routes/users.js'

// Middleware
import db from './middleware/db.js'

const app = express()
const PORT = 3000

app.set('view engine', 'ejs')

app.use(express.urlencoded())
app.use(express.json())
app.use(express.static('static'))
app.use(cors())
app.use(session({
  secret: process.env.APP_SECRET,
  resave: false,
  saveUninitialized: true
}))
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
app.use('/users', userRouter)
app.use(pageRouter)

app.get('/', (_, res) => {
  res.render('pages/index')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
