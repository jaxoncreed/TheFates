import React, {Component, PropTypes} from 'react';
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
        <div className={s.banner}>
          <h1>Find Tutoring for your Classes</h1>
          <form className={s.searchBar} onSubmit={this.submit}>
            <input
              type="text"
              placeholder="Find Classes / Assignments / Schools"
              onChange={e => this.setState({ search: e.target.value })} />
            <input type="submit" value="Search" className={s['button-primary']} />
          </form>
        </div>
        <div className={s.searchResults}>
          {this.props.assignments.map((assignment) => {
            return (
              <Link className={s.searchCard} to={'/assignment/' + assignment._id} key={assignment._id}>
                <img src="http://placehold.it/300x110" />
                <h2>{assignment.title}</h2>
                <p>{assignment.subject} {assignment.classNumber}: {assignment.className}</p>
                <p>{assignment.school}</p>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

}
