import React, { Component } from 'react';
import SignIn from './signIn';
import SignUp from './signUp';
import Dashboard from './dashboard'
import {
    BrowserRouter as Router,
    Route
  } from 'react-router-dom'

 class RouterCom extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                <Route exact path="/" component={SignIn}/>
                <Route path="/signup" component={SignUp} />
                <Route path="/dashboard" component={Dashboard}/>
                   </div>
                </Router>
            </div>
        )
    }
}

export default RouterCom;