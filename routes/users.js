import express from 'express'
import bcrypt from 'bcrypt'

const saltRounds = 10
const router = express.Router()

// Routes for user interactions like registering and logging in/out
router.post('/register', async (req, res) => {
  await req.db('users').insert({
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, saltRounds)
  })

  res.rediect('/')
})

router.post('/login', async (req, res) => {
  const foundUser = await req.db('users').select().where('username', req.body.username).first()

  if (foundUser && await bcrypt.compare(req.body.password, foundUser.password)) {
    req.session.user = foundUser.username
    res.redirect('/')
  } else {
    res.status(401).send('Invalid credentials')
  }
})

router.post('/logout', (req, res) => {
  req.session.destroy()

  res.redirect('/')
})

export default router
