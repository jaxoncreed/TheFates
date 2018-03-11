const FETCH = 'assignmentList/FETCH';
const FETCH_SUCCESS = 'assignmentList/FETCH_SUCCESS';
const FETCH_FAIL = 'assignmentList/FETCH_FAIL';

const initialState = {
  assignments: [],
  loading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        assignments: action.result
      };
    case FETCH_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

export function getAssignments(q) {
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: (client) => client.get('/assignment?q=' + (q || ''))
  };
}
