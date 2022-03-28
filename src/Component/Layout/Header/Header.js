import styles from "./Header.module.css";
import HeaderCart from "../../Cart/HeaderCart";
import React from "react";
import mealsImage from "../../../Assets/meals.jpg";

const Header = () => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCart />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </React.Fragment>
  );
};

export default Header;
