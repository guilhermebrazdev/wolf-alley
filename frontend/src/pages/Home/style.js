import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  /* background: orange; */
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
    background: orange;
    min-height: 80%;
  }
`;

export const InfoBox = styled.section`
  width: 300px;
  background: green;
  display: flex;
  flex-direction: column;

  img {
    height: 150px;
  }
`;
