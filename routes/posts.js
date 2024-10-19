import express from 'express'

const router = express.Router()

// Internal DB that resets on server restart
const posts = new Map()
let idx = 1

router.get('/:postId', (req, res) => {
  if (req.headers['content-type'] === 'application/json') {
    res.json(posts.get(req.params.postId))
  } else if (posts.has(req.params.postId)) {
    res.sendFile('post.html', { root: './public' })
  } else {
    res.status(404).send('Post not found')
  }
})

router.get('/', (req, res) => {
  res.json(Array.from(posts.values()))
})

router.post('/', (req, res) => {
  posts.set(String(idx++), req.body)

  res.sendFile('index.html', { root: './public' })
})

export default router
