import Routes from "./routes/index.jsx";
import Header from "./components/Header";

import { Container, RouteBox, BackBox } from "./AppStyle";

function App() {
  return (
    <Container>
      <BackBox></BackBox>
      <Header />
      <RouteBox>
        <Routes />
      </RouteBox>
    </Container>
  );
}

export default App;
