#!/usr/bin/env node
const path = require("path");
const fs = require("fs");

//默认配置
const defaultConfig = {
  entry: "./index.js",
  output: "./build/x.js",
};

const config = {
  ...defaultConfig,
  ...require(path.resolve("./scripts/x.config.js")),
};

class Webpack1 {
  constructor(config) {
    this.config = config;
    this.entry = config.entry;
    this.root = process.cwd();
    this.modules = {};
  }

  start() {
    //获取文件入口

    console.log("开始解析文件依赖");
    const entryPath = path.resolve(this.root, this.entry);
    console.log(entryPath);
    // /Users/yxzhou/Workspace/person-learn/webpack-analyze/src/index.js
    this.createModule(entryPath, this.entry);
    console.log(this.modules);
  }

  parse(code, parent) {
    //能够解析文件中的require('xxx') 这种格式
    let deps = [];
    let r = /require\('(.*)'\)/g;

    //require('xx')  替换为 __webpack_require__
    code = code.replace(r, function (math, args) {
      //依赖路径

      const retPath = path.join(parent, args.replace(/'|"/g, ""));
      deps.push(retPath);

      return `__webpack_require__("./${retPath}")`;
    });

    return { code, deps };
  }

  createModule(modulePath, name) {
    const fileContent = fs.readFileSync(modulePath, "utf8");

    //替换后的代码和依赖数组
    // console.log(name);  // => ./src/index.js
    // console.log(path.dirname(name));  // => ./src

    const { code, deps } = this.parse(fileContent, path.dirname(name));

    // console.log(code);
    // console.log(deps);
    //替换require

    this.modules[name] = function (module, exports, __webpack_require__) {
      eval(`${code}`);
    };

    //循环获取所有依赖数组内容

    deps.forEach((dep) => {
      this.createModule(path.join(this.root, dep), "./" + dep);
    });
  }
}

const webpack = new Webpack1(config);
webpack.start();
