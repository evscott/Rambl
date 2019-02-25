import { combineReducers } from 'redux';
import { authReducer } from './authReducers';
import { tripReducer } from './tripReducers';
import { tranReducer } from './tranReducer';
import * as AuthActions from '../actions/authActions';
import * as TripActions from '../actions/tripActions';
import * as TranActions from '../actions/tranActions';

const initialState = {
  user: {
    lastUpdated: null,
    isAuthenticated: false,
    isFetching: false,
    user: null,
  },
  trips: {
    lastUpdated: null,
    isFetching: false,
    isSynced: false,
    trips: []
  },
  trans: {
    lastUpdated: null,
    isFetching: false,
    isSynced: false,
    trans: []
  }
};

export function masterReducer(state = initialState, action) {
  switch (action.type) {
    case AuthActions.SIGNUP_REQUEST:
    case AuthActions.SIGNUP_FAILURE:
    case AuthActions.SIGNUP_SUCCESS:
    case AuthActions.LOGIN_REQUEST:
    case AuthActions.LOGIN_FAILURE:
    case AuthActions.LOGIN_SUCCESS:
    case AuthActions.LOGOUT_REQUEST:
    case AuthActions.LOGOUT_FAILURE:
    case AuthActions.LOGOUT_SUCCESS:
    case AuthActions.GET_USER_INFO_REQUEST:
    case AuthActions.GET_USER_INFO_FAILURE:
    case AuthActions.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        user: authReducer(state.user, action)
      };
    case TripActions.GET_TRIPS_REQUEST:
    case TripActions.GET_TRIPS_FAILURE:
    case TripActions.GET_TRIPS_SUCCESS:
    case TripActions.ADD_TRIP_REQUEST:
    case TripActions.ADD_TRIP_FAILURE:
    case TripActions.ADD_TRIP_SUCCESS:
    case TripActions.UPDATE_TRIP_REQUEST:
    case TripActions.UPDATE_TRIP_FAILURE:
    case TripActions.UPDATE_TRIP_SUCCESS:
    case TripActions.DELETE_TRIP_REQUEST:
    case TripActions.DELETE_TRIP_FAILURE:
    case TripActions.DELETE_TRIP_SUCCESS:
    case TripActions.GET_TRIP_INFO_REQUEST:
    case TripActions.GET_TRIP_INFO_FAILURE:
    case TripActions.GET_TRIP_INFO_SUCCESS:
      return {
        ...state,
        trips: tripReducer(state.trips, action)
      };
    case TranActions.GET_TRANS_REQUEST:
    case TranActions.GET_TRANS_FAILURE:
    case TranActions.GET_TRANS_SUCCESS:
    case TranActions.ADD_TRAN_REQUEST:
    case TranActions.ADD_TRAN_FAILURE:
    case TranActions.ADD_TRAN_SUCCESS:
    case TranActions.UPDATE_TRAN_REQUEST:
    case TranActions.UPDATE_TRAN_FAILURE:
    case TranActions.UPDATE_TRAN_SUCCESS:
    case TranActions.DELETE_TRAN_REQUEST:
    case TranActions.DELETE_TRAN_FAILURE:
    case TranActions.DELETE_TRAN_SUCCESS:
    case TranActions.GET_TRAN_INFO_REQUEST:
    case TranActions.GET_TRAN_INFO_FAILURE:
    case TranActions.GET_TRAN_INFO_SUCCESS:
      return {
        ...state,
        trans: tranReducer(state.trans, action)
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  masterReducer
});

export default rootReducer;
