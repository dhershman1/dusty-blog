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
  const results = []

  // Convert Map to array of objects
  // And add the id to the object
  for (const [key, value] of posts) {
    results.push({ id: key, ...value })
  }

  res.json(results)
})

router.delete('/:postId', (req, res) => {
  posts.delete(req.params.postId)

  res.sendFile('post-deleted.html', { root: './public' })
})

router.post('/', (req, res) => {
  posts.set(String(idx++), req.body)

  res.sendFile('index.html', { root: './public' })
})

export default router
