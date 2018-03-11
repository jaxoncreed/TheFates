const LOGGED_IN = 'auth0/LOGGED_IN';
const LOG_OUT = 'auth0/LOG_OUT';

const initialState = {
  auth0Client: '',
  auth0Domain: '',
  loggedIn: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        email: action.email,
        loggedIn: true
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
}

export function login(email) {
  return {
    type: LOGGED_IN,
    email: email
  };
}

export function logout() {
  localStorage.removeItem('id_token');
  return {
    type: LOG_OUT
  };
}
