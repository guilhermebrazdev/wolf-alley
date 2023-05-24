import { ClientCtxt } from "../../../../context/Client";

import { Container } from "./style";

const AvatarIcon = ({ icon }) => {
  const { pickAvatar } = ClientCtxt();
  return <Container onClick={() => pickAvatar(icon)} src={icon} />;
};

export default AvatarIcon;
