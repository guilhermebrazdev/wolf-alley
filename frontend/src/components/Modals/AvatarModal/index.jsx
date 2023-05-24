import { Container } from "./style";
import AvatarIcon from "./AvatarIcon";
import { ClientCtxt } from "../../../context/Client";

const AvatarModal = () => {
  const { setAvatarModal, avatarIcons } = ClientCtxt();

  return (
    <Container onClick={() => setAvatarModal(false)}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1>Escolha seu avatar</h1>
        <section id="iconBox">
          {avatarIcons.map((icon, index) => (
            <AvatarIcon icon={icon.img_path} key={index} />
          ))}
        </section>
      </div>
    </Container>
  );
};

export default AvatarModal;
