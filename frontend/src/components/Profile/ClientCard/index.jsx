import Button from "../../Button";
import { ClientCtxt } from "../../../context/Client";

import { Container } from "./style";

const ClientCard = () => {
  const { client, logout, setAvatarModal, currentAvatar } = ClientCtxt();

  function formatCpf(cpf) {
    const formatedCpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
      6,
      9
    )}-${cpf.slice(9, 11)}`;

    return formatedCpf;
  }

  function getAge(birthday) {
    const dataAtual = new Date();

    const day = dataAtual.getDate();
    const month = dataAtual.getMonth() + 1;
    const year = dataAtual.getFullYear();

    const birthYear = Number(birthday.split("-")[0]);
    const birthMonth = Number(birthday.split("-")[1]);
    const birthDay = Number(birthday.split("-")[2]);

    let age = year - birthYear;

    if (month < birthMonth) {
      age--;
    } else if (month === birthMonth) {
      if (day < birthDay) {
        age--;
      }
    }

    return age;
  }

  return (
    <Container>
      <section id="facePic">
        <img
          src={currentAvatar}
          alt="profile_pic"
          onClick={() => setAvatarModal(true)}
        />
      </section>
      <section id="info">
        <h1>{client.name}</h1>
        <h2>{formatCpf(client.cpf)}</h2>
        <h2>{client.email}</h2>
        <h2>{getAge(client.birthday)} anos</h2>
        <div>
          <Button id="logout" onClick={() => logout()}>
            Sair
          </Button>
        </div>
      </section>
    </Container>
  );
};

export default ClientCard;
