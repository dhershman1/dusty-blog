import express from 'express'

const router = express.Router()

router.get('/:postId', async (req, res) => {
  const foundPost = await req.db('posts').select().where('id', req.params.postId).first()

  if (req.headers['content-type'] === 'application/json') {
    res.json(foundPost)
  } else if (foundPost) {
    res.render('pages/post', { post: foundPost, user: req.session.user, userId: req.session.userId })
  } else {
    res.status(404).render('pages/not-found', { user: req.session.user })
  }
})

router.get('/', async (req, res) => {
  const posts = await req.db('posts').select()

  res.json(posts)
})

router.delete('/:postId', async (req, res) => {
  try {
    const record = await req.db('posts').where({
      id: req.params.postId,
      created_by: req.session.userId
    }).del(['title'])

    res.render('pages/post-deleted', { user: req.session.user, title: record[0].title })
  } catch (error) {
    console.error(error)
    res.status(401).render('pages/unauthorized', { user: req.session.user })
  }
})

router.put('/:postId', async (req, res) => {
  try {
    const foundPost = await req.db('posts').where({
      id: req.params.postId,
      created_by: req.session.userId
    }).update({
      title: req.body.title,
      content: req.body.content
    }, ['title', 'content', 'author', 'created_by'])

    res.render('pages/post', { post: foundPost, user: req.session.user, userId: req.session.userId })
  } catch (error) {
    console.error(error)
    res.status(401).render('pages/unauthorized', { user: req.session.user })
  }
})

router.post('/', async (req, res) => {
  await req.db('posts').insert({
    title: req.body.title,
    content: req.body.content,
    author: req.session.user || 'Anonymous',
    created_by: req.session.userId
  })

  res.render('pages/index', { user: req.session.user })
})

export default router
