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
            <div >
                <br/><br/><br/>
                {!this.props.user && //Loading
                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>     
                }
                <div className="profile">
                    {this.props.user &&
                        <h3>Your Id is "{this.props.user}"</h3>
                    }
                    <br/><br/><br/>
                    {this.props.user &&
                        <button onClick={this.logout} className="btn btn-info ">Log out</button>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Profile)