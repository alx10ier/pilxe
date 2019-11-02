const Router = require('koa-router')
const router = new Router()
const passport = require('koa-passport')
const { create } = require('../controllers/user')

router.post('/', create, passport.authenticate('local', {
  successRedirect: '/'
}))

router.get('/new', async ctx => {
  await ctx.render('users/signup', { error: ctx.flash('error') })
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/users/login',
    failureFlash: true
  }), ctx => {
    ctx.redirect(ctx.session.return || '/')
    delete ctx.session.return
  }
)

router.get('/login', async ctx => {
  if (ctx.isAuthenticated()) {
    await ctx.redirect('/')
  }
  await ctx.render('users/login', { error: ctx.flash('error') })
})

router.get('/logout', async ctx => {
  ctx.logout()
  await ctx.redirect('/')
})

module.exports = router
