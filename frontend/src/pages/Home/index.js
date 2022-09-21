import { Container, InfoBox } from "./style";
import ghost from "../../assets/ghost.svg";

const Home = () => {
  return (
    <Container>
      <h1>The Wolf's Alley</h1>
      <div>
        <InfoBox>
          <img src={ghost} alt="ghost_svg" />
          Home
        </InfoBox>
        <InfoBox>Home</InfoBox>
      </div>
    </Container>
  );
};

export default Home;
