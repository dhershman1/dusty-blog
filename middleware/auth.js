const authMiddleware = (req, res, next) => {
  const openRoutes = [
    '/',
    '/login',
    '/register',
    '/about',
    '/contact',
    '/posts',
    '/users/login',
    '/users/register'
  ]
  const isSingularPost = req.path.match(/^\/posts\/[0-9]+$/)

  if (isSingularPost ||
      openRoutes.includes(req.path) ||
      (req.session && req.session.userId)) {
    next()
  } else {
    res.status(401).render('pages/unauthorized', { user: req.session.user })
  }
}

export default authMiddleware
