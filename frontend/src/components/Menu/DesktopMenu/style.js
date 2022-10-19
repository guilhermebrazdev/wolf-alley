import styled from "styled-components";

export const Container = styled.div`
  margin-right: 12px;
  min-width: 400px;
  font-size: 1.1rem;
  font-weight: 900;
  justify-content: space-around;
  font-family: var(--pressStart);
  gap: 32px;
  a {
    text-decoration: none;
    color: white;

    :hover {
      cursor: pointer;
      color: gold;
      font-size: 1.15rem;
    }
    transition: 0.2s;
  }
  display: none;
  @media (min-width: 700px) {
    display: flex;
  }
`;
