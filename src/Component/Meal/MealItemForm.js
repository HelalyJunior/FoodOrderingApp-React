import styles from "./MealItemForm.module.css";
import Input from "../UI/Input/Input";
import { useRef } from "react";

const MealItemForm = (props) => {
  const inputRef = useRef();

  return (
    <div className={styles.form}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button
        onClick={() => {
          props.onAddHandler(Number(inputRef.current.value));
        }}
      >
        + Add
      </button>
    </div>
  );
};

export default MealItemForm;
