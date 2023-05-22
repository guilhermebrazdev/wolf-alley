import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;

  > div {
    background: var(--waterGreen);
    height: 200px;
    width: 350px;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    border: 4px solid var(--darkBlue);

    > h1 {
      font-size: 1.2rem;
      font-family: var(--pressStart);
      color: gold;
    }
    > p {
      font-family: var(--pressStart);
      color: gold;
    }

    #confirmButton {
      > button {
        background: var(--beige);
        color: var(--waterGreen);
        width: 150px;
        height: 30px;
        font-size: 1.2rem;
        font-weight: 900;
      }
    }
  }
`;
