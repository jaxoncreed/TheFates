import React, { Component, PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import { fetchFeed } from 'redux/modules/surveys';
import { fetchRewards } from 'redux/modules/rewards';
import { refreshUser } from 'redux/modules/user';
import PointsTracker from 'web/components/common/PointsTracker';
import RaisedButton from 'material-ui/RaisedButton';

class SurveyListPage extends Component {

  componentDidMount() {
    this.props.dispatch(fetchFeed());
    this.props.dispatch(fetchRewards(this.props.userReward, this.props.userRewardValue));
    this.props.dispatch(refreshUser());
  }

  render() {
    return (
      <div>
        <PointsTracker />
        {(() => {
          if (this.props.loading) {
            return (
              <div className="fullScreenCenter">
                <CircularProgress size={80} thickness={5} />
              </div>
            )
          } else if (this.props.error) {
            return (
              <div className="centerWithPadding">
                There was an error fetching your surveys. Try refreshing the page.
              </div>
            )
          } else if (!this.props.didUserFillOutProfile) {
            return (
              <div className="centerWithPadding">
                <RaisedButton
                  className="gaugeButton"
                  label="Fill out your profile to get surveys!"
                  primary={true}
                  onClick={() => browserHistory.push('/profile/aboutme') } />
              </div>
            )
          } else if (this.props.surveys.length === 0) {
            return (
              <div className="centerWithPadding">
                Sorry. You don't have any surveys at the moment. Try again later.
              </div>
            )
          } else {
            return this.props.surveys.map((survey) => (
              <div className="container" key={survey.info.id}>
                <div className="containerContent panel surveyListOption small"
                    onClick={() => browserHistory.push('/surveys/' + survey.info.id)}>
                  <img src={survey.info.image.secure_url} />
                  <div className="surveyListItemContent">
                    <p>{survey.info.points}pts</p>
                    <h2>{survey.info.title}</h2>
                    <h3>{survey.info.description}</h3>
                  </div>
                </div>
              </div>
            ))
          }
        })()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const up = state.user.userProfile;
  return {
    loading: state.surveys.loading,
    error: state.surveys.error,
    surveys: state.surveys.feed.map((feedId) => {
      return state.surveys.surveys[feedId]
    }),
    userReward: state.user.user.reward,
    userRewardValue: state.user.user.rewardValue,
    didUserFillOutProfile: up.annualIncome && up.childrenInHome && up.education &&
        up.gender && up.maritalStatus && up.dob && up.employmentStatus && up.ethnicity
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(SurveyListPage);