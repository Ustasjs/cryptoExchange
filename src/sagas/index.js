import { fork } from 'redux-saga/effects';
import { authFlow } from './auth';
import { fetchLoginWatch } from './login';
import { fetchRegistrationWatch } from './registration';

export default function*() {
  yield fork(authFlow);
  yield fork(fetchLoginWatch);
  yield fork(fetchRegistrationWatch);
}
