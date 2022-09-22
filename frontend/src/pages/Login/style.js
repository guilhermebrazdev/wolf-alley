import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  h1 {
    color: gold;
    font-family: var(--pressStart);
    font-size: 2rem;
  }

  img {
    height: 200px;
  }
`;
