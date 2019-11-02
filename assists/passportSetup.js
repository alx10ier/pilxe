const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)
  })

  passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username: username }) || await User.findOne({ email: username })
    if (!user) {
      return done(null, false, { message: '用户名或邮箱不存在' })
    }
    if (await user.checkPassword(password)) {
      return done(null, user)
    } else {
      return done(null, false, { message: '密码错误' })
    }
  }))
}
