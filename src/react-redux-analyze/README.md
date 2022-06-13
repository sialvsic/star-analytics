# react-redux-analyze
This repo aim to analyze react-redux and DIY it. 

## React redux 核心组成
- Provider
- connect

```js
const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
```

```js
const mapStateToProps = (state /*, ownProps*/) => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = { increment, decrement, reset }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
```

## Teach Path

## How to publish to npm

```bash
npm publish --access public
```

```bash
npm unpublish @sialvsic/react-redux@0.0.1 -f
```

## How to publish in local with verdaccio

```bash
npm publish --registry http://localhost:4873
```

P.S could install from local by adding this line in the .npmrc file
```bash
registry=http://localhost:4873
```
