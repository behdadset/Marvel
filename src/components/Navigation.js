import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import { Navbar,Nav} from 'react-bootstrap'
import Home from './Home';
import AboutUs from './AboutUs';
import Login from './Login';
import Signup from './Signup';
import Hero from './Hero'
import fire from './fire'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Navigation extends React.Component {
    constructor(){
        super()
        this.state={
            logedin: false
        }
        fire.auth().onAuthStateChanged((user) =>{
            if(user){
                this.setState({logedin: true})
                console.log(user)
            }
        })
    }
    
    logout = () => { //Signout 
        fire.auth().signOut();
    }

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
                                        <Nav.Link href="/about-us">About</Nav.Link>
                                        <Nav.Link href="/login">Login</Nav.Link>
                                        {this.state.logedin
                                            ? (<Nav.Link href="/"><button className="btn btn-info" onClick={this.logout()}>Logout</button></Nav.Link>) 
                                            : (null)}
                                        
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                            <br />
                            <Switch>
                                <Route exact path="/">
                                    <Home />
                                </Route>
                                <Route path="/about-us">
                                    <AboutUs />
                                </Route>
                                <Route path="/login">
                                    <Login />
                                </Route>
                                <Route path="/signup">
                                    <Signup />
                                </Route>
                                <Route path="/hero/:id">
                                    <Hero />
                                </Route>
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
}
