import react, { useState } from "react";

export const ModalManager = react.createContext({
  isModal: "",
  showCartHandler: "",
  hideCartHandler: "",
});

const ModalManagerProvider = (props) => {
  const [isModal, setIsModal] = useState(false);

  const showCartHandler = () => {
    setIsModal(true);
  };
  const hideCartHandler = () => {
    setIsModal(false);
  };

  return (
    <ModalManager.Provider
      value={{
        isModal: isModal,
        showCartHandler: showCartHandler,
        hideCartHandler: hideCartHandler,
      }}
    >
      {props.children}
    </ModalManager.Provider>
  );
};

export default ModalManagerProvider;
