import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Form from "./RegistrationForm/RegistrationForm";
import AboutForm from "./AboutForm/AboutForm";
import NotFound from './common/NotFound/NotFound';
import Navigation from './common/Navigation';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation/>

          <Switch>
            <Route path="/form" component={AboutForm} exact />
            <Route path="/request" component={Form} exact />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
