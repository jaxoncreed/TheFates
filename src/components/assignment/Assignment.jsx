import React, {Component, PropTypes} from 'react';
import { asyncConnect } from 'redux-async-connect';
import s from 'components/styles/index.scss';
import {getAssignment} from 'redux/modules/currentAssignment.js';
import {connect} from 'react-redux';
// import {Link} from 'react-router';
import VideoPlayer from './VideoPlayer.jsx';

@asyncConnect([{
  promise: ({store: {dispatch}, params: {id}}) => {
    return dispatch(getAssignment(id));
  }
}])
@connect(state => ({
  assignment: state.currentAssignment.currentAssignment
}))
export default class Home extends Component {
  static propTypes = {
    assignment: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      goTo: 0
    };
  }
  render() {
    if (this.props.assignment) {
      return (
        <div>
          <VideoPlayer goTo={this.state.goTo} />
          <div className={s.skipSection}>
            {this.props.assignment.questions.map((question) => {
              return (
                <button onClick={() => this.setState({goTo: question.timeStart})}>
                  {question.question}
                </button>
              );
            })}
          </div>
          <div className={s.container}>
            <h2>{this.props.assignment.title}</h2>
            <p>{this.props.assignment.subject} {this.props.assignment.classNumber}: {this.props.assignment.className}</p>
            <p>{this.props.assignment.school}</p>
          </div>
        </div>
      );
    }
    return (
      <div></div>
    );
  }
}
