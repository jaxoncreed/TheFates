import React, {Component, PropTypes} from 'react';
// import { asyncConnect } from 'redux-async-connect';
import s from 'components/styles/index.scss';
// import {getScenarios} from 'redux/modules/scenarioList.js';
// import {connect} from 'react-redux';
// import {Link} from 'react-router';

/* @asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch(getScenarios());
  }
}])
@connect(state => ({
  scenarios: state.scenarioList.scenarios
}))*/
export default class Home extends Component {
  static propTypes = {
    scenarios: PropTypes.array
  }
  render() {
    return (
      <form className={s.container}>

      </form>
    );
  }

}
