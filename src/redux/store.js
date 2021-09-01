import { createStore, applyMiddleware, compose } from "redux";
import allReducers from "./reducers/";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    allReducers,
    {},
    composeEnhancers(applyMiddleware(thunk))
);

// const store = createStore(
//     allReducers,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

export default store;
