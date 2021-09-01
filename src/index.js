import React from "react";
import ReactDOM from "react-dom";
import "styles/index.css";
import App from "./App";
import Wrapper from "i18n/wrapper.js";
import { Provider } from "react-redux";
import store from "redux/store";
ReactDOM.render(
    <Provider store={store}>
        <Wrapper>
            <App />
        </Wrapper>
    </Provider>,
    document.getElementById("root")
);
