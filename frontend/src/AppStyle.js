import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  /* min-height: 100vh; */
  /* height: 100vh; */
  color: white;
  display: flex;
  flex-direction: column;

  header {
    position: fixed;
    background: green;
  }
`;

export const RouteBox = styled.div`
  /* max-height: 100vh; */
  /* min-height: 100%; */
  min-height: 100vh;
  /* margin-top: 100px; */
  background: purple;
`;
