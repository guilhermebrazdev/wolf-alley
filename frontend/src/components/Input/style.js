import styled from "styled-components";

export const Container = styled.div`
  width: 250px;
  height: 30px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 8px;

  svg {
    color: var(--lightBlue);
  }

  input {
    width: 90%;
    height: 90%;
    background: transparent;
    outline: none;
    border: none;
  }
`;
