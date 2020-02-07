import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
export default class MainPage extends Component {
    render() {
        return <div>
            <Switch>
                <Route exact path='/' component={App}></Route>
                {/* <Route exact path="/tom" component={Feedback}></Route>
                <Route exact path="/10-days" component={Feedback}></Route> */}
            </Switch>
        </div>
    }
}
