const User = require('../models/User')
const validator = require('validator')

module.exports = {
  create: async (ctx, next) => {
    const { username, email, password } = ctx.request.body
    let error
    if (!validator.isEmail(email)) {
      error = '邮箱格式错误'
    }
    if (await User.findOne({ username })) {
      error = '用户名已存在'
    }
    if (await User.findOne({ email })) {
      error = '邮箱已被注册'
    }
    if (error) {
      ctx.flash('error', error)
      return ctx.redirect('/users/new')
    }
    const newUser = new User({
      username,
      email,
      password
    });
    await newUser.save()
    await next()
  }
}
