import ClientCard from "../../components/Profile/ClientCard";
import AvatarModal from "../../components/Modals/AvatarModal";

import { Container } from "./style";
import { ClientCtxt } from "../../context/Client";

const Profile = () => {
  const { avatarModal } = ClientCtxt();

  return (
    <Container>
      {avatarModal && <AvatarModal />}
      <ClientCard />
    </Container>
  );
};

export default Profile;
