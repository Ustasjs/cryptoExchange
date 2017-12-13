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
    currentValue: '',
    resultValue: '',
    inputError: false,
    sellCost: '',
    purchaseCost: ''
  };

  componentWillReceiveProps(nextProps) {
    const { resultValue } = this.state;
    const { selected } = this.props.selected;
    const newSelected = nextProps.selected;
    if (selected !== nextProps.selected) {
      this.setState({
        ...this.state,
        sellCost: this.getPrice(resultValue, newSelected, 'sell').toFixed(2),
        purchaseCost: this.getPrice(
          resultValue,
          newSelected,
          'purchase'
        ).toFixed(2)
      });
    }
  }

  render() {
    const { selected, errorSell, errorBuy } = this.props;
    const { currentValue, sellCost, purchaseCost, inputError } = this.state;
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
                    (inputError ? ' input__value_error' : '')
                  }
                  value={currentValue}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <span className="input__type">{selected.toUpperCase()}</span>
              </div>
            </div>
          </li>
          <li className="control">
            <div className="control__wrap">
              <div className="input">
                <input
                  type="text"
                  className="input__value"
                  value={purchaseCost}
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
                <input type="text" className="input__value" value={sellCost} />
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

  handleChange = e => {
    const { selected } = this.props;
    const value = e.target.value;
    this.setState({ ...this.state, currentValue: value }, () => {
      if (/^\d+$/.test(value)) {
        this.setState({
          ...this.state,
          sellCost: this.getPrice(value, selected, 'sell').toFixed(2),
          purchaseCost: this.getPrice(value, selected, 'purchase').toFixed(2)
        });
      } else if (value === '') {
        this.setState({
          ...this.state,
          sellCost: '',
          purchaseCost: ''
        });
      }
    });
  };

  handleBlur = e => {
    const { currentValue } = this.state;
    const value = e.target.value;
    if (!/^\d+$/.test(value) && value !== '') {
      this.setState({
        ...this.state,
        inputError: 'Данное поле может содержать только цифры'
      });
    } else {
      this.setState({
        ...this.state,
        resultValue: currentValue,
        inputError: false
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

  getPrice = (value, typeOfValue, action) => {
    const { btc, eth } = this.props;

    if (!value || !btc.currentSellPrice || !eth.currentSellPrice) {
      return 0;
    }

    if (action !== 'sell' && action !== 'purchase')
      throw new Error('Введен неверный тип транзакции');

    switch (typeOfValue) {
      case 'btc':
        return action === 'sell'
          ? value * btc.currentSellPrice
          : value * btc.currentPurchasePrice;
      case 'eth':
        return action === 'sell'
          ? value * eth.currentSellPrice
          : value * eth.currentPurchasePrice;
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
