import Routes from "./routes/index.jsx";
import Header from "./components/Header";
import { MenuModalCtxt } from "./context/MenuModal";

import { Container, RouteBox, BackBox } from "./AppStyle";

function App() {
  const { closingModal } = MenuModalCtxt();

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
