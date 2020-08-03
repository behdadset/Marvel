import React, { Component } from 'react'
import Characters from './Characters'
import MarvelLogo from '../marvel-logo.png'

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <img src={MarvelLogo} alt="Marvel logo" className="marvel-logo"></img>
                <Characters />
            </div>
        )
    }
}
