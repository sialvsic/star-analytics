# redux-analyze
This repo aim to analyze Redux and DIY it. 

## Redux 动机
- More State, More Complex
- How Manage State
- React didn’t handle it

## Redux 三大原则
- Single source of truth - 单一数据源
- State is read only - State是只读的
- Changes are made with pure functions - 使用纯函数进行修改

## Redux 核心组成
- Store 
- Action
- Reducer

## Redux WorkFlow
Action -> Reducers -> Store -> View

API
**store**
- getState()
- subscribe(listener)
- dispatch(action)

**Other**
- createStore(reducer, [preloadedState], enhancer)
- combineReducers(reducers)
- bindActionCreators
- compose
- applyMiddleware
- middleware

## Teach Path
- Store(createStore)
- combineReducers(reducers)
- bindActionCreators(actionCreators, dispatch)
- compose(...functions)
- applyMiddleware  && createStore-enhancer
- logger
- thunk

## Learn Path
Redux -> Redux thunk -> React Redux -> React -> React Router

## How to publish to npm
```bash
npm publish
```

```bash
npm unpublish @sialvsic/redux-analyze@0.0.1 -f
```

## How to publish in local with verdaccio
```bash
npm publish --registry http://localhost:4873
```


## 发布

```
"name": "@sialvsic/redux",
"version": "0.1.2"
```