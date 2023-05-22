import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ProductsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProductsBox = styled.div`
  margin-top: 32px;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 848px;
  justify-content: center;

  @media (min-width: 700px) {
    flex-direction: row;
  }
  @media (min-width: 1440px) {
    max-width: 1064px;
  }
`;
