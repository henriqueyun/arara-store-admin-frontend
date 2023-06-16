/**
 * Returns value formatted in BRL currency
 * @param {number} value value number to be formatted
 * @returns
 */
function formatCurrency(value) {
  return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function calculateDiscount(price, discount) {
  return price - (price / 100) * discount;
}

const calculateOrderPrice = (items) => {
  if (!items?.length) {
    return 0;
  }
  const itemsPrice = items.reduce(
    (acc, item) =>
      acc +
      calculateDiscount(item.product.price, item.product.discount) *
      item.quantity,
    0,
  );
  return itemsPrice;
};

export { formatCurrency, calculateDiscount, calculateOrderPrice };
