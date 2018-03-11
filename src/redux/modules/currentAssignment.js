const FETCH = 'assignmentList/FETCH';
const FETCH_SUCCESS = 'currentAssignment/FETCH_SUCCESS';
const FETCH_FAIL = 'currentAssignment/FETCH_FAIL';


const initialState = {
  loading: false,
  currentAssignment: null
};


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH:
      return {
        ...initialState,
        loading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAssignment: action.result,
        currentIndex: 0
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

export function getAssignment(id) {
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: (client) => client.get('/assignment/' + id),
    id
  };
}
