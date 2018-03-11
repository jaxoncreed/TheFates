/* @flow */
import Cookies from 'js-cookie';

const LOGIN = 'user/LOGIN';
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
const LOGIN_FAIL = 'user/LOGIN_USER_FAIL';

const CHECK = 'user/CHECK';
const CHECK_SUCCESS = 'user/CHECK_SUCCESS';
const CHECK_FAIL = 'user/CHECK_FAIL';

const CREATE = 'user/CREATE';
const CREATE_SUCCESS = 'user/CREATE_SUCCESS';
const CREATE_FAIL = 'user/CREATE_FAIL';

const RESET = 'user/RESET';
const RESET_SUCCESS = 'user/RESET_SUCCESS';
const RESET_FAIL = 'user/RESET_FAIL';

const LOGOUT = 'user/LOGOUT';

const UPDATE_REWARDS_SUCCESS = 'rewards/UPDATE_SUCCESS';
const CLAIM_REWARDS_SUCCESS = 'rewards/CLAIM_SUCCESS';

const UPDATE_PROFILE = 'profile/UPDATE';
const UPDATE_PROFILE_SUCCESS = 'profile/UPDATE_SUCCESS';
const UPDATE_PROFILE_FAIL = 'profile/UPDATE_FAIL';

const UPDATE_PASSWORD = 'profile/UPDATE_PASSWORD';
const UPDATE_PASSWORD_SUCCESS = 'profile/UPDATE_PASSWORD_SUCCESS';
const UPDATE_PASSWORD_FAIL = 'profile/UPDATE_PASSWORD_FAIL';

const REFRESH_USER = 'profile/REFRESH_USER';


const initialState = {
  init: {
    loading: true
  },
  login: {
    loading: false,
    error: false
  },
  create: {
    loading: false,
    error: false
  },
  update: {
    loading: false,
    error: false,
  },
  passReset: {
    loading: false,
    error: false
  },
  loggedIn: false,
  user: {},
  userProfile: {}
};

const getBeginRequestState = (state, requestType) => {
  return {
    ...state,
    [requestType]: {
      ...initialState[requestType],
      loading: true
    }
  }
};

const getSuccessState = (state, requestType) => {
  return {
    ...state,
    [requestType]: {
      ...initialState[requestType],
      loading: false
    }
  };
};

const getLoginSuccessState = (state, requestType, action, setCookie = true) => {
  if (setCookie) {
    Cookies.set('authorization', action.headers.authorization, { expires: 365 });
  }
  return {
    ...state,
    [requestType]: {
      ...initialState[requestType],
      loading: false
    },
    loggedIn: true,
    user: {
      ...action.result.user,
      rewardValue: parseFloat(action.result.user.rewardValue)
    },
    userProfile: action.result.userProfile
  };
};

const getUpdateProfileSuccessState = (state, requestType, action) => {
  console.log(action);
  return {
    ...state,
    [requestType]: {
      ...initialState[requestType],
      loading: false
    },
    user: {
      ...action.result.user,
    },
    userProfile: action.result.userProfile
  };
};

const getErrorState = (state, requestType) => {
  return {
    ...state,
    [requestType]: {
      ...initialState[requestType],
      loading: false,
      error: true
    }
  }
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case CHECK:
      return getBeginRequestState(state, 'init');
    case CHECK_SUCCESS:
      return getLoginSuccessState(state, 'init', action, false);
    case CHECK_FAIL:
      return getErrorState(state, 'init');

    case LOGIN:
      return getBeginRequestState(state, 'login');
    case LOGIN_SUCCESS:
      return getLoginSuccessState(state, 'login', action);
    case LOGIN_FAIL:
      return getErrorState(state, 'login');

    case CREATE:
      return getBeginRequestState(state, 'create');
    case CREATE_SUCCESS:
      return getLoginSuccessState(state, 'init', action);
    case CREATE_FAIL:
      return getErrorState(state, 'create');

    case RESET:
      return getBeginRequestState(state, 'passReset');
    case RESET_SUCCESS:
      return {
        passReset: {
          ...initialState.passReset,
          loading: false
        },
      };
    case RESET_FAIL:
      return getErrorState(state, 'passReset');

    case LOGOUT:
      Cookies.remove('authorization');
      return {
        ...state,
        loggedIn: false,
        user: {},
        userProfile: {}
      };

    case UPDATE_REWARDS_SUCCESS:
      return {
        ...state,
        user: {
          ...action.result.user,
          rewardValue: parseFloat(action.result.user.rewardValue)
        },
        userProfile: action.result.userProfile
      };
    case CLAIM_REWARDS_SUCCESS:
      return state;

    case UPDATE_PROFILE:
      return getBeginRequestState(state, 'update');
    case UPDATE_PROFILE_SUCCESS:
      return getUpdateProfileSuccessState(state, 'update', action);
    case UPDATE_PROFILE_FAIL:
      return getErrorState(state, 'update');

    case UPDATE_PASSWORD:
      return getBeginRequestState(state, 'update');
    case UPDATE_PASSWORD_SUCCESS:
      return getSuccessState(state, 'update');
    case UPDATE_PASSWORD_FAIL:
      return getErrorState(state, 'update');

    case REFRESH_USER:
      return {
        ...state,
        user: {
          ...action.result.user,
          rewardValue: parseFloat(action.result.user.rewardValue)
        },
        userProfile: action.result.userProfile
      }
    default:
      return state;
  }
}

export function checkUserLogin() {
  const token = Cookies.get('authorization');
  if (!token) {
    return {
      type: CHECK_FAIL
    }
  }
  return {
    types: [CHECK, CHECK_SUCCESS, CHECK_FAIL],
    promise: (client) => client.get('/me')
  }
}

export function userLogin(email, password) {
  return ({
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/login', {
      data: {
        email,
        password
      }
    })
  })
}

export function createUser(email, password) {
  return ({
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post('/register', {
      data: {
        email,
        password
      }
    })
  })
}

export function resetPassword(email) {
  return ({
    types: [RESET, RESET_SUCCESS, RESET_FAIL],
    promise: (client) => client.post('/resetpassword', {
      data: {
        email
      }
    })
  })
}

export function userLogout() {
  return ({
    type: LOGOUT
  })
}

export function updateUserProfile(user, userProfile) {
  return {
    types: [UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL],
    promise: (client) => client.patch('/me', {
      data: {
        user,
        userProfile
      }
    }),
  }
}

export function updateUserPassword(currentPassword, password, retypepassword) {
  return {
    types: [UPDATE_PASSWORD, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL],
    promise: (client) => client.patch('/me/change-password', {
      data: {
        currentPassword,
        password,
        retypepassword,
      }
    }),
  }
}

export function refreshUser() {
  return {
    types: ['none', REFRESH_USER, 'none'],
    promise: (client) => client.get('/me')
  }
}