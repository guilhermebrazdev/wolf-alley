import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;

  > h1 {
    font-family: var(--lobsterTwo);
    font-size: 2.5rem;
    color: gold;
    margin: 16px 0 32px 0;

    @media (min-width: 1024px) {
      font-size: 3rem;
    }
    @media (min-width: 1440px) {
      font-size: 3.5rem;
    }
  }

  > div {
    min-height: 80%;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
`;

export const InfoBox = styled.section`
  width: 300px;
  display: flex;
  flex-direction: column;
  text-align: start;

  img {
    height: 150px;

    @media (min-width: 1024px) {
      height: 180px;
    }
    @media (min-width: 1440px) {
      height: 200px;
    }
  }

  p {
    font-size: 1.1rem;
    font-weight: 900;

    @media (min-width: 1024px) {
      font-size: 1.5rem;
    }
    @media (min-width: 1440px) {
      font-size: 1.6rem;
    }
  }

  @media (min-width: 700px) {
    flex-direction: row;
    width: 600px;
    align-items: center;
    text-align: center;

    :nth-child(even) {
      flex-direction: row-reverse;
    }
  }
  @media (min-width: 1024px) {
    flex-direction: row;
    width: 900px;
  }
`;
