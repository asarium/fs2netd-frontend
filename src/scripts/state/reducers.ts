import {combineReducers} from "redux";
import {UserState} from "./State";
import {AUTHENTICATE_USER} from "./actions";
import {RECEIVE_USER} from "./actions";
import {ReceiveUserAction} from "./actions";
import {ServerState} from "./State";
import {REQUEST_SERVERS} from "./actions";
import {INVALIDATE_SERVERS} from "./actions";
import {RECEIVE_SERVERS} from "./actions";
import {ReceiveServersAction} from "./actions";

interface IAction {
    type: string;
}

function user(state:UserState = {
    authenticating: false,
    user: null
}, action:IAction):UserState {
    switch (action.type) {
        case AUTHENTICATE_USER:
            return {
                authenticating: true,
                user: null
            };
        case RECEIVE_USER:
            return {
                authenticating: false,
                user: (action as ReceiveUserAction).user
            };
        default:
            return state;
    }
}

function servers(state:ServerState = {
    isFetching: false,
    didInvalidate: false,
    lastUpdate: null,
    servers: []
}, action:IAction):ServerState {
    switch (action.type) {
        case REQUEST_SERVERS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case INVALIDATE_SERVERS:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case RECEIVE_SERVERS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                lastUpdate: new Date(),
                servers: (action as ReceiveServersAction).servers
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user: user,
    servers: servers
});

export default rootReducer;
