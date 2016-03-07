/// <reference path="../../../typings/browser.d.ts"/>

import * as React from "react";
import ExtendedUser = types.ExtendedUser;
import UserLogin = types.UserLogin;
import {UserState} from "../state/State";
import {State} from "../state/State";
import {authenticate} from "../state/actions";
import {connect} from "react-redux";

interface UserViewProps {
    user: ExtendedUser;
}
class UserView extends React.Component<UserViewProps, {}> {
    render() {
        return <div className="userView">
            <span>User: {this.props.user.name}</span>
            <span>Last Login: {this.props.user.lastLogin}</span>
            <span>Roles: {this.props.user.roles}</span>
        </div>
    }
}

interface UserInputProps {
    handleSubmit:(login:UserLogin) => void;
}
interface UserInputState {
    username: string;
    password: string;
}
class UserInput extends React.Component<UserInputProps, UserInputState> {

    constructor(props:UserInputProps, context:any) {
        super(props, context);
        this.state = {
            username: '',
            password: ''
        }
    }

    private handleUsernameChange(e) {
        this.setState({
            username: e.target.value,
            password: this.state.password
        });
    }

    private handlePasswordChange(e) {
        this.setState({
            username: this.state.username,
            password: e.target.value
        });
    }

    private onSubmit(e) {
        e.preventDefault();

        this.props.handleSubmit({
            name: this.state.username,
            password: this.state.password
        });
    }

    render() {
        return <form onSubmit={this.onSubmit.bind(this)} className="userInput">
            <label htmlFor="user">Username:</label>
            <input type="text" id="user" value={this.state.username} onChange={this.handleUsernameChange.bind(this)}/>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={this.state.password}
                   onChange={this.handlePasswordChange.bind(this)}/>
            <button type="submit">Submit</button>
        </form>
    }
}

interface UserBoxProps extends UserState {
    onLoginSubmit:(login:UserLogin) => void;
}
class UserBox extends React.Component<UserBoxProps, {}> {
    render() {
        let content;
        if (this.props.authenticating) {
            content = <span>Checking login...</span>;
        } else if (this.props.user) {
            content = <UserView user={this.props.user}/>
        } else {
            content = <UserInput handleSubmit={this.props.onLoginSubmit}/>
        }

        return <div className="userbox">
            {content}
        </div>
    }
}

const mapStateToProps = (state:State) => ({
    authenticating: state.user.authenticating,
    user: state.user.user
});
const mapDispatchToProps = (dispatch) => ({
    onLoginSubmit: (login) => {
        dispatch(authenticate(login));
    }
});

export const ConnectedUserBox = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserBox);