import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import { Navbar,Nav} from 'react-bootstrap'
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import Hero from './Hero'
import fire from './fire'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './Card'

export default class Navigation extends React.Component {
    constructor(){
        super()
        this.state={
            userId: "",
            email: ""
        }
        fire.auth().onAuthStateChanged((user) =>{
            if(user.uid !== ""){
                this.setState({userId: user.uid})
                this.setState({email: user.email})
            }
        })
    }
    
    //Navbar with Router
    render() {
        return (
            <div>
                <div className="row navCenter">
                    <div className="col-md-12">
                        <Router>
                            <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="navbar">
                                <Navbar.Brand className="nameNav">Marvel Shop</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                        <Nav.Link href="/">Home</Nav.Link>
                                        {fire.auth().W &&
                                            <Nav.Link href="/card">Card</Nav.Link>
                                        }
                                        {this.state.userId === ""
                                        ?<Nav.Link className="loginBnt" href="/login">Login</Nav.Link>
                                        : <Nav.Link className="loginBnt" href="/profile">Profile</Nav.Link>
                                        }
                                        
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                            <br />
                            <Switch>
                                <Route exact path="/" userId={this.state.userId}>
                                    <Home />
                                </Route>
                                <Route path="/login" >
                                    <Login />
                                </Route>
                                <Route path="/signup">
                                    <Signup />
                                </Route>
                                <Route path="/profile">
                                    <Profile user={this.state.email}/>
                                </Route>
                                <Route path="/hero/:id" >
                                    <Hero userId={this.state.userId}/>
                                </Route>
                                <Route path="/card" >
                                    <Card userId={this.state.userId}/>
                                </Route>
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
}
