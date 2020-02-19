import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import Counter from "./Counter";
import reducer from "./reducers";

// Import our helloSaga
// import { helloSaga } from "./sagas";
// Import our rootSaga
import rootSaga from "./sagas";

// Create our middleware
const sagaMiddleware = createSagaMiddleware();
// applyMiddleware connects our saga
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
// Runs helloSaga
// sagaMiddleware.run(helloSaga);
// Runs rootSaga
sagaMiddleware.run(rootSaga);

const action = type => store.dispatch({ type });

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action("INCREMENT")}
      onDecrement={() => action("DECREMENT")}
      onIncrementAsync={() => action("INCREMENT_ASYNC")}
      onDecrementAsync={() => action("DECREMENT_ASYNC")}
    />,
    document.getElementById("root")
  );
}

render();
store.subscribe(render);
