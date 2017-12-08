import { combineReducers } from 'redux';
import auth from './auth';
import { networkError } from './network';

export default combineReducers({ auth, networkError });
