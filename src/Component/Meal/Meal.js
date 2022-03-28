import styles from "./Meal.module.css";
import MealItemForm from "./MealItemForm";
import CartManager from "../../Manager/CartManager";
import { useContext } from "react";

const Meal = (props) => {
  const price = `$${props.item.price.toFixed(2)}`;
  const ctx = useContext(CartManager);

  const addHandler = (amount) => {
    ctx.addItem({ ...props.item, amount: amount });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.item.name}</h3>
        <div className={styles.description}>{props.item.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddHandler={addHandler} />
      </div>
    </li>
  );
};

export default Meal;
