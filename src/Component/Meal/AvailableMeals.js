import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card/Card";
import Meal from "./Meal";
import useHttp from "../../Hooks/useHttp";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const transformMealData = (data) => {
    const MEAL_LIST = [];
    for (const key in data) {
      MEAL_LIST.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: Number(data[key].price),
      });
    }
    setMeals(MEAL_LIST);
  };
  const { sendRequest, isLoading, hasError } = useHttp();

  useEffect(() => {
    sendRequest(
      {
        url: "https://tester-project-1e2b3-default-rtdb.firebaseio.com/MEALS.json",
      },
      transformMealData
    );
  }, [sendRequest]);

  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {isLoading && <p>Loading ...</p>}
          {hasError && <p>An Error occured </p>}
          {meals.map((meal) => {
            return <Meal key={meal.id} item={meal} />;
          })}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
