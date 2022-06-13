const Koa = require("koa");
const app = new Koa();

app.use(async (ctx, next) => {
  ctx.body = "Hello World";

  if (ctx.path === "/cool") {
    ctx.body = "cool";
  } else {
    await next();
  }
});

app.listen(3000);
