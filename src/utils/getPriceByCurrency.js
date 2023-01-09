export default function getPriceByCurrency(pricesArray, currency) {
  return pricesArray.find((price) => price.currency.symbol === currency).amount.toFixed(2);
}
