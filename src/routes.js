import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import LandingComponent from './components/auth/LandingComponent';
import VerifyOTP from './components/auth/VerifyOTP';
import Signup from './components/auth/Signup';
import ViewProfile from './components/profile/ViewProfile';
import UserContainer from './container/UserContainer';

const browserHistory = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <BrowserRouter history={browserHistory}>
        <Route exact path='/' component={UserContainer(LandingComponent)} />
        <Route path='/landing' component={UserContainer(LandingComponent)} />
        <Route path='/verifyOTP' component={UserContainer(VerifyOTP)} />
        <Route path='/signup' component={UserContainer(Signup)} />
        <Route path='/user' component={UserContainer(ViewProfile)} />
      </BrowserRouter>
    );
  }
}

export default App;
