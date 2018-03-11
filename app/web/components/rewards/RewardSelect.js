import React, { Component, PropTypes } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {updateReward} from 'redux/modules/rewards';

class RewardSelect extends Component {
  static propTyps = {
    rewards: PropTypes.array,
    rewardId: PropTypes.string
  }

  render() {
    return (
      <div className="cardGrid">
        {this.props.rewards.map((reward) => (
          <div key={reward.brandKey} className="card" onClick={() => this.props.dispatch(updateReward(reward.brandKey, this.props.rewards, this.props.curReward, this.props.curRewardItem))}>
            <img src={reward.imageUrls['200w-326ppi']} />
            {reward.brandKey === this.props.rewardId && <div className="cardOverlay">
              {reward.brandName}
            </div>}
          </div>
        ))}
      </div>
    )
  }
}
export default RewardSelect;