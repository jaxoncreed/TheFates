import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-async-connect';
import s from 'components/styles/index.scss';
import {browserHistory} from 'react-router';
import {getAssignments} from 'redux/modules/assignmentList.js';
import {connect} from 'react-redux';
import {Link} from 'react-router';

@asyncConnect([{
  promise: ({store: {dispatch}, location: { query: {q}}}) => {
    console.log('promising');
    return Promise.all([dispatch(getAssignments(q))]);
  }
}])
@connect(state => ({
  assignments: state.assignmentList.assignments
}))
export default class Home extends Component {
  static propTypes = {
    assignments: PropTypes.array,
    location: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      search: this.props.location.q || ''
    };
  }
  submit = (e) => {
    e.preventDefault();
    browserHistory.push('/?q=' + this.state.search);
  }
  render() {
    return (
      <div>
        <h1>Hi! Game</h1>
      </div>
    );
  }

}
