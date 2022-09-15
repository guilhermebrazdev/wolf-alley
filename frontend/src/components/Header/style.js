import styled from "styled-components";

export const Container = styled.header`
  display: block;
  width: 100vw;
  background: var(--darkBlue);
  /* max-height: 80px; */
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  img {
    width: 200px;
    height: 40px;
    border: 5px outset silver;
    margin-left: 4px;
  }

  svg {
    width: 90px;
    height: 30px;
  }
`;
