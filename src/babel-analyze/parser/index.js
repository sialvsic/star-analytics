// https://astexplorer.net/
const { parse } = require("@babel/parser");

const code = `function add(x, y) {
  return x + y;
}

add(1, 2);
`

const ast = parse(code, { errorRecovery: true });

console.log(ast);
console.log(ast.errors);

// output
/*
Node {
  type: 'File',
  start: 0,
  end: 51,
  loc: SourceLocation {
    start: Position { line: 1, column: 0, index: 0 },
    end: Position { line: 6, column: 0, index: 51 },
    filename: undefined,
    identifierName: undefined
  },
  errors: [],
  program: Node {
    type: 'Program',
    start: 0,
    end: 51,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    sourceType: 'script',
    interpreter: null,
    body: [ [Node], [Node] ],
    directives: []
  },
  comments: []
}
*/

// console.log(ast.errors && ast.errors[0].code); // BABEL_PARSER_SYNTAX_ERROR
// console.log(ast.errors && ast.errors[0].reasonCode); // MissingSemicolon

