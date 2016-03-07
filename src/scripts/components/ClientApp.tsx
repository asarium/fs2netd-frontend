/// <reference path="../../../typings/browser.d.ts"/>

import * as React from "react";
import {ConnectedUserBox} from "./UserBox";
import {ServerList} from "./ServerList";
import {STORAGE_API_KEY} from "../Constants";
import ExtendedUser = types.ExtendedUser;
import {connect} from "react-redux";
import {State} from "../state/State";
import Server = types.Server;
import {UserState} from "../state/State";

interface AppProps {
    servers: Server[];
    user: UserState;
}
class ClientApp extends React.Component<AppProps, {}> {

    constructor(props:AppProps, context:any) {
        super(props, context);
    }

    render() {
        return <div>
            <ServerList servers={this.props.servers}/>
            <ConnectedUserBox />
        </div>
    }
}

const mapStateToProps = (state:State):AppProps => ({
    servers: state.servers.servers,
    user: state.user
});

export const ConnectedApp = connect(mapStateToProps)(ClientApp);