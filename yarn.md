## koa workspace 使用

## 根

```
yarn add -W react react-dom parcel @babel/core @babel/cli @babel/preset-react @babel/preset-env webpack webpack-cli
yarn add -W -D @types/react @types/react-dom

```

## 子workspace

example: 

```
yarn workspace clean
```

```
yarn workspace react add  @babel/plugin-proposal-class-properties
```

```
yarn workspace styled-components add styled-components
```

```
yarn workspace webpack add webpack webpack-cli
```

```
yarn workspace react-redux-analyze add @sialvsic/redux
```