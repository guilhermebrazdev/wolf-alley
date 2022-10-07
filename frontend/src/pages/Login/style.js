import styled from "styled-components";

export const Container = styled.div`
  height: 100%;

  h1 {
    color: gold;
    font-family: var(--pressStart);
    font-size: 2rem;
    padding-top: 32px;
  }

  > div {
    height: calc(100% - 80px);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    /* background: gray; */

    @media (min-width: 700px) {
      flex-direction: row;
    }

    img {
      height: 200px;

      @media (min-width: 1024px) {
        height: 300px;
      }
    }
  }
`;
