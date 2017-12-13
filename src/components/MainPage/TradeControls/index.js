import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelected, getBtc, getEth } from '../../../reducers/currency';
import { getErrorBuy, getErrorSell } from '../../../reducers/user';
import {
  sellCurrencyRequest,
  buyCurrencyRequest
} from '../../../actions/trade';
import './TradeControls.css';

export class TradeControls extends Component {
  state = {
    resultValue: '',
    inputError: false,
    currencyInputError: false,
    sellInputError: false,
    purchaseInputError: false,
    sellCost: '',
    purchaseCost: ''
  };

  componentWillReceiveProps(nextProps) {
    const { resultValue, inputError } = this.state;
    const { selected } = this.props.selected;
    const newSelected = nextProps.selected;
    if (selected !== nextProps.selected && !inputError) {
      this.setState({
        ...this.state,
        sellCost: this.getCurrencyPrice(
          resultValue,
          newSelected,
          'sell'
        ).toFixed(2),
        purchaseCost: this.getCurrencyPrice(
          resultValue,
          newSelected,
          'purchase'
        ).toFixed(2)
      });
    }
  }

  render() {
    const { selected, errorSell, errorBuy } = this.props;
    const {
      resultValue,
      sellCost,
      purchaseCost,
      inputError,
      currencyInputError,
      sellInputError,
      purchaseInputError
    } = this.state;
    return (
      <div className="controls">
        <h2 className="title controls_title">Покупка / продажа</h2>
        {inputError ? (
          <div className="controls__error">{inputError}</div>
        ) : (
          false
        )}
        {errorSell || errorBuy ? (
          <div className="controls__error controls__error_trade">
            Недостаточно средств
          </div>
        ) : (
          false
        )}
        <ul className="controls__list">
          <li className="control">
            <div className="control__wrap">
              <div className="input">
                <input
                  maxLength="18"
                  type="text"
                  className={
                    'input__value input__value_btc' +
                    (currencyInputError ? ' input__value_error' : '')
                  }
                  value={resultValue}
                  onChange={this.handleCurrencyChange}
                  onBlur={this.handleCurrencyBlur}
                />
                <span className="input__type">{selected.toUpperCase()}</span>
              </div>
            </div>
          </li>
          <li className="control">
            <div className="control__wrap">
              <div className="input">
                <input
                  maxLength="18"
                  type="text"
                  className={
                    'input__value input__value_btc' +
                    (purchaseInputError ? ' input__value_error' : '')
                  }
                  value={purchaseCost}
                  id="purchase"
                  onChange={this.handleDollarsChange}
                  onBlur={this.handleDollarsBlur}
                />
                <span className="input__type">$</span>
              </div>
              <button
                type="button"
                className="control__button control__button_sell"
                onClick={this.handleClick}
              >
                Продать
              </button>
            </div>
          </li>
          <li className="control">
            <div className="control__wrap">
              <div className="input">
                <input
                  maxLength="18"
                  type="text"
                  className={
                    'input__value input__value_btc' +
                    (sellInputError ? ' input__value_error' : '')
                  }
                  value={sellCost}
                  id="sell"
                  onChange={this.handleDollarsChange}
                  onBlur={this.handleDollarsBlur}
                />
                <span className="input__type">$</span>
              </div>
              <button
                type="button"
                className="control__button control__button_buy"
                onClick={this.handleClick}
              >
                Купить
              </button>
            </div>
          </li>
        </ul>
      </div>
    );
  }

  handleCurrencyChange = e => {
    const { selected } = this.props;
    const value = e.target.value;
    this.setState({ ...this.state, resultValue: value }, () => {
      if (/^([0-9]*[.])?[0-9]+$/.test(value)) {
        this.setState({
          ...this.state,
          sellCost: this.getCurrencyPrice(value, selected, 'sell').toFixed(2),
          purchaseCost: this.getCurrencyPrice(
            value,
            selected,
            'purchase'
          ).toFixed(2),
          inputError: false,
          currencyInputError: false,
          sellInputError: false,
          purchaseInputError: false
        });
      } else if (value === '') {
        this.setState({
          ...this.state,
          sellCost: '',
          purchaseCost: '',
          inputError: false,
          currencyInputError: false,
          sellInputError: false,
          purchaseInputError: false
        });
      }
    });
  };

