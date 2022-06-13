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
  }

  start() {
    //获取文件入口

    console.log("开始解析文件依赖");
    const entryPath = path.resolve(this.root, this.entry);
    console.log(entryPath);
    // /Users/yxzhou/Workspace/person-learn/webpack-analyze/src/index.js
    this.createModule(entryPath, this.entry);
  }

  createModule(modulePath, name) {
    const code = fs.readFileSync(modulePath, "utf8");
    console.log(name);
    console.log(code);
  }
}

const webpack = new Webpack1(config);
webpack.start();
