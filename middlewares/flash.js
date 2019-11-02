function flash() {
  return async (ctx, next) => {
    ctx.flash = function (type, msg) {
      this.session.flash = this.session.flash || {}
      const flash = this.session.flash
      flash[type] = flash[type] || []
      if (type && msg) { // set
        if (Array.isArray(msg)) {
          msg.forEach(item => {
            flash[type].push(item)
          })
        } else {
          flash[type].push(msg)
        }
      } else if (type) { // get
        msg = flash[type]
        delete flash[type]
        return msg.length ? msg : null
      }
    }.bind(ctx)
    await next()
  }
}

module.exports = flash
