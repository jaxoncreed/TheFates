import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import Auth0Lock from 'auth0-lock';
import {logout, login} from 'redux/modules/auth0.js';

import s from '../styles/index.scss';

@asyncConnect([{
  promise: () => {
    const promises = [];

    return Promise.all(promises);
  }
}])
@connect((state) => ({
  auth0Client: state.auth0.auth0Client,
  auth0Domain: state.auth0.auth0Domain,
  loggedIn: state.auth0.loggedIn
}), {logout, login})
export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    auth0Client: PropTypes.string,
    auth0Domain: PropTypes.string,
    login: PropTypes.func,
    logout: PropTypes.func,
    loggedIn: PropTypes.bool
  };
  componentDidMount() {
    const lock = new Auth0Lock(this.props.auth0Client, this.props.auth0Domain);
    lock.on('authenticated', (authResult) => {
      lock.getUserInfo(authResult.accessToken, (err, profile) => {
        if (err) {
          // Handle error
          return;
        }

        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        console.log(profile);
        this.props.login(profile.email);
      });
    });
    this.lock = lock;
    console.log(this);
    if (localStorage.getItem('profile')) {
      this.props.login(JSON.parse(localStorage.getItem('profile')).email);
    }
  }
  render() {
    return (
      <div>
        <nav className={s.headerNav}>
          <Link to="/">
            <img src="/images/logo.png" className={s.headerLogo} />
          </Link>
          <div>
            <ul className={s['navbar-list']}>
              <li><Link to="/about">ABOUT</Link></li>
              {!this.props.loggedIn && <li><a onClick={() => this.lock.show({
                initialScreen: 'signUp'
              })}>CREATE ACCOUNT</a></li>}
              {!this.props.loggedIn && <li><a onClick={() => this.lock.show()}>LOG IN</a></li>}
              {this.props.loggedIn && <li><Link to="/profile">PROFILE</Link></li>}
              {this.props.loggedIn && <li><a onClick={this.props.logout}>LOG OUT</a></li>}
            </ul>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
