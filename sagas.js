import { call, put, takeEvery, all } from "redux-saga/effects";

// SAGA 1
function* helloSaga() {
  console.log("Hello Sagas!");
}

// Create delay const
export const delay = ms => new Promise(res => setTimeout(res, ms));

// SAGA 2 (Worker Saga)
export function* incrementAsync() {
  yield call(delay, 1000);
  yield put({ type: "INCREMENT" });
}

// SAGA 2 (Watcher Saga)[Create a new incrementAsync on each INCREMENT_ASYNC(Trigger?)]
function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

// SAGA 3 (Worker Saga)
export function* decrementAsync() {
  yield delay(1000);
  yield put({ type: "DECREMENT" });
}

// SAGA 3 (Watcher Saga)
function* watchDecrementAsync() {
  yield takeEvery("DECREMENT_ASYNC", decrementAsync);
}

// We only export the rootSaga now, this is an exit point for all of our Sagas
export default function* rootSaga() {
  // This saga yields the results of calling two sagas. This means the two generators will be started in parallel.
  yield all([helloSaga(), watchIncrementAsync(), watchDecrementAsync()]);
}
