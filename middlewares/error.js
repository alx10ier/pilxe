// todo: 对error分别进行处理 e.g. 405
function error() {
  return async (ctx, next) => {
    try {
      await next();
      if (ctx.status === 404) {
        ctx.throw(404)
      }
    } catch (err) {
      ctx.status = err.status || ctx.status;
      await ctx.render('error', { error: err })
    }
  };
}

module.exports = error;
