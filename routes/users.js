import express from 'express'
import bcrypt from 'bcrypt'

const saltRounds = 10
const router = express.Router()

// Routes for user interactions like registering and logging in/out
router.post('/register', async (req, res) => {
  const usernameRegex = /^[a-zA-Z0-9_-]+$/
  // const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
  const easyPassword = /^.{8,}$/ // for testing purposes
  const { username, password } = req.body

  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      error: 'Invalid username. Only alphanumeric characters, underscores, and hyphens are allowed.'
    })
  }

  if (!easyPassword.test(password)) {
    return res.status(400).json({
      error: 'Invalid password. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.'
    })
  }

  await req.db('users').insert({
    username,
    password: await bcrypt.hash(password, saltRounds)
  })

  res.redirect('/')
})

router.post('/login', async (req, res) => {
  const foundUser = await req.db('users').select().where('username', req.body.username).first()

  if (foundUser && await bcrypt.compare(req.body.password, foundUser.password)) {
    req.session.user = foundUser.username
    req.session.userId = foundUser.id
    req.session.isAuthenticated = true
    res.redirect('/')
  } else {
    res.status(401).render('pages/unauthorized', { user: req.session.user })
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy()

  res.redirect('/')
})

export default router
