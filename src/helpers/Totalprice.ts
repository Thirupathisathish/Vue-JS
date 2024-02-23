import { State, CartItem } from './store';

export function calculateTotalPrice(cart: State['cart']): number {
  let totalPrice = 0;

  for (const category in cart) {
    const cartItems = cart[category];

    for (const item of cartItems) {
      totalPrice += item.price * item.quantity;
    }
  }

  return totalPrice;
}
