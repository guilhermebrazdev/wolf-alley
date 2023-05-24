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
    height: 300px;
    width: 310px;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    > h1 {
      font-size: 1.2rem;
      font-family: var(--pressStart);
      color: gold;
    }

    > section {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;

      justify-content: center;

      width: 250px;
    }

    border: 4px solid var(--darkBlue);
  }
`;
