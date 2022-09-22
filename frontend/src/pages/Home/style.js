import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;

  > h1 {
    font-family: var(--lobsterTwo);
    font-size: 2.5rem;
    color: gold;
  }

  > div {
    min-height: 80%;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
`;

export const InfoBox = styled.section`
  width: 300px;
  display: flex;
  flex-direction: column;

  img {
    height: 150px;
  }

  p {
    font-size: 1.1rem;
    font-weight: 900;
  }
`;
