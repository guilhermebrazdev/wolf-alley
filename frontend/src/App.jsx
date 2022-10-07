import { useContext } from "react";

import Routes from "./routes/index.jsx";
import Header from "./components/Header";
import { ModalContext } from "./context/MenuModal";

import { Container, RouteBox, BackBox } from "./AppStyle";

function App() {
  const { closingModal } = useContext(ModalContext);

  return (
    <Container onClick={() => closingModal()}>
      <BackBox></BackBox>
      <Header />
      <RouteBox>
        <Routes />
      </RouteBox>
    </Container>
  );
}

export default App;
