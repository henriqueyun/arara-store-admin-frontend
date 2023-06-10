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

const calculateOrderPrice = (cart) => {
  if (!cart.items?.length) {
    return 0;
  }
  const itemsPrice = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  return itemsPrice;
};

export { formatCurrency, calculateDiscount, calculateOrderPrice };
