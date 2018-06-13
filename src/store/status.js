import { animationDuration } from '../config';

// Initial State

const initialState = {
  app: 'is-loading', // showing-loader, is-loading, hiding-loader, has-loaded
  notification: {
    type: '',
    message: ''
  }
};

// Action Types

const SHOWING_LOADER = 'SHOWING_LOADER';

const IS_LOADING = 'IS_LOADING';

const HIDING_LOADER = 'HIDING_LOADER';

const HAS_LOADED = 'HAS_LOADED';

const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

const REMOVE_NOTIFICATION = 'REMVOVE_NOTIFICATION';

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOWING_LOADER:
      return {
        ...state,
        [action.context]: 'showing-loader'
      };

    case IS_LOADING:
      return {
        ...state,
        [action.context]: 'is-loading'
      };

    case HIDING_LOADER:
      return {
        ...state,
        [action.context]: 'hiding-loader'
      };

    case HAS_LOADED:
      return {
        ...state,
        [action.context]: 'has-loaded'
      };

    case ADD_NOTIFICATION:
      return {
        ...state,
        notification: {
          type: action.messageType,
          message: action.message
        }
      };

    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notification: {
          type: '',
          message: ''
        }
      };

    default:
      return state;
  }
}

// Action Functions

function showingLoader(context) {
  return {
    type: SHOWING_LOADER,
    context
  };
}

function isLoading(context) {
  return {
    type: IS_LOADING,
    context
  };
}

function hidingLoader(context) {
  return {
    type: HIDING_LOADER,
    context
  };
}

function hasLoaded(context) {
  return {
    type: HAS_LOADED,
    context
  };
}

export function addNotification(message, messageType) {
  return {
    type: ADD_NOTIFICATION,
    message,
    messageType
  };
}

export function removeNotification() {
  return {
    type: REMOVE_NOTIFICATION
  };
}

// Trigger Functions

export function startLoading(context) {
  return dispatch => {
    dispatch(isLoading(context));
    dispatch(showingLoader(context));
  };
}

export function endLoading(context) {
  return dispatch => {
    setTimeout(() => {
      dispatch(hidingLoader(context));

      setTimeout(() => {
        dispatch(hasLoaded(context));
      }, animationDuration.fadeApp);
    }, animationDuration.fadeApp);
  };
}
