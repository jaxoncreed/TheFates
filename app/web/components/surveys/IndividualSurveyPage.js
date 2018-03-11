import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import {browserHistory} from 'react-router';

import { fetchSurvey } from 'redux/modules/surveys'
import { selectOption, nextQuestion, previousQuestion, submitAnswers } from 'redux/modules/surveys';

class IndividualSurveyPage extends Component {

  componentDidMount() {
    this.props.dispatch(fetchSurvey(this.props.params.surveyId))
  }

  renderImageSurvey = () => {
    const curAnswer = this.props.curAnswer;
    return (
      <div className="imageSurvey">
        {this.props.curQuestion.options.map((option) => (
          <div className="option"
              onClick={() => this.props.dispatch(selectOption(option.id))}>
            <img src={option.content} />
            {curAnswer && curAnswer.options && curAnswer.options.includes(option.id) &&
            <div className="selectedOverlay">
              <FontIcon className="material-icons">check</FontIcon>
            </div>}
          </div>
        ))}
      </div>
    )
  }

  renderTextSurvey = () => {
    const curAnswer = this.props.curAnswer;
    return (
      <div className="textSurvey">
        {this.props.curQuestion.options.map((option) => (
          <div className="option"
              onClick={() => this.props.dispatch(selectOption(option.id))}>
            {option.content}
            {curAnswer && curAnswer.options && curAnswer.options.includes(option.id) &&
            <div className="selectedOverlay">
              <FontIcon className="material-icons">check</FontIcon>
            </div>}
          </div>
        ))}
      </div>
    )
  }

  renderSurvey = () => (
    <div>
      <LinearProgress mode="determinate"
        value={this.props.answers.length}
        max={this.props.numberOfQuestions}
        style={{ height: '10px' }}
        color={ "#53c8ae" } />
      <div className="container">
        <div className="containerContent small">
          <h2 className="centerWithPadding">{this.props.curQuestion.title}</h2>
          {this.props.curQuestion.contentTypeId === 1 && this.renderImageSurvey()}
          {this.props.curQuestion.contentTypeId === 2 && this.renderTextSurvey()}
          <div className="rowMenu">
            <RaisedButton
                className="gaugeButton"
                label="Previous"
                primary={true}
                disabled={this.props.curQuestionIndex === 0}
                onClick={ () => this.props.dispatch(previousQuestion()) } />
            {(this.props.curQuestionIndex !== this.props.numberOfQuestions - 1) ?
              <RaisedButton
                className="gaugeButton"
                label="Next"
                primary={true}
                disabled={ !this.props.answers[this.props.curQuestionIndex] }
                onClick={ () => this.props.dispatch(nextQuestion()) } /> :
              <RaisedButton
                className="gaugeButton"
                label="Done"
                primary={true}
                disabled={ this.props.answers.length < this.props.numberOfQuestions }
                onClick={ () => {
                  this.props.dispatch(submitAnswers(this.props.currentFocus, this.props.answers)).then(() => {
                    browserHistory.push('/surveys');
                  });
                }} />
            }
          </div>
        </div>
      </div>
    </div>
  )

  render() {
    if (this.props.error) {
      return (
        <div className="centerWithPadding">
          There was an error fetching your survey. Go back to the <Link to="/surveys">survey feed</Link>.
        </div>
      )
    } else if (this.props.loading || !this.props.currentFocus) {
      return (
        <div className="fullScreenCenter">
          <CircularProgress size={80} thickness={5} />
        </div>
      );
    } else {
      return this.renderSurvey();
    }
  }
}

const mapStateToProps = (state) => {
  if (!state.surveys.currentFocus) {
    return {
      ...state.surveys
    }
  }
  const curSurvey = state.surveys.surveys[state.surveys.currentFocus];
  return {
    currentFocus: state.surveys.currentFocus,
    survey: curSurvey,
    info: curSurvey.info,
    curQuestion: curSurvey.info.questions[curSurvey.curQuestion],
    curQuestionIndex: curSurvey.curQuestion,
    numberOfQuestions: curSurvey.info.questions.length,
    loading: state.surveys.loading,
    error: state.surveys.error,
    answers: curSurvey.answers,
    curAnswer: curSurvey.answers.find((answer) => answer.id === curSurvey.info.questions[curSurvey.curQuestion].id)
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(IndividualSurveyPage);