
import levels from './levels';

const INIT_LEVEL = 'INIT_LEVEL';
const NEW_EVENT = 'NEW_EVENT';
const REMOVE_EVENT = 'REMOVE_EVENT';
const NEW_TIMELINE = 'NEW_TIMELINE';
const REMOVE_TIMELINE = 'REMOVE_TIMELINE';
const NEW_ENCOUNTER = 'NEW_ENCOUNTER';
const REMOVE_ENCOUNTER = 'REMOVE_ENCOUNTER';

const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const initialState = {
  allHeroes: [],
  allEvents: [],
  availableHeroes: [],
  availableEvents: [],
  timelineSize: 0,
  timelines: {},
  level: -1,
  isSuccessful: false
}

const getEventResults = (hero, events) => {
  let heroStats = { ...hero.stats };
  return events.map((event) => {
    if (event.id === -1) {
      return { ...event, heroStats: {...heroStats} }
    }
    // TODO: This should be toSucceed, but it gets messed up in the clone.
    if (true) {
      Object.keys(event.onSuccess).forEach(statKey => heroStats[statKey] += event.onSuccess[statKey]);
    } else {
      Object.keys(event.onFailure).forEach(statKey => heroStats[statKey] += event.onFailure[statKey]);
    }
    return { ...event, heroStats: {...heroStats} };
  });
};

const getIsSuccessful = (state) => {
  return levels[state.level].game.winCondition(state.timeline);
};

// REDUCER --------------------------------------------------------------------
export default function gameState(state = initialState, action) {
  let newState = clone(state);
  switch (action.type) {

    case INIT_LEVEL: // action.levelId, action.heroes, action.events
      return {
        allHeroes: clone(action.heroes).map((hero, id) => ({ ...hero, id })),
        allEvents: clone(action.events).map((hero, id) => ({ ...hero, id })),
        availableHeroes: clone(action.heroes).map((hero, id) => ({ ...hero, id })),
        availableEvents: clone(action.events).map((hero, id) => ({ ...hero, id })),
        timelineSize: 0,
        timelines: {},
        level: 0,
        isSuccessful: false
      }

    case NEW_TIMELINE: // action.id
      console.log(action.id);
      newState.timelines[action.id] = {
        hero: newState.allHeroes[action.id],
        events: []
      }
      for (let i = 0; i < newState.timelineSize; i++) {
        newState.timelines[action.id].events.push({ id: -1 })
      }
      newState.timelines[action.id].events = getEventResults(newState.allHeroes[action.id], newState.timelines[action.id].events);
      newState.isSuccessful = getIsSuccessful(newState);
      newState.availableHeroes.splice(newState.availableHeroes.findIndex(hero => hero.id === action.id), 1);
      return newState;

    case REMOVE_TIMELINE: // action.timelineId, action.position

      return newState;

    case NEW_EVENT: // action.timelineId, action.eventId, action.position
      if (action.position >= newState.timelineSize) {
        newState.timelineSize++;
        Object.values(newState.timelines).forEach((timeline) => {
            timeline.events = timeline.events.concat([ { id: -1 } ]);
        });

      } else if (newState.timelines[action.timelineId].events[action.position].id !== -1) {
        console.log('should be in here');
        newState.timelineSize++;
        Object.values(newState.timelines).forEach((timeline) => {
          timeline.events.splice(action.position, 0, { id: -1 })
        });
      }
      console.log(newState);
      newState.timelines[action.timelineId].events[action.position] = newState.allEvents[action.eventId];
      newState.timelines[action.timelineId].events = getEventResults(newState.allHeroes[action.timelineId], newState.timelines[action.timelineId].events);
      newState.isSuccessful = getIsSuccessful(newState);
      newState.availableEvents.splice(newState.availableEvents.findIndex(event => event.id === action.eventId), 1);
      return newState;

    case REMOVE_EVENT:
      return newState;

    case NEW_ENCOUNTER:
      if (action.position >= newState.timelineSize) {
        newState.timelineSize++;
        Object.values(newState.timelines).forEach((timeline) => {
            timeline.events = timeline.events.concat([ { id: -1 } ]);
        });
      } else if (
        newState.timelines[action.timeline1].events[action.position].id !== -1 ||
        newState.timelines[action.timeline2].events[action.position].id !== -1
      ) {
        newState.timelineSize++;
        Object.values(newState.timelines).forEach((timeline) => {
          timeline.events.splice(action.position, { id: -1 })
        });
      }
      newState.timelines[action.timeline1].events[action.position] = { id: -2 };
      newState.timelines[action.timeline2].events[action.position] = { id: -2 };
      newState.timelines[action.timeline1].events = getEventResults(newState.allHeroes[action.timeline1], newState.timelines[action.timeline1].events);
      newState.timelines[action.timeline2].events = getEventResults(newState.allHeroes[action.timeline2], newState.timelines[action.timeline2].events);
      newState.isSuccessful = getIsSuccessful(newState);

      return newState;

    case REMOVE_ENCOUNTER:
      return newState;

    default:
      return state;
  }
}

export function initLevel(levelId, heroes, events) {
  return {
    type: INIT_LEVEL,
    levelId,
    heroes,
    events
  }
}

export function newTimeline(id) {
  return {
    type: NEW_TIMELINE,
    id
  }
}

export function removeTimeline(id) {
  return {
    type: REMOVE_TIMELINE,
    id
  }
}

export function newEvent(timelineId, eventId, position) {
  return {
    type: NEW_EVENT,
    timelineId,
    eventId,
    position
  }
}

export function removeEvent(timelineId, eventId, position) {
  return {
    type: REMOVE_EVENT,
    timelineId,
    eventId,
    position
  }
}

export function newEncounter(timeline1, timeline2, position) {
  return {
    type: NEW_ENCOUNTER,
    timeline1,
    timeline2,
    position
  }
}

export function removeEncounter(timeline1, timeline2, position) {
  return {
    type: REMOVE_ENCOUNTER,
    timeline1,
    timeline2,
    position
  }
}
