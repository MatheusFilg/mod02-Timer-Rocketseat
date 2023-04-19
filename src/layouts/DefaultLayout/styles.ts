import styled from 'styled-components'

export const LayoutContainer = styled.div`
  max-width: 74rem;
  height: calc(100vh - 10rem);
  /* 100% - 160px p deixar um espaço de 80px em cima e embaixo */
  margin: 5rem auto;
  /** aqui ele ja ta ajustando p centralizar dando o espaço de 80px em cima e embaixo */
  padding: 2.5rem;
  /** ajuste interno de espaçamento */

  background: ${(props) => props.theme['gray-800']};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`
