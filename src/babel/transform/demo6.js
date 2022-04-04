//实现类似 babel-plugin-import
var babel = require("@babel/core");
var types = require('@babel/types');

const code = `import { A, B, C as D } from 'foo'`;

// 预期
/*
import A from 'foo/A'
import 'foo/A/style.css'
import B from 'foo/B'
import 'foo/B/style.css'
import D from 'foo/C'
import 'foo/C/style.css'
*/

// 要识别的模块
const MODULE = 'foo'

const visitor = {
  ImportDeclaration(path, state) {

    console.log('path', path.node.source.value);
    // console.log(typeof types.isModuleSpecifier);

    if (path.node.source.value !== MODULE) {
      return
    }

    // 如果是空导入则直接删除掉
    const specs = path.node.specifiers
    if (specs.length === 0) {
      path.remove()
      return
    }

    // 判断是否包含了默认导入和命名空间导入
    if (specs.some(i => types.isImportDefaultSpecifier(i) || types.isImportNamespaceSpecifier(i))) {
      // 抛出错误，Babel会展示出错的代码帧
      throw path.buildCodeFrameError("不能使用默认导入或命名空间导入")
    }

    // 转换命名导入
    const imports = []
    for (const spec of specs) {
      const named = MODULE + '/' + spec.imported.name
      const local = spec.local
      imports.push(types.importDeclaration([types.importDefaultSpecifier(local)], types.stringLiteral(named)))
      imports.push(types.importDeclaration([], types.stringLiteral(`${named}/style.css`)))
    }

    // 替换原有的导入语句
    path.replaceWithMultiple(imports)

  },
};

const result = babel.transform(code, {
  plugins: [{
    visitor: visitor
  }]
});

console.log(result.code)
//output

/*
import A from "foo/A";
import "foo/A/style.css";
import B from "foo/B";
import "foo/B/style.css";
import D from "foo/C";
import "foo/C/style.css";
*/