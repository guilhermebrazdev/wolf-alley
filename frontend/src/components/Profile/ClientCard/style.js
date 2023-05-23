import styled from "styled-components";

export const Container = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  background: pink;
  height: 300px;
  width: 300px;
  padding: 4px 8px;
  gap: 8px;

  background: var(--darkBlue);

  border-radius: 8px;

  #facePic {
    display: flex;
    justify-content: center;
    height: 40%;

    > img {
      width: 120px;
    }
  }
  #info {
    height: 60%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    > h1 {
      width: 100%;
      text-align: center;
      font-family: var(--pressStart);
      color: gold;
      font-size: 1.5rem;
      height: 100%;
    }

    > h2 {
      font-family: var(--lobsterTwo);
      font-size: 1.5rem;
      width: 100%;
      height: 100%;
      text-align: left;
    }
    > div {
      /* background: orange; */
      width: 100%;

      #logout {
        > button {
          width: 120px;
          height: 40px;
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--waterGreen);
          background: var(--beige);
        }
      }
    }
  }
`;
