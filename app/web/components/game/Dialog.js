import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TypeWriter from 'react-typewriter';

import {
  storyNext
} from '../../../redux/modules/levelState';

import levels from '../../../redux/modules/levels';

class Dialog extends Component {

  render() {
    console.log(this.props);
    return (
      <div className="dialog">
        <img src={`/images/${this.props.image}`} />
        <div className="dialogText">
          <TypeWriter typing={1} maxDelay={20} minDelay={20}>
            {this.props.text}
          </TypeWriter>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const dialogOption = levels[state.level.currentLevel][state.level.levelPart][state.level.dialogIndex];
  return {
    image: dialogOption.character.image,
    text: dialogOption.text
  }
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Dialog);