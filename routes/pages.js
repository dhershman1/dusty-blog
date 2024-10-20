import express from 'express'

const router = express.Router()

// Routes for basic pages like About and Contact
router.get('/about', (req, res) => {
  res.render('pages/about', { user: req.session.user })
})

router.get('/contact', (req, res) => {
  res.render('pages/contact', { user: req.session.user })
})

router.get('/register', (req, res) => {
  if (req.session.user) {
    return res.redirect('/')
  }

  res.render('pages/register', { user: req.session.user })
})

router.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/')
  }

  res.render('pages/login', { user: req.session.user })
})

router.get('/edit/:postId', async (req, res) => {
  const foundPost = await req.db('posts').select().where('id', req.params.postId).first()

  if (req.session.userId === foundPost.created_by) {
    res.render('pages/edit', { post: foundPost, user: req.session.user, userId: req.session.userId })
  } else {
    res.status(401).send('Unauthorized')
  }
})

export default router
