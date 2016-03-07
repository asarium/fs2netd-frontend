/// <reference path="../../../typings/browser.d.ts"/>

import * as React from "react";
import Server = types.Server;

interface ServerConfig {
    server: Server;
}
class ServerListItem extends React.Component<ServerConfig, {}> {

    constructor(props:ServerConfig, context:any) {
        super(props, context);
    }

    render() {
        return <li>
            <div>
                <span>{this.props.server.name}</span>
            </div>
        </li>
    }
}


export interface IServerListProperties {
    servers:Server[];
}

export class ServerList extends React.Component<IServerListProperties, {}> {

    constructor(props:IServerListProperties, context:any) {
        super(props, context);
    }

    render() {
        let servers = this.props.servers.map(server => <ServerListItem key={server.id} server={server}/>);

        return <div className="serverList">
            <h3>Servers</h3>
            <ul>{servers}</ul>
        </div>
    }
}