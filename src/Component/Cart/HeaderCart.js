import styles from "./HeaderCart.module.css";
import CartIcon from "./CartIcon";
import { useContext, useEffect, useState } from "react";
import { ModalManager } from "../../Manager/ModalManager";
import CartManager from "../../Manager/CartManager";

const HeaderCart = () => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const modalCtx = useContext(ModalManager);
  const cartCtx = useContext(CartManager);

  const btnStyles = `${styles.button} ${btnIsHighlighted ? styles.bump : ""}`;

  const { items, totalAmount } = cartCtx;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [totalAmount, items]);

  const numberOfCartItems = cartCtx.items.reduce(
    (previousSum, item) => previousSum + item.amount,
    0
  );

  return (
    <button className={btnStyles} onClick={modalCtx.showCartHandler}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      Your Cart
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCart;
