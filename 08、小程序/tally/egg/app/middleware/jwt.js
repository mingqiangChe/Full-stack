module.exports = (options) => {
  return async function jwt(ctx, next) {
    const token = ctx.request.header.authorization;
    if (token) {
      try {
        // 解码token
        ctx.app.decode = ctx.app.jwt.verify(token, options.secret);
        await next();
      } catch (error) {
        ctx.status = 401;
        ctx.body = {
          msg: error.message,
        };
        return;
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        msg: "没有token授权",
      };
      return;
    }
  };
};
