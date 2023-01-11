import styled from "styled-components";

export const Card = styled.div`
  background: var(--lightGreen);
  height: 300px;
  width: 200px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;

  > div {
    height: 100%;
    img {
      height: 190px;
    }
  }
`;

export const InfoBox = styled.div`
  background: var(--waterGreen);
  box-shadow: rgb(0 0 0 / 30%) 0px -10px 6px 0px;
  border-radius: 8px;

  > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    > h1 {
      font-size: 1.5rem;
      font-family: var(--pressStart);
      color: gold;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    > h3 {
      font-size: 1.4rem;
      font-weight: 900;
    }

    #buyButton {
      > button {
        width: 160px;
        height: 40px;
        font-size: 1.5rem;
        font-weight: 900;
        color: var(--waterGreen);
        background: var(--beige);
      }
    }
  }
`;
