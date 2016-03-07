import * as React from "react";
import {ConnectedApp} from "./components/ClientApp";
import { Provider } from 'react-redux';
import thunkMiddleware from "redux-thunk";
import { createStore } from 'redux'
import * as ReactDOM from "react-dom";
import rootReducer from "./state/reducers";
import {fetchServers} from "./state/actions";
import {applyMiddleware} from "redux";
import {IAction} from "redux";
import {apiClient} from "./api/ApiClient";
import {updateCurrentUser} from "./state/actions";

// store needs to be any because there's a bug in the typings which break when passing a function to dispatch
let store:any = createStore(rootReducer, applyMiddleware(thunkMiddleware));

store.dispatch(fetchServers());
if (apiClient.Config.token) {
    store.dispatch(updateCurrentUser());
}

ReactDOM.render(<Provider store={store}>
    <ConnectedApp />
</Provider>, document.getElementById("content"));
