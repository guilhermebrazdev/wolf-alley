import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;

  header {
    position: fixed;
  }
`;

export const RouteBox = styled.div`
  height: calc(100vh - 80px);
  padding-top: 80px;
`;

export const BackBox = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background: linear-gradient(to bottom, #09498c 30%, #4e5980);
  position: fixed;
  z-index: -1;
`;
