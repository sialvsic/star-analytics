const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");

class Koa {
  constructor() {
    this.middlewares = [];
  }

  listen(...args) {
    http
      .createServer(async (req, res) => {
        //创建上下文对象
        const ctx = this.createContext(req, res);
        const fn = this.compose(this.middlewares);
        await fn(ctx);
        // this.callback(ctx);
        //给用户返回信息

        res.end(ctx.body);
      })
      .listen(...args);
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  compose(middlewares) {
    return function (ctx) {
      function dispatch(i) {
        let fn = middlewares[i];
        if (!fn) {
          return Promise.resolve();
        }

        return Promise.resolve(
          fn(ctx, function next() {
            return dispatch(i + 1);
          })
        );
      }

      return dispatch(0);
    };
  }

  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);

    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;

    return ctx;
  }
}

module.exports = Koa;
