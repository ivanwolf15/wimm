import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { getUserDoc } from './utils/firestore';
import Home from './pages/Home';
import Splash from './pages/Splash';
import Setup from './pages/Setup';
import Login from './pages/Login';
import { UserProvider } from './hocs/userContext';


class App extends Component {
  componentDidMount() {
    this.handleRedirect();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.handleRedirect();
    }
  }

  handleRedirect() {
    const { history, user } = this.props;
    if (user) {
      getUserDoc(user).get().then((doc) => {
        if (doc.exists) {
          history.replace('/home');
        } else {
          history.replace('/setup');
        }
      });
    } else {
      history.replace('/login');
    }
  }

  render() {
    return (
      <UserProvider value={this.props.user}>
        <Switch>
          <Route path="/setup" component={Setup} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Splash} />
        </Switch>
      </UserProvider>
    );
  }
}


export default withRouter(App);
