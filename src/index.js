import ReactDOM from "react-dom";
import ModalManagerProvider from "./Manager/ModalManager";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <ModalManagerProvider>
    <App />
  </ModalManagerProvider>,
  document.getElementById("root")
);
