import getPriceByCurrency from "./getPriceByCurrency";

export default function getTotalAmount(currency, productsPrices) {
  let total = 0;
  let taxPercentage = 0.21;
  let tax;

  productsPrices.map(
    (product) =>
      (total += getPriceByCurrency(product.prices, currency) * product.quantity)
  );

  total = total.toFixed(2);
  tax = (total * taxPercentage).toFixed(2);

  return { total, tax };
}
