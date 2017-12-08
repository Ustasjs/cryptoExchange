import { call, put, select } from 'redux-saga/effects';
import { clearNetworkErrors, setNetworkError } from '../actions/network';
import { getIsNetworkErrorPresent } from '../reducers/network';

export default function* requestFlow(fn, args) {
  try {
    const response = yield call(fn, args);
    if (yield select(getIsNetworkErrorPresent)) yield put(clearNetworkErrors());
    return response;
  } catch (error) {
    if (error.status >= 400) {
      yield put(setNetworkError(error));
    }

    throw error;
  }
}
