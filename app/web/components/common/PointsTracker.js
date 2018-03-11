import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import { red500 } from 'material-ui/styles/colors';

import {fetchRewards} from 'redux/modules/rewards';

class PointsTracker extends Component {

  render() {
    if (!this.props.reward) {
      return (
        <div className="pointsTracker container">
          <div className="containerContent centerWithPadding">
            <RaisedButton
              className="gaugeButton"
              label="Choose your reward"
              primary={true}
              onClick={() => browserHistory.push('/rewards')} />
          </div>
        </div>
      )
    }
    return (
      <div className="pointsTracker container">
        <div className="containerContent">
          <div className="rowMenu">
            <div>
              <span className="pointsNumber">{this.props.points}</span> <span className="pointsLabel">pts</span>
            </div>
            { this.props.imageUrl ? <img src={this.props.imageUrl} style={{ height: '50px', width: "80px" }} /> : <div /> }
          </div>
          <LinearProgress mode="determinate"
              max={this.props.rewardValue}
              value={this.props.points}
              style={{ height: '10px' }}
              color={ "#53c8ae" } />
          <div className="rowMenu">
            <div>
              {this.props.rewardValue - this.props.points > 0 ?
              <span>{this.props.rewardValue - this.props.points} points to go!</span> :
              <span>Redeem your reward!</span>}
            </div>
            <div>
              <span>Level {this.props.level}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if (!state.rewards.curReward) {
    return {};
  }
  return {
    reward: state.rewards.curReward.brandKey,
    rewardValue: state.rewards.rewardValue * 100,
    points: state.user.user.points,
    level: state.user.user.level,
    imageUrl: state.rewards.curReward.imageUrls['80w-326ppi']
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(PointsTracker);