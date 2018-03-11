import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import Badge from 'material-ui/Badge';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';

import Login from './Login';


import { checkUserLogin, userLogout } from 'redux/modules/user';


class Layout extends Component {

  static propTypes  = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  componentDidMount() {
    this.props.dispatch(checkUserLogin());
  }

  closeDrawer = () => {
    document.querySelector('.mdl-layout__drawer').toggleClass('is-visible');
  };

  onGoToSurveysHome = () => {
    browserHistory.push('/surveys');
  };

  renderMain = () => {
    return (
      <div>
        <AppBar
            style={{ position: 'fixed', display: 'flex', alignItems: 'center' }}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            className="noShadow"
            onLeftIconButtonTouchTap={ () => this.setState({ open: !this.state.open }) }>
          <Link to="/surveys">
            <img src="/images/logo.png" className="logo headerLogo" />
          </Link>
          <Tabs style={{ width: '100%'}}
              inkBarStyle={{ height: "3px", display: 'none' }}
              value={this.props.location.pathname.split('/')[1]}
              onChange={ (value) => browserHistory.push('/' + value) }>
            <Tab icon={<FontIcon className="material-icons">card_giftcard</FontIcon>}
                className="headerTab"
                value="rewards" />
            <Tab icon={this.props.feedLength > 0 ?
                <Badge
                    badgeContent={this.props.feedLength}
                    secondary={true}
                    badgeStyle={{top: 12, right: 12}}>
                  <FontIcon className="material-icons">assignment_turned_in</FontIcon>
                </Badge> : <FontIcon className="material-icons">assignment_turned_in</FontIcon>}
                className="headerTab"
                value="surveys"
                 onActive={this.onGoToSurveysHome}
            />
            <Tab icon={<FontIcon className="material-icons">account_circle</FontIcon>}
                className="headerTab"
                value="profile" />
          </Tabs>
        </AppBar>
        <Drawer open={this.state.open} containerClassName="lightShadow drawer">
          <Link to="/rewards">
            <MenuItem onClick={ () => this.setState({ open: false }) }
                leftIcon={<FontIcon className="material-icons">card_giftcard</FontIcon>}>
              Rewards
            </MenuItem>
          </Link>
          <Link to="/surveys">
            <MenuItem onClick={ () => this.setState({ open: false }) }
                leftIcon={<FontIcon className="material-icons">assignment_turned_in</FontIcon>}>
              Surveys
            </MenuItem>
          </Link>
          <Link to="/profile">
            <MenuItem onClick={ () => this.setState({ open: false }) }
                leftIcon={<FontIcon className="material-icons">account_circle</FontIcon>}>
              Profile
            </MenuItem>
          </Link>
          <a href="http://gaugeinsights.com/" target="_blank">
            <MenuItem onClick={ () => this.setState({ open: false }) }
                leftIcon={<FontIcon className="material-icons">info</FontIcon>}>
              About Gauge
            </MenuItem>
          </a>
          <MenuItem onClick={ () => {
                  this.props.dispatch(userLogout()); 
                  this.setState({ open: false });
                } }
                leftIcon={<FontIcon className="material-icons">exit_to_app</FontIcon>}>
            Log Out
          </MenuItem>
        </Drawer>
        <div style={{ height: '65px' }} />
        <main className="mainContent">
          {this.props.children}
        </main>
      </div>
    );
  }

  renderLoad = () => {
    return (
      <div className="fullScreenCenter">
        <CircularProgress size={80} thickness={5} />
      </div>
    )
  }

  renderLogin = () => {
    return (
      <div className="loginContainer">
        <img src="/images/logo.png" className="logoLogin" />
        <Login {...this.props} />
      </div>
    );
  }

  render() {
    if (this.props.init.loading) {
      return this.renderLoad();
    } else if (!this.props.loggedIn) {
      return this.renderLogin();
    } else {
      return this.renderMain();
    }
  }
}

const mapStateToProps = (state) => {
  return {
    init: state.user.init,
    login: state.user.login,
    create: state.user.create,
    passReset: state.user.passReset,
    loggedIn: state.user.loggedIn,
    feedLength: state.surveys.feed.length
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Layout);
