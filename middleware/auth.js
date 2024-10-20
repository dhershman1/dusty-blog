const authMiddleware = (req, res, next) => {
  const openRoutes = ['/', '/login', '/register', '/about', '/contact', '/posts']

  if (openRoutes.includes(req.path) || (req.session && req.session.userId)) {
    next()
  } else {
    res.status(401).render('pages/unauthorized', { user: req.session.user })
  }
}

export default authMiddleware
