
import UserLogin = types.UserLogin;
import Server = types.Server;
import ExtendedUser = types.ExtendedUser;
import {State} from "./State";
import {apiClient} from "../api/ApiClient";

interface IAction {
    type: string;
}

export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export type AuthenticateAction = IAction;
function authenticateUser():AuthenticateAction {
    return {
        type: AUTHENTICATE_USER
    }
}

export const RECEIVE_USER = "RECEIVE_USER";
export interface ReceiveUserAction extends IAction {
    user: ExtendedUser;
}
function receiveUser(user:ExtendedUser) {
    return {
        type: RECEIVE_USER,
        user: user
    }
}

export const REQUEST_SERVERS = "REQUEST_SERVERS";
export type RequestServersAction = IAction;
function requestServers():RequestServersAction {
    return {
        type: REQUEST_SERVERS,
    }
}

export const INVALIDATE_SERVERS = "INVALIDATE_SERVERS";
export type InvalidateServersAction = IAction;
export function invalidateServers():InvalidateServersAction {
    return {
        type: INVALIDATE_SERVERS
    }
}

export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export interface ReceiveServersAction extends IAction {
    servers: Server[];
}
function receiveServers(servers:Server[]):ReceiveServersAction {
    return {
        type: RECEIVE_SERVERS,
        servers: servers
    }
}

export function updateCurrentUser() {
    return async (dispatch) => {
        let user = await apiClient.getCurrentUser();

        dispatch(receiveUser(user));
    }
}

export function authenticate(login:UserLogin) {
    return async (dispatch) => {
        dispatch(authenticateUser());

        await apiClient.authenticate(login);

        dispatch(updateCurrentUser());
    }
}

export function fetchServers() {
    return async (dispatch) => {
        dispatch(requestServers());
        let servers = await apiClient.getServerList();

        dispatch(receiveServers(servers));
    }
}
