import React, { useContext } from "react";
import Header from "./Component/Layout/Header/Header";
import Meals from "./Component/Meal/Meals";
import Cart from "./Component/Cart/Cart";
import { ModalManager } from "./Manager/ModalManager";
import CartManagerProvider from "./Manager/CartManagerProvider";
function App() {
  const ctx = useContext(ModalManager);

  return (
    <CartManagerProvider>
      {ctx.isModal && <Cart />}
      <Header />;
      <main>
        <Meals />
      </main>
    </CartManagerProvider>
  );
}

export default App;
