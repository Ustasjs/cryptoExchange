import React, { Component } from 'react';
import { LineChart } from 'react-chartkick';
import './Chart.css';
import Spinner from 'react-svg-spinner';

export class Chart extends Component {
  state = {
    isDataLoaded: true
  };

  componentDidMount() {
    const { select } = this.props;
    select();
  }

  componentWillReceiveProps(nextProps) {
    const { isLoaded } = nextProps;
    if (isLoaded) {
      this.setState({ isDataLoaded: true });
    }
  }

  render() {
    const { min, max, purchase, sell } = this.props.data;
    const { isDataLoaded } = this.state;

    return (
      <div className="chart">
        <h2 className="title chart_title">Окно графика</h2>
        <ul className="chart__buttons" onClick={this.handleClick}>
          <li className="chart__button chart__button_active" data-value="2h">
            2ч
          </li>
          <li className="chart__button" data-value="4h">
            4ч
          </li>
          <li className="chart__button" data-value="8h">
            8ч
          </li>
          <li className="chart__button" data-value="1d">
            1д
          </li>
          <li className="chart__button" data-value="7d">
            7д
          </li>
        </ul>
        <div className="chart__wrap">
          {!isDataLoaded ? (
            <div className="chart__spinner">
              <Spinner size="64px" color="#555658" gap={5} />
            </div>
          ) : null}
          <div
            className={
              isDataLoaded ? 'chart__content' : 'chart__content_hidden'
            }
          >
            <LineChart
              data={[
                {
                  name: 'Продажа',
                  data: sell
                },
                {
                  name: 'Покупка',
                  data: purchase
                }
              ]}
              min={min}
              max={max}
              legend={'bottom'}
              width="710px"
              height="400px"
            />
          </div>
        </div>
        <br />
      </div>
    );
  }

  handleClick = e => {
    const { onClick } = this.props;
    this.setState({ isDataLoaded: false });
    onClick(e);
  };
}

export default Chart;
