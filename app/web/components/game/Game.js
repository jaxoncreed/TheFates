import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  storyNext,
} from '../../../redux/modules/levelState';

import levels from '../../../redux/modules/levels';

import { initLevel } from '../../../redux/modules/gameState';

import GameBoard from './GameBoard';
import Dialog from './Dialog';

class Game extends Component {

  componentWillMount() {
    this.props.dispatch(initLevel(0, levels[0].game.heroes, levels[0].game.events));
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <iframe
          height="0"
          width="0"
          src={`https://www.youtube.com/embed/${this.props.music}?start=0&autoplay=1&controls=0&showinfo=0&autohide=1&loop=1`}
          frameBorder="0"
          allowFullScreen
        >
        </iframe>
        <div className="video-background">
          <div className="video-foreground">
            <iframe
              height="100%"
              width="100%"
              src={`https://www.youtube.com/embed/${this.props.background}?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&list=PLkIgrLuZ-ekjf5U5rylQHR0sOkQ3X3myt`}
              frameBorder="0"
              allowFullScreen
            >
            </iframe>
          </div>
        </div>
        <main>
          {(this.props.isGame) ? <GameBoard /> : <Dialog />}
          <div className="bottomNav">
            {(!this.props.isFreePlay || !this.props.isGame) &&
              <h2
                onClick={() => this.props.dispatch(storyNext())}
              >
                {'Next >'}
              </h2>
            }
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    music: levels[state.level.currentLevel].music,
    background: levels[state.level.currentLevel].background,
    isGame: state.level.levelPart === 'game',
    isFreePlay: state.level.freePlay
  }
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(Game);