  handleDollarsChange = e => {
    const { selected } = this.props;
    const value = e.target.value;
    const targetId = e.target.getAttribute('id');
    let targetValueType;
    let secondValueType;
    let secondId;
    let resultValue = this.getCurrencyValue(value, selected, targetId);
    if (targetId === 'sell') {
      targetValueType = 'sellCost';
      secondValueType = 'purchaseCost';
      secondId = 'purchase';
    } else {
      targetValueType = 'purchaseCost';
      secondValueType = 'sellCost';
      secondId = 'sell';
    }

    this.setState({ ...this.state, [targetValueType]: value }, () => {
      if (/^([0-9]*[.])?[0-9]+$/.test(value)) {
        this.setState({
          ...this.state,
          resultValue: resultValue,
          [secondValueType]: this.getCurrencyPrice(
            resultValue,
            selected,
            secondId
          ).toFixed(2),
          inputError: false,
          currencyInputError: false,
          sellInputError: false,
          purchaseInputError: false
        });
      } else if (value === '') {
        this.setState({
          ...this.state,
          resultValue: '',
          [secondValueType]: '',
          inputError: false,
          currencyInputError: false,
          sellInputError: false,
          purchaseInputError: false
        });
      }
    });
  };

  handleCurrencyBlur = e => {
    const value = e.target.value;
    if (!/^([0-9]*[.])?[0-9]+$/.test(value) && value !== '') {
      this.setState({
        ...this.state,
        inputError: 'Введите положительное число',
        currencyInputError: true
      });
    } else {
      this.setState({
        ...this.state,
        inputError: false,
        currencyInputError: false
      });
    }
  };

  handleDollarsBlur = e => {
    let typeOfError;
    const value = e.target.value;
    const id = e.target.getAttribute('id');
    if (id === 'sell') {
      typeOfError = 'sellInputError';
    } else {
      typeOfError = 'purchaseInputError';
    }
    if (!/^([0-9]*[.])?[0-9]+$/.test(value) && value !== '') {
      this.setState({
        ...this.state,
        inputError: 'Введите положительное число',
        [typeOfError]: true
      });
    } else {
      this.setState({
        ...this.state,
        inputError: false,
        [typeOfError]: false
      });
    }
  };

  handleClick = e => {
    const { resultValue, inputError } = this.state;
    const { selected, sellCurrencyRequest, buyCurrencyRequest } = this.props;
    const payload = { currency: selected, value: resultValue };
    if (inputError || !resultValue) return;

    if (e.target.classList.contains('control__button_sell')) {
      sellCurrencyRequest(payload);
    } else {
      buyCurrencyRequest(payload);
    }
  };

  getCurrencyPrice = (value, typeOfValue, typeOfAction) => {
    const { btc, eth } = this.props;

    if (!value || !btc.currentSellPrice || !eth.currentSellPrice) {
      return 0;
    }

    if (typeOfAction !== 'sell' && typeOfAction !== 'purchase') {
      throw new Error('Введен неверный тип транзакции');
    }

    switch (typeOfValue) {
      case 'btc':
        return typeOfAction === 'sell'
          ? value * btc.currentSellPrice
          : value * btc.currentPurchasePrice;
      case 'eth':
        return typeOfAction === 'sell'
          ? value * eth.currentSellPrice
          : value * eth.currentPurchasePrice;
      default:
        throw new Error('Введен неверный тип валюты');
    }
  };

  getCurrencyValue = (value, typeOfValue, typeOfAction) => {
    const { btc, eth } = this.props;
    if (typeOfAction !== 'sell' && typeOfAction !== 'purchase') {
      throw new Error('Введен неверный тип транзакции');
    }

    switch (typeOfValue) {
      case 'btc':
        return typeOfAction === 'sell'
          ? value / btc.currentSellPrice
          : value / btc.currentPurchasePrice;
      case 'eth':
        return typeOfAction === 'sell'
          ? value / eth.currentSellPrice
          : value / eth.currentPurchasePrice;
      default:
        throw new Error('Введен неверный тип валюты');
    }
  };
}

const mapStateToProps = state => ({
  selected: getSelected(state),
  btc: getBtc(state),
  eth: getEth(state),
  errorSell: getErrorSell(state),
  errorBuy: getErrorBuy(state)
});
const mapDispatchToProps = {
  sellCurrencyRequest,
  buyCurrencyRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeControls);
