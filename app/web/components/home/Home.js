import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class RewardsPage extends Component {
  render() {
    return (
      <div>
        <h1>Hi!</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(RewardsPage);