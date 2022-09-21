import styled from "styled-components";

export const Container = styled.div`
  button {
    background: var(--lightBlue);
    min-width: 100px;
    min-height: 30px;
    border-radius: 8px;
    :hover {
      transform: scale(1.06);
      cursor: pointer;
    }
    transition: 0.2s;
  }
`;
