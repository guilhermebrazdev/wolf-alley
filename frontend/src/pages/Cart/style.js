import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  justify-content: flex-start;

  > div {
    @media (min-width: 500px) {
      width: 500px;
    }
    @media (min-width: 1024px) {
      width: 700px;
    }

    > section {
      margin-top: 16px;
      width: 100%;
      display: flex;
      justify-content: space-between;

      > h1 {
        font-size: 1.4rem;
        font-weight: 900;
      }

      #buyButton {
        > button {
          background: var(--beige);
          color: var(--waterGreen);
          width: 120px;
          height: 30px;
          font-size: 1.2rem;
          font-weight: 900;
        }
      }
    }
  }
`;
