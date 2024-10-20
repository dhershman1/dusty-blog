import express from 'express'

const router = express.Router()

router.get('/:postId', async (req, res) => {
  const foundPost = await req.db('posts').select().where('id', req.params.postId).first()

  if (req.headers['content-type'] === 'application/json') {
    res.json(foundPost)
  } else if (foundPost) {
    res.render('pages/post', { post: foundPost })
  } else {
    res.status(404).send('Post not found')
  }
})

router.get('/', async (req, res) => {
  const posts = await req.db('posts').select()

  res.json(posts)
})

router.delete('/:postId', (req, res) => {
  req.db('posts').delete(req.params.postId)

  res.render('pages/post-deleted')
})

router.post('/', async (req, res) => {
  await req.db('posts').insert({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author || 'Anonymous'
  })

  res.render('pages/index')
})

export default router
