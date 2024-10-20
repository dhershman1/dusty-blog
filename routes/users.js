import express from 'express'
import bcrypt from 'bcrypt'

const saltRounds = 10
const router = express.Router()

// Routes for user interactions like registering and logging in/out
router.post('/register', async (req, res) => {
  /**
   * Validates the username and password in the request body and inserts a new user into the database.
   * Redirects the user to the home page after successful registration.
   * @param {Object} req - The request object.
   * @param {Object} req.db - The database connection.
   * @param {Object} req.body - The body of the request.
   * @param {string} req.body.username - The username to validate and insert into the database.
   * @param {string} req.body.password - The password to validate and insert into the database.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} A promise that resolves when the user is successfully registered.
   */
  const usernameRegex = /^[a-zA-Z0-9_-]+$/
  const passwordRegex = process.env.NODE_ENV === 'production'
    ? /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
    : /^.{8,}$/ // for testing purposes
  const { username, password } = req.body

  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      error: 'Invalid username. Only alphanumeric characters, underscores, and hyphens are allowed.'
    })
  }

  if (!passwordRegex.test(password)) {
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
  /**
   * Retrieves a user from the database based on the provided username in the request body.
   *
   * @param {Object} req - The request object.
   * @param {Object} req.db - The database connection.
   * @param {Object} req.body - The body of the request.
   * @param {string} req.body.username - The username to search for in the database.
   * @returns {Promise<Object|null>} A promise that resolves to the found user object or null if no user is found.
   */
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
  /**
   * Destroys the session and redirects the user to the home page.
   */
  req.session.destroy()

  res.redirect('/')
})

export default router
