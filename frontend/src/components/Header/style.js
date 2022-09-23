import styled from "styled-components";

export const Container = styled.header`
  width: 100vw;
  background: var(--darkBlue);
  height: 80px;
  min-height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* position: fixed; */

  img {
    width: 200px;
    height: 40px;
    border: 5px outset silver;
    margin-left: 4px;
  }

  svg {
    width: 90px;
    height: 30px;
    cursor: pointer;
  }
`;
