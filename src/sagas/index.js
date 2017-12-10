import { fork } from 'redux-saga/effects';
import { authFlow } from './auth';
import { fetchLoginWatch } from './login';
import { fetchRegistrationWatch } from './registration';
import { fetchBtcWatch, fetchEthWatch, currencyWatch } from './currency';

export default function*() {
  yield fork(authFlow);
  yield fork(fetchLoginWatch);
  yield fork(fetchRegistrationWatch);
  yield fork(fetchBtcWatch);
  yield fork(fetchEthWatch);
  yield fork(currencyWatch);
}
