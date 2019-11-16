const Router = require('koa-router')
const router = new Router()
const Post = require('../models/Post')

router.get('/', async ctx => {
  const limit = 10
  const page = ctx.query.page || 1
  const posts = await Post
    .find()
    .populate('category')
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ timestamp: -1, title: -1 })
  const count = await Post.countDocuments({})
  const pageTotal = Math.ceil(count / limit )
  await ctx.render('index', { posts: posts, page, pageTotal })
})

router.get('about', async ctx => {
  console.log('Going to about page')
  await ctx.render('about')
})

module.exports = router
