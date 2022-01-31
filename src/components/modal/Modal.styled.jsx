import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 0 calc(100% - 90vw);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  overflow: auto;
  z-index: 110;
`;

export const ModalImage = styled.img`
  display: block;
  max-width: 85vw;
  max-height: 85vh;
`;
