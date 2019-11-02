module.exports = async (ctx, next) => {
   if (ctx.isAuthenticated()) {
     await next()
   } else {
     ctx.flash('info', 'login to continue')
     ctx.session.return = ctx.url
     ctx.redirect('/users/login')
   }
}