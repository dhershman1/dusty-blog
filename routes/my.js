import express from 'express'

const router = express.Router()

router.get('/posts', async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = 5
  const offset = (page - 1) * limit

  const [posts, totalPosts] = await Promise.all([
    req.db('posts')
      .select()
      .where('created_by', req.session.userId)
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset),
    req.db('posts').where('created_by', req.session.userId).count('id as count').first()
  ])

  const pagination = {
    currentPage: page,
    lastPage: Math.ceil(totalPosts.count / limit)
  }

  if (req.xhr || req.headers.accept.indexOf('json') > -1) {
    res.json({ posts, pagination })
  } else {
    res.render('pages/my-posts', { posts, pagination, user: req.session.user })
  }
})

router.get('/profile', async (req, res) => {
  const user = await req.db('users').select(['id', 'username']).where('id', req.session.userId).first()

  res.render('pages/profile', { profile: user, user: req.session.user })
})

export default router
