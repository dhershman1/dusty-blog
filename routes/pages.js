import express from 'express'

const router = express.Router()

// Routes for basic pages like About and Contact
router.get('/about', (_, res) => {
  res.render('pages/about')
})

router.get('/contact', (_, res) => {
  res.render('pages/contact')
})

router.get('/register', (req, res) => {
  if (req.session.user) {
    res.redirect('/')
  }

  res.render('pages/register')
})

export default router
