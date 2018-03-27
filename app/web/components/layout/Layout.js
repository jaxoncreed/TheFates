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
import YouTube from 'react-youtube';


class Layout extends Component {

  render() {
    return this.props.children;
  }
}

const mapStateToProps = (state) => {
  return {

  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Layout);
