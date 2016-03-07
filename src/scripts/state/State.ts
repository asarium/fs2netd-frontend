import ExtendedUser = types.ExtendedUser;
import Server = types.Server;
import {STORAGE_API_KEY} from "../Constants";

export interface UserState {
    authenticating: boolean;
    user: ExtendedUser;
}
export interface ServerState {
    isFetching: boolean;
    didInvalidate: boolean;
    lastUpdate: Date;
    servers: Server[];
}

export interface State {
    user: UserState,
    servers: ServerState
}
