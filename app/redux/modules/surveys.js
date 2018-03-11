/* @flow */
import clone from 'clone';

const FETCH_FEED = 'surveys/FETCH_FEED';
const FETCH_FEED_SUCCESS = 'surveys/FETCH_FEED_SUCCESS';
const FETCH_FEED_FAIL = 'surveys/FETCH_FEED_FAIL';

const FETCH_SURVEY = 'surveys/FETCH_SURVEY';
const FETCH_SURVEY_SUCCESS = 'surveys/FETCH_SURVEY_SUCCESS';
const FETCH_SURVEY_FAIL = 'surveys/FETCH_SURVEY_FAIL';

const SELECT_OPTION = 'surveys/SELECT_OPTION';
const NEXT_QUESTION = 'surveys/NEXT_QUESTION';
const PREVIOUS_QUESTION = 'surveys/PREVIOUS_QUESTION';

const SUBMIT_ANSWERS = 'survyes/SUBMIT_ANSWERS';
const SUBMIT_SUCCESS = 'surveys/SUBMIT_SUCCESS';
const SUBMIT_FAIL = 'surveys/SUBMIT_FAIL';

const initialState = {
  loading: true,
  surveys: {},
  feed: [],
  currentFocus: null
}

const populateSurveysMap = (results, surveysMap) => {
  const newMap = clone(surveysMap);
  results.forEach((result) => {
    newMap[result.id] = {
      info: Object.assign(newMap[result.id] ? newMap[result.id].info : {}, result),
      answers: newMap[result.id] ? newMap[result.id].answers : [],
      curQuestion: newMap[result.id] ? newMap[result.id].curQuestion : 0
    }
  })
  return newMap;
}

export default function surveys(state = initialState, action) {
  let s, survey, question, answer;
  switch (action.type) {
    case FETCH_FEED:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_FEED_SUCCESS:
      return {
        ...state,
        surveys: populateSurveysMap(action.result.results, state.surveys),
        feed: action.result.results.map((result) => result.id),
        loading: false
      }
    case FETCH_FEED_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      };
    case FETCH_SURVEY:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_SURVEY_SUCCESS:
      const newState = {
        ...state,
        surveys: populateSurveysMap([ action.result ], state.surveys),
        currentFocus: action.result.id,
        loading: false
      }
      newState.surveys[newState.currentFocus].curQuestion = newState.surveys[newState.currentFocus].curQuestion || 0;
      return newState;
    case FETCH_SURVEY_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      };

    case SELECT_OPTION:
      s = clone(state);
      survey = s.surveys[s.currentFocus];
      question = survey.info.questions[survey.curQuestion];
      answer = survey.answers.find((answer) => answer.id === question.id);
      if (question.isMultipleChoice) {
        if (answer.options.includes(action.optionId)) {
          answer.options.splice(answer.options.indexOf(action.optionId), 1);
        } else {
          answer.options.push(action.optionId);
        }
      } else {
        if (!answer) {
          survey.answers.push({ id: question.id, options: [] });
          answer = survey.answers[survey.answers.length - 1];
        }
        answer.options = [ action.optionId ]
      }
      return s;
    case NEXT_QUESTION:
      s = clone(state);
      survey = s.surveys[s.currentFocus];
      survey.curQuestion = survey.curQuestion + 1;
      question = survey.info.questions[survey.curQuestion];
      if (question.isMultipleChoice && !survey.answers.find((answer) => answer.id === question.id)) {
        survey.answers.push({ id: question.id, options: [] });
      }
      return s;
    case PREVIOUS_QUESTION:
      s = clone(state);
      survey = s.surveys[s.currentFocus];
      survey.curQuestion = survey.curQuestion - 1;
      return s;
    default:
      return state;
  }
}

export function fetchFeed() {
  return {
    types: [FETCH_FEED, FETCH_FEED_SUCCESS, FETCH_FEED_FAIL],
    promise: (client) => client.get('/surveys')
  }
}

export function fetchSurvey(id) {
  return {
    types: [FETCH_SURVEY, FETCH_SURVEY_SUCCESS, FETCH_SURVEY_FAIL],
    promise: (client) => client.get('/surveys/' + id)
  }
}

export function selectOption(optionId) {
  return {
    type: SELECT_OPTION,
    optionId
  }
}
export function nextQuestion() {
  return {
    type: NEXT_QUESTION
  }
}
export function previousQuestion() {
  return {
    type: PREVIOUS_QUESTION
  }
}
export function submitAnswers(surveyId, answers) {
  console.log({
    answers: answers.map((answer) => ({ id: answer.id, optionIds: answer.options }))
  });
  return {
    types: [SUBMIT_ANSWERS, SUBMIT_SUCCESS, SUBMIT_FAIL],
    promise: (client) => client.post('/answers/' + surveyId, {
      data: {
        answers: answers.map((answer) => ({ id: answer.id, optionIds: answer.options }))
      }
    })
  }
}