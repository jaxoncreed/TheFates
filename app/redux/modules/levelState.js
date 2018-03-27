
import heroes from './heroes';
import events from './events';
import levels from './levels';

import { initLevel } from './gameState';

const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const START_STORY = 'START_STORY';
const STORY_NEXT = 'STORY_NEXT';
const FREE_PLAY = 'FREE_PLAY';

const initialState = {
  currentLevel: 0,
  freePlay: false,
  // TODO: Change back to 'preDialog'
  levelPart: 'preDialog',
  dialogIndex: 0
}

// REDUCER --------------------------------------------------------------------
export default function gameState(state = initialState, action) {
  let newState = clone(state);
  switch (action.type) {
    case START_STORY: // action.id
      return {
        // TODO: change back to 0
        currentLevel: 1,
        freePlay: false,
        levelPart: 'preDialog',
        dialogIndex: 0
      }
    case STORY_NEXT:

      switch (newState.levelPart) {
        case 'preDialog':
          if (newState.dialogIndex >= levels[newState.currentLevel].preDialog.length - 1) {
            newState.levelPart = 'game';
            return newState;
          }
          newState.dialogIndex += 1;
          return newState;
        case 'game':
          return {
            ...newState,
            levelPart: 'postDialog',
            dialogIndex: 0
          }
        case 'postDialog':

        default:
          if (newState.dialogIndex >= levels[newState.currentLevel].postDialog.length - 1) {
            newState.levelPart = 'preDialog';
            newState.currentLevel += 1;
            newState.dialogIndex = 0;
            if (levels[newState.currentLevel].isFreePlay) {
              newState.freePlay = true;
            }
            return newState;
          }
          newState.dialogIndex += 1;
          return newState;
      }

    case FREE_PLAY:
      const fpLevel = levels[levels.length - 1];
      return {
        currentLevel: levels.length - 1,
        freePlay: true,
        levelPart: 'game',
        dialogIndex: 0
      }

    default:
      return state;
  }
}

export function startStory() {
  return {
    type: START_STORY
  }
}

export function storyNext() {
  return (dispatch, getState) => {
    if (getState().game.level !== getState().level.currentLevel) {
      dispatch(initLevel(
        getState().level.currentLevel,
        levels[getState().level.currentLevel].game.heroes,
        levels[getState().level.currentLevel].game.events,
      ));
    }
    dispatch({
      type: STORY_NEXT
    });
  }
}

export function freePlay() {
  return {
    type: FREE_PLAY
  }
}