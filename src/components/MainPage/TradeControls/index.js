import React, { Component } from 'react';
import './TradeControls.css';

export class TradeControls extends Component {
  render() {
    return (
      <div className="controls">
        <h2 className="title controls_title">Покупка / продажа</h2>
        <ul className="controls__list">
          <li className="control">
            <div className="control__wrap">
              <div className="input">
                <input
                  maxLength="20"
                  type="text"
                  className="input__value input__value_btc"
                />
                <span className="input__type">BTC</span>
              </div>
            </div>
          </li>
          <li className="control">
            <div className="control__wrap">
              <div className="input">
                <input type="text" className="input__value" />
                <span className="input__type">$</span>
              </div>
              <button
                type="button"
                className="control__button control__button_sell"
              >
                Продать
              </button>
            </div>
          </li>
          <li className="control">
            <div className="control__wrap">
              <div className="input">
                <input type="text" className="input__value" />
                <span className="input__type">$</span>
              </div>
              <button
                type="button"
                className="control__button control__button_buy"
              >
                Купить
              </button>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default TradeControls;
