import { take, select, put, cancel, call, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { loginSuccess, logout } from '../../actions/auth';
import { getOffset } from '../../reducers/currency';
import {
  selectBtc,
  selectEth,
  fetchBtcRequest,
  fetchEthRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthFailure,
  fetchEthSuccess,
  selectOffset
} from '../../actions/currency';
import { candles } from '../../api';
import { handleInputData } from '../../helpers/dataHandler';
import { fetchCurrencyFlow, currencyWatch } from '../currency';

describe('Saga fetchCurrencyFlow', () => {
  const saga = fetchCurrencyFlow();
  it('1. Effect select getOffset', () => {
    expect(saga.next().value).toEqual(select(getOffset));
  });
  it('2. Effect put fetchBtcRequest', () => {
    expect(saga.next({ data: 'data' }).value).toEqual(
      put(fetchBtcRequest({ data: 'data' }))
    );
  });
  it('3. Effect put fetchEthRequest', () => {
    expect(saga.next({ data: 'data' }).value).toEqual(
      put(fetchEthRequest({ data: 'data' }))
    );
  });
  it('4. Effect delay 15000', () => {
    expect(saga.next().value).toEqual(call(delay, 15000));
  });
});

// describe('Saga ', () => {
//   describe('Script without logout action', () => {
//     const saga = currencyWatch();
//     it('1. Effect take actions', () => {
//       expect(saga.next(loginSuccess).value).toEqual(
//         take([loginSuccess, logout, selectBtc, selectEth, selectOffset])
//       );
//     });
//     it('2. Effect fork fetchCurrencyFlow', () => {
//       expect(saga.next({task: task}).value).toEqual(fork(fetchCurrencyFlow));
//     });
//     it('3. Effect take actions', () => {
//       expect(saga.next(selectBtc).value).toEqual(
//         take([loginSuccess, logout, selectBtc, selectEth, selectOffset])
//       );
//     });
//     it('4. Effect cancel currencyTask', () => {
//       expect(saga.next(selectBtc).value).toEqual(
//         cansel({task: task})
//       );
//   });
// });
