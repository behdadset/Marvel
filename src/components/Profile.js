import React, { Component } from 'react'
import fire from './fire'
import {withRouter} from 'react-router-dom'


class Profile extends Component {
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this);

    }

    logout = (e) => { //Signout 
        e.preventDefault();
        fire.auth().signOut();
        this.props.history.push("/")

    }
    render() {
        return (
            <div className="row">
                <div>
                    <button onClick={this.logout} className="btn btn-info btn-lg btn-block btn-huge">Log out</button>
                </div>
            </div>
        )
    }
}

export default withRouter(Profile)