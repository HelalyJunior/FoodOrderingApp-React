import CartManager from "./CartManager";
import { useReducer } from "react";

const DEFAULT = {
  items: [],
  totalAmount: 0,
};

const reducer = (state, action) => {
  if (action.type === "ADD") {
    const index = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });

    const currenTotal = +(
      state.totalAmount +
      action.item.amount * action.item.price
    ).toFixed(2);

    if (index === -1) {
      const currentItems = state.items.concat(action.item);
      return {
        items: currentItems,
        totalAmount: currenTotal,
      };
    } else {
      let updatedList = state.items;
      let newItem = state.items[index];
      newItem.amount += action.item.amount;
      updatedList[index] = newItem;
      return { items: updatedList, totalAmount: currenTotal };
    }
  }

  if (action.type === "INCREMENT") {
    const index = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    const currentTotal = +(state.totalAmount + action.item.price).toFixed(2);
    let updatedList = state.items;
    let newItem = state.items[index];
    newItem.amount += 1;
    updatedList[index] = newItem;
    return { items: updatedList, totalAmount: currentTotal };
  }

  if (action.type === "DECREMENT") {
    const index = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    let currentTotal = +(state.totalAmount - action.item.price).toFixed(2);
    if (currentTotal < 0) {
      currentTotal = 0;
    }
    let updatedList = state.items;
    let newItem = state.items[index];
    newItem.amount -= 1;
    updatedList[index] = newItem;
    if (newItem.amount === 0) {
      updatedList = updatedList.filter((item) => item.id !== action.item.id);
    }
    return { items: updatedList, totalAmount: currentTotal };
  }

  if (action.type === "CLEAR") {
    return DEFAULT;
  }
};

const CartManagerProvider = (props) => {
  const [cartStates, dispatchCartAction] = useReducer(reducer, DEFAULT);

  const addItem = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItem = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const incrementItem = (item) => {
    dispatchCartAction({ type: "INCREMENT", item: item });
  };

  const decrementItem = (item) => {
    dispatchCartAction({ type: "DECREMENT", item: item });
  };

  const clearCart = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const context = {
    items: cartStates.items,
    totalAmount: cartStates.totalAmount,
    incrementItem: incrementItem,
    addItem: addItem,
    removeItem: removeItem,
    decrementItem: decrementItem,
    clearCart: clearCart,
  };
  return (
    <CartManager.Provider value={context}>
      {props.children}
    </CartManager.Provider>
  );
};

export default CartManagerProvider;
