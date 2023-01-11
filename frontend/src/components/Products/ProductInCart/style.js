import styled from "styled-components";

export const Container = styled.div`
  height: 100px;

  display: flex;

  justify-content: center;
  align-items: center;

  width: 100%;

  > img {
    height: 100%;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;

    height: 100px;
    width: 100%;

    > h1 {
      font-size: 1.2rem;
      font-family: var(--pressStart);
      color: gold;
      text-align: left;
    }

    > h3 {
      font-size: 1.2rem;
      font-weight: 900;
    }
  }

  > svg {
    color: var(--trash);
    font-size: 2rem;
    margin-right: 8px;
    cursor: pointer;

    :hover {
      transform: scale(1.2);
    }
    transition: 0.2s;
  }

  border-bottom: 1px solid white;
`;
