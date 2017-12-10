export function handleInputData(response) {
  const result = {
    sell: [],
    purchase: [],
    currentPrice: 0,
    min: 0,
    max: 0,
    data: response.data.result
  };
  result.sell = handleDataForChart(result.data, 'sell');
  result.purchase = handleDataForChart(result.data, 'purchase');
  result.currentPrice = result.purchase[result.purchase.length - 1][1].toFixed(
    1
  );
  result.min = getExtremeValue(result.data, 'min');
  result.max = getExtremeValue(result.data, 'max');

  return result;
}

function handleDataForChart(inputData, dataType) {
  return inputData.map((value, index) => {
    return [value.mts / 1000, value[dataType]];
  });
}

function getExtremeValue(inputData, typeOfExtreme) {
  switch (typeOfExtreme) {
    case 'max':
      let sellMax = getMaxValueOfProp(inputData, 'sell');
      let purchaseMax = getMaxValueOfProp(inputData, 'purchase');
      return Math.max(sellMax, purchaseMax);
    case 'min':
      let sellMin = getMinValueOfProp(inputData, 'sell');
      let purchaseMin = getMinValueOfProp(inputData, 'purchase');
      return Math.min(sellMin, purchaseMin);
    default:
      throw new Error(
        'Неверное значения аргумента typeOfExtreme, аргумент может принимать только значения min и max'
      );
  }
}

function getMinValueOfProp(arr, prop) {
  let elementWithMinValue = arr.reduce((prev, current) => {
    return current[prop] < prev[prop] ? current : prev;
  });
  return elementWithMinValue[prop];
}

function getMaxValueOfProp(arr, prop) {
  let elementWithMaxValue = arr.reduce((prev, current) => {
    return current[prop] > prev[prop] ? current : prev;
  });
  return elementWithMaxValue[prop];
}
