import React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <form className={styles.input}>
      <label>{props.label}</label>

      <input
        ref={ref}
        id={props.input.id}
        type={props.input.type}
        min={props.input.min}
        max={props.input.max}
        step={props.input.step}
        defaultValue={props.input.defaultValue}
      ></input>
    </form>
  );
});

export default Input;
