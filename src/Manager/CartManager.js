import react from "react";
const CartManager = react.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  incrementItem: (item) => {},
  decrementItem: (item) => {},
  clearCart: () => {},
});

export default CartManager;
