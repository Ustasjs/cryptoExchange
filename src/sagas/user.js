import {
  userInformationRequest,
  userInformationSuccess,
  userInformationFailure,
  userWalletRequest,
  userWalletSuccess,
  userWalletFailure
} from '../actions/user';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getWallet, getUserInfo } from '../api';
import requestFlow from './request';

export function* fetchUserInfo(action) {
  try {
    let response = yield call(requestFlow, getUserInfo);
    yield put(userInformationSuccess(response.data.result));
  } catch (error) {
    yield put(userInformationFailure(error.data));
  }
}
export function* fetchUserWallet(action) {
  try {
    let response = yield call(requestFlow, getWallet);
    yield put(userWalletSuccess(response.data.result));
  } catch (error) {
    yield put(userWalletFailure(error.data));
  }
}

export function* fetchUserWatch() {
  yield takeLatest(userInformationRequest, fetchUserInfo);
  yield takeLatest(userWalletRequest, fetchUserWallet);
}
