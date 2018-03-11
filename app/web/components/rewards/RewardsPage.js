import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchRewards, updateReward, updateRewardValue, redeemReward } from 'redux/modules/rewards';
import { refreshUser } from 'redux/modules/user';

import PointsTracker from 'web/components/common/PointsTracker';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';

import RewardSelect from './RewardSelect';

class RewardsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rewardSelectOpen: false,
      termsOpen: false
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchRewards(this.props.userReward, this.props.userRewardValue));
    this.props.dispatch(refreshUser());
  }

  renderRewards() {
    return (
      <div>
        {!this.props.rewardIsUnselected && <PointsTracker />}
        <div className="container">
          {!this.props.rewardIsUnselected && <Card className="containerContent noShadow rewardsPanel small">
            <CardMedia
              overlay={<CardTitle title={this.props.curRewardItem.rewardName} />}>
              <img src={this.props.curReward.imageUrls['1200w-326ppi']} />
            </CardMedia>
            <div className="rowMenu dollarAmounts">
              {this.props.curReward.acceptedValues.map((amount) => (
                <RaisedButton className="noShadow gaugeButton"
                    key={amount + this.props.curReward.brandKey}
                    primary={amount === this.props.rewardValue} label={'$' + amount}
                    onClick={() => this.props.dispatch(updateRewardValue(this.props.curReward.brandKey, amount, this.props.curReward, this.props.curRewardItem)) } />
              ))}
            </div>
            <Divider />
            <CardActions className="gaugeActions">
              <RaisedButton
                className="gaugeButton"
                label="Change my reward"
                primary={true}
                onClick={ () => this.setState({ rewardSelectOpen: true }) } />
              <RaisedButton
                className="gaugeButton"
                label="Redeem my gift card"
                secondary={true}
                disabled={ this.props.points < this.props.rewardValue * 100 }
                onClick={() => this.setState({ termsOpen: true })} />
            </CardActions>
          </Card>}
          {this.props.rewardIsUnselected && <div className="containerContent">
            <h1 className="centerWithPadding">Choose your reward</h1>
            <RewardSelect
                rewards={this.props.rewards}
                curReward={this.props.curReward}
                curRewardItem={this.props.curRewardItem}
                rewardId={this.props.curReward ? this.props.curReward.brandKey : null}
                dispatch={this.props.dispatch} />
          </div>}
        </div>
        <Dialog
          title="Choose your reward"
          actions={<FlatButton
            label="Ok"
            keyboardFocused={true}
            onClick={() => this.setState({ rewardSelectOpen: false })}
          />}
          autoScrollBodyContent={true}
          modal={false}
          open={this.state.rewardSelectOpen}>
          <RewardSelect
              rewards={this.props.rewards}
              curReward={this.props.curReward}
              curRewardItem={this.props.curRewardItem}
              rewardId={this.props.curReward ? this.props.curReward.brandKey : null}
              dispatch={this.props.dispatch} />
        </Dialog>
        {!this.props.rewardIsUnselected && <Dialog
          title="Please review these terms:"
          actions={[<FlatButton
            label="I agree"
            keyboardFocused={true}
            onClick={() => { 
              console.log("in here")
              this.setState({ termsOpen: false });
              this.props.dispatch(redeemReward(this.props.userReward, this.props.userRewardValue, this.props.curRewardItem.utid))
                .then(() => this.props.dispatch(refreshUser()));
            }}
          />,
          <FlatButton
            label="I disagree"
            keyboardFocused={true}
            onClick={() => this.setState({ termsOpen: false })}
          />]}
          autoScrollBodyContent={true}
          modal={false}
          open={this.state.termsOpen}
          onRequestClose={this.handleClose}>
          <div dangerouslySetInnerHTML={{ __html: this.props.curReward.terms}} />
        </Dialog>}
      </div>
    );
  }

  renderLoading() {
    return (
      <div className="fullScreenCenter">
        <CircularProgress size={80} thickness={5} />
      </div>
    )
  }

  render() {
    if (this.props.fetching || (!this.props.curReward && !this.props.rewardIsUnselected)) {
      return this.renderLoading();
    } else {
      return this.renderRewards();
    }
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.rewards,
    userReward: state.user.user.reward,
    userRewardValue: state.user.user.rewardValue,
    rewardIsUnselected: !state.user.user.reward,
    fetching: state.rewards.fetch.loading,
    points: state.user.user.points
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(RewardsPage);