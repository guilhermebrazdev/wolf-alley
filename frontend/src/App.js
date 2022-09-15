import "./App.css";

import Routes from "./routes";
import { Header } from "./components";

import { useContext } from "react";
import { ModalContext } from "./context/MenuModal";

function App() {
  const { openModal, openingModal, closingModal } = useContext(ModalContext);

  return (
    <div className="App">
      <Header
        openModal={openModal}
        openingModal={openingModal}
        closingModal={closingModal}
      />
      <div className="routes">
        <Routes />
      </div>
    </div>
  );
}

export default App;
