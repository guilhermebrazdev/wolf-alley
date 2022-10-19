import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  right: 0;
  top: 80px;
  display: flex;
  height: 150px;
  width: 150px;
  background: rgba(0, 0, 0, 0.8);
  justify-content: center;
  /* animation: showMenu 0.4s 0s both, hideMenu 0s 0.4s both; */

  border-bottom-left-radius: 8px;

  > div {
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  a {
    color: white;
    text-decoration: none;

    height: 100%;
    font-weight: 600;
    font-size: 1.3rem;
    :hover {
      cursor: pointer;
      color: gold;
      font-size: 1.4rem;
    }
  }

  transition: 0.4s;

  /* @keyframes showMenu {
    from {
      top: -71px;
    }
    to {
      top: 80px;
    }
  }

  @keyframes hideMenu {
    from {
      z-index: -1;
    }
    to {
      z-index: 0;
    }
  } */

  /* top: 80px; */
  /* :hover,
  :focus {
    top: 80px;
  } */
`;
