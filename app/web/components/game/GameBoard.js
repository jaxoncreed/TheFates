import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  storyNext
} from '../../../redux/modules/levelState';

import {
  newTimeline,
  removeTimeline,
  newEvent
} from '../../../redux/modules/gameState';

import levels from '../../../redux/modules/levels';

class GameBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      selectedEvent: null
    }
  }

  render() {
    return (
      <div className="gameBoard">
        <div className="row topRow">
          <label>
            <span
              className={(this.state.tab === 0) ? 'selectedTab' : ''}
              onClick={() => this.setState({ tab: 0 })}
            >
              Heroes
            </span>
            <span> | </span>
            <span
              className={(this.state.tab === 1) ? 'selectedTab' : ''}
              onClick={() => this.setState({ tab: 1 })}
            >
              Events
            </span>
          </label>
          <div className="cardArea">
            {this.state.tab === 0 && this.props.availableHeroes.map(hero => (
              <div
                className="card"
                key={`hero-${hero.id}`}
                onClick={() => this.props.dispatch(newTimeline(hero.id))}
              >
                <div className="center">
                  <p>{hero.name}</p>
                </div>
              </div>
            ))}
            {this.state.tab === 1 && this.props.availableEvents.map(event => (
              <div className="card" key={`event-${event.id}`}>
                <div
                  className={`center ${(event.id === this.state.selectedEvent) ? 'selected' : ''}`}
                  onClick={() => {
                    if (this.state.selectedEvent === event.id) {
                      this.setState({ selectedEvent: null });
                    } else {
                      this.setState({ selectedEvent: event.id })
                    }
                  }}
                >
                  <p>{event.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {Object.values(this.props.timelines).map((timeline, index) => ([
          <div className="row" key={`timelinerow-${timeline.hero.id}`}>
            <label>
              <span>{timeline.hero.name}</span>
              <span> (</span>
              <span
                onClick={() => this.props.dispatch(removeTimeline(timeline.hero.id))}
              >
                Remove
              </span>
              <span>)</span>
            </label>
            <div className="cardArea">
              {timeline.events.map((event, index) => (
                <div className="card" onClick={() => {
                  if (this.state.selectedEvent != null) {
                    this.props.dispatch(newEvent(timeline.hero.id, this.state.selectedEvent, index));
                  }
                }}>
                  {event.id !== -1 && <div className="center">
                    <p>{event.name}</p>
                  </div>}
                </div>
              ))}
              <div className="card" onClick={() => {
                if (this.state.selectedEvent != null) {
                  this.props.dispatch(newEvent(timeline.hero.id, this.state.selectedEvent, timeline.events.length));
                }
              }} />
            </div>
          </div>,
          <div className="clear" />
        ]))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    availableHeroes: state.game.availableHeroes,
    availableEvents: state.game.availableEvents,
    timelines: state.game.timelines
  }
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(GameBoard);