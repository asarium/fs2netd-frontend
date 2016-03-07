/// <reference path="../../../typings/browser.d.ts"/>

import Server = types.Server;
import UserLogin = types.UserLogin;
import APIToken = types.APIToken;
import ExtendedUser = types.ExtendedUser;
import {STORAGE_API_KEY} from "../Constants";
import fetch from 'isomorphic-fetch'

function localstorageAvailable():boolean {
    try {
        let storage = localStorage;
        let x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return false;
    }
}

interface IAPIConfig {
    api_basepath: string;
    token: string;
}

export class AuthenticationError extends Error {
}
export class StatusError extends Error {

    private _status:number;
    private _statusText:string;

    constructor(status:number, statusText:string) {
        super(status + " " + statusText);
        this._status = status;
        this._statusText = statusText;
    }

    get Status():number {
        return this._status;
    }

    get StatusText():string {
        return this._statusText;
    }
}

export class APIClient {
    private _config:IAPIConfig;

    constructor(config:IAPIConfig) {
        this._config = config;
    }

    get Config():IAPIConfig {
        return this._config;
    }

    private constructPath(subpath:string):string {
        return this._config.api_basepath + subpath;
    }

    private queryServer<T>(method:string, path:string, data?:any):Promise<T> {
        let fullpath = this.constructPath(path);
        let headers = new Headers();

        if (this._config.token) {
            headers.set("Authorization", this._config.token);
        }
        if (data) {
            headers.set("Content-Type", "application/json");
        }

        var requestConfig:RequestInit = {
            method: method,
            mode: "cors",
            headers: headers
        };
        if (data) {
            requestConfig.body = JSON.stringify(data);
        }

        return fetch(fullpath, requestConfig).then(response => {
            if (!response.ok) {
                if (response.status == 401 || response.status == 403) {
                    throw new AuthenticationError();
                }
                throw new StatusError(response.status, response.statusText);
            }
            return response.json<T>();
        });
    }

    getServerList():Promise<Server[]> {
        return this.queryServer<Server[]>("GET", "/servers");
    }

    authenticate(login:UserLogin):Promise<APIToken> {
        return this.queryServer<APIToken>("POST", "/authenticate", login).then(token => {
            if (token) {
                this._config.token = token.token;

                if (localstorageAvailable()) {
                    localStorage.setItem(STORAGE_API_KEY, token.token);
                }
            }

            return token;
        });
    }

    getCurrentUser():Promise<ExtendedUser> {
        return this.queryServer<ExtendedUser>("GET", "/users/me");
    }
}

let token = null;
if (localstorageAvailable()) {
    token = localStorage.getItem(STORAGE_API_KEY);
}

export const apiClient = new APIClient({
    api_basepath: "http://localhost:8080/api/v1",
    token: token
});
