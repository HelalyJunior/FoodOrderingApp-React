import Modal from "../UI/Modal/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import React, { useState, useContext } from "react";
import { ModalManager } from "../../Manager/ModalManager";
import CartManager from "../../Manager/CartManager";
import Checkout from "./Checkout";
import useHttp from "../../Hooks/useHttp";

const Cart = () => {
  const modalCtx = useContext(ModalManager);
  const cartCtx = useContext(CartManager);
  const [isCheckout, setIsCheckout] = useState(false);
  const [didSumbit, setDidSumbit] = useState(false);
  const { sendRequest, isLoading: isSumbitting } = useHttp();

  const cartItemAddHandler = (item) => {
    cartCtx.incrementItem(item);
  };

  const cartItemRemoveHandler = (item) => {
    cartCtx.decrementItem(item);
  };

  const sumbitOrderDataHandler = (data) => {
    sendRequest({
      url: "https://tester-project-1e2b3-default-rtdb.firebaseio.com/orders.json",
      method: "POST",
      body: { user: data, orderedItems: cartCtx.items },
    });
    setDidSumbit(true);
    cartCtx.clearCart();
  };
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            onAdd={cartItemAddHandler.bind(null, item)}
            key={item.id}
            item={item}
            onRemove={cartItemRemoveHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button
        onClick={modalCtx.hideCartHandler}
        className={styles["button--alt"]}
      >
        Close
      </button>
      <button
        onClick={() => {
          setIsCheckout(true);
        }}
        className={styles.button}
      >
        Order
      </button>
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{`$${cartCtx.totalAmount}`}</span>
      </div>
      {isCheckout && (
        <Checkout
          onCancel={() => {
            setIsCheckout(false);
          }}
          onConfirm={sumbitOrderDataHandler}
        />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={modalCtx.hideCartHandler}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal>
      {!isSumbitting && !didSumbit && cartModalContent}
      {isSumbitting && isSubmittingModalContent}
      {didSumbit && !isSumbitting && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
