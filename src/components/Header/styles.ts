import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;
  }

  a {
    width: 3rem;
    height: 3rem;

    display: flex;
    justify-content: center;
    align-items: center;

    color: ${(props) => props.theme['gray-100']};

    /** essas bordar são para o assets de hover */
    /**as bordas sao feitas anteriormente para no momento do hover ela 
    "aparecer" e ter a cor. A borda top é p compensar os 3px que a borda bot
    ta jogando p cima.
    */
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;

    &:hover {
      border-bottom: 3px solid ${(props) => props.theme['green-500']};
    }

    /**essa classe active vem do Navlink, 
    que cede essa classe pro icone da pagina 
    que está ativa 
    */
    &.active {
      color: ${(props) => props.theme['green-500']};
    }
  }
`
