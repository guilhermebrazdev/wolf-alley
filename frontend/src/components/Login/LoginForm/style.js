import styled from "styled-components";

export const Container = styled.div`
  form {
    background: var(--darkBlue);
    width: 300px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 8px;

    @media (min-width: 1024px) {
      height: 250px;
    }
  }
`;
