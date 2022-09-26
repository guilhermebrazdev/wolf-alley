import { Container, InfoBox } from "./style";
import ghost from "../../assets/ghost.svg";
import mario from "../../assets/mario.svg";

const Home = () => {
  return (
    <Container>
      <h1>The Wolf's Alley</h1>
      <div>
        <InfoBox>
          <img src={ghost} alt="ghost_svg" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis massa
            dolor, laoreet non ullamcorper egestas, eleifend sit amet dui. Fusce
            dolor sapien, semper a lectus ac, mollis dignissim purus. Proin
            rhoncus feugiat arcu, quis tincidunt lorem accumsan vitae. Sed
            pretium imperdiet eros sit
          </p>
        </InfoBox>
        <InfoBox>
          <img src={mario} alt="ghost_svg" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis massa
            dolor, laoreet non ullamcorper egestas, eleifend sit amet dui. Fusce
            dolor sapien, semper a lectus ac, mollis dignissim purus. Proin
            rhoncus feugiat arcu, quis tincidunt lorem accumsan vitae. Sed
            pretium imperdiet eros sit
          </p>
        </InfoBox>
      </div>
    </Container>
  );
};

export default Home;
