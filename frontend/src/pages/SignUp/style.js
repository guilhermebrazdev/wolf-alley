import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  h1 {
    color: gold;
    font-family: var(--pressStart);
    font-size: 1.3rem;

    @media (min-width: 1024px) {
      font-size: 1.5rem;
    }
    @media (min-width: 1440px) {
      font-size: 2rem;
    }
  }

  > div {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    > img {
      height: 400px;
      display: none;

      @media (min-width: 1024px) {
        display: block;
      }
    }
  }
`;
