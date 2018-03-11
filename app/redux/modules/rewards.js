/* @flow */
import Cookies from 'js-cookie';

const FETCH_REWARDS = 'rewards/FETCH';
const FETCH_SUCCESS = 'rewards/FETCH_SUCCESS';
const FETCH_FAIL = 'rewards/FETCH_FAIL';

const UPDATE_REWARD = 'rewards/UPDATE';
const UPDATE_SUCCESS = 'rewards/UPDATE_SUCCESS';
const UPDATE_FAIL = 'rewards/UPDATE_FAIL';

const CLAIM_REWARD = 'rewards/CLAIM';
const CLAIM_SUCCESS = 'rewards/CLAIM_SUCCESS';
const CLAIM_FAIL = 'rewards/CLAIM_FAIL';

const initialState = {
  fetch: {
    loading: false,
    error: false
  },
  update: {
    loading: false,
    error: false
  },
  claim: {
    loading: false,
    error: false
  },
  rewards: []
}

const getBeginRequestState = (state, requestType) => {
  return {
    ...state,
    [requestType]: {
      ...initialState[requestType],
      loading: true
    }
  }
}

const getSuccessState = (state, requestType) => {
  return {
    ...state,
    [requestType]: {
      ...initialState[requestType],
      loading: false
    }
  };
}

const getErrorState = (state, requestType) => {
  return {
    ...state,
    [requestType]: {
      ...initialState[requestType],
      loading: false,
      error: false
    }
  }
}

const getCurReward = (rewards, rewardId) => {
  const curReward = rewards.find((reward) => reward.brandKey === rewardId);
  if (!curReward) {
    return null;
  }
  let acceptedValues = [];
  if (curReward.items.length === 1 &&
      curReward.items[0].minValue &&
      curReward.items[0].maxValue) {
    acceptedValues = [5, 10, 25, 50, 75].filter((val) => val <= curReward.items[0].maxValue &&
        val >= curReward.items[0].minValue);
  } else {
    acceptedValues = curReward.items.map((item) => item.faceValue);
  }
  return {
    ...curReward,
    acceptedValues
  }
}

const getCurRewardItem = (rewards, rewardId, rewardValue) => {
  const reward = getCurReward(rewards, rewardId);
  if (!reward) {
    return null;
  }
  if (reward.items.length === 1 && reward.items[0].minValue && reward.items[0].maxValue) {
    return reward.items[0];
  }
  return reward.items.find((item) => item.faceValue === rewardValue);
}

export default function login(state = initialState, action) {
  switch (action.type) {
    case FETCH_REWARDS:
      return getBeginRequestState(state, 'fetch');
    case FETCH_SUCCESS:
      return {
        ...getSuccessState(state, 'fetch'),
        rewards: action.result,
        curReward: getCurReward(action.result, action.reward),
        curRewardItem: getCurRewardItem(action.result, action.reward, action.rewardValue),
        rewardValue: action.rewardValue
      };
    case FETCH_FAIL:
      return getErrorState(state, 'fetch');

    case UPDATE_REWARD:
      return {
        ...getBeginRequestState(state, 'update'),
        curReward: getCurReward(state.rewards, action.reward),
        curRewardItem: getCurRewardItem(state.rewards, action.reward, action.rewardValue),
        rewardValue: action.rewardValue
      }
      return 
    case UPDATE_SUCCESS:
      return {
        ...getSuccessState(state, 'update')
      };
    case UPDATE_FAIL:
      return {
        ...getErrorState(state, 'update'),
        curReward: action.curReward,
        curRewardItem: action.curRewardItem
      }

    case CLAIM_REWARD:
      return getBeginRequestState(state, 'claim');
    case CLAIM_SUCCESS:
      return getSuccessState(state, 'claim')
    case CLAIM_FAIL:
      return getErrorState(state, 'claim');


    default:
      return state;
  }
}

export function fetchRewards(reward, rewardValue) {
  return {
    types: [FETCH_REWARDS, FETCH_SUCCESS, FETCH_FAIL],
    promise: (client) => client.get('/rewards'),
    reward,
    rewardValue
  }
}

export function updateReward(rewardId, rewards, curReward, curRewardItem) {
  const acceptedValues = getCurReward(rewards, rewardId).acceptedValues;
  return {
    types: [UPDATE_REWARD, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.patch('/me', {
      data: {
        userProfile: {
          reward: rewardId,
          rewardValue: acceptedValues[0]
        }
      }
    }),
    reward: rewardId,
    rewardValue: acceptedValues[0],
    curReward,
    curRewardItem
  }
}

export function updateRewardValue(rewardId, rewardValue, curReward, curRewardItem) {
  return {
    types: [UPDATE_REWARD, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.patch('/me', {
      data: {
        userProfile: {
          rewardValue
        }
      }
    }),
    reward: rewardId,
    rewardValue: rewardValue,
    curReward,
    curRewardItem
  }
}

export function redeemReward(reward, rewardValue, utid) {
  return {
    types: [CLAIM_REWARD, CLAIM_SUCCESS, CLAIM_FAIL],
    promise: (client) => client.post('/rewards', {
      data: {
        brandKey: reward,
        price: rewardValue,
        utid
      }
    })
  }
}