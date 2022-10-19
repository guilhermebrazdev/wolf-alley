import styled from "styled-components";

export const Container = styled.header`
  width: 100vw;
  background: var(--darkBlue);
  height: 80px;
  min-height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    min-width: 300px;
    max-width: 900px;
    width: 100%;
    justify-content: space-between;

    > img {
      width: 200px;
      height: 40px;
      border: 5px outset silver;
      margin-left: 4px;
    }

    #mobileMenu {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      > svg {
        width: 90px;
        height: 30px;
        cursor: pointer;
      }

      @media (min-width: 700px) {
        display: none;
      }
    }
  }
`;
