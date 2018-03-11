import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import {logout, login} from 'redux/modules/auth0.js';

import s from '../styles/index.scss';

@asyncConnect([{
  promise: () => {
    const promises = [];

    return Promise.all(promises);
  }
}])
@connect((state) => ({

}), {logout, login})
export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
