import styled from "styled-components";

export const Container = styled.div`
  height: 45px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > section {
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
      width: 95%;
      height: 50%;
      background: transparent;
      outline: none;
      border: none;
    }
  }

  p {
    color: var(--pinkError);
    font-weight: 900;
    font-size: 0.8rem;
    margin-left: 8px;
  }
`;
