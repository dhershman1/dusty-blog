import express from 'express'

const router = express.Router()

// Routes for basic pages like About and Contact
router.get('/about', (_, res) => {
  res.sendFile('about.html', { root: './public' })
})

router.get('/contact', (_, res) => {
  res.sendFile('contact.html', { root: './public' })
})

export default router
