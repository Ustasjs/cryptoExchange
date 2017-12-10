import { combineReducers } from 'redux';
import auth from './auth';
import { currency } from './currency';
import { networkError } from './network';

export default combineReducers({ auth, currency, networkError });
