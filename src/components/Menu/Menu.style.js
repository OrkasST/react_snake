import styled from 'styled-components';

export const MenuWrapper = styled.div`
    position: absolute;
    z-index: 3;
    width: 40rem;
    height: 20rem;
    display: flex;
    flex-direction: column;
    border: solid #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(250, 250, 250, 0.5);

    @media (max-width: 400px) {
      width: 90%;
      flex-direction: row;
    }
`

export const MenuLinks = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    overflow-y: auto;
    flex: 1;

    @media (max-width: 400px) {
      flex-direction: column
    }
`
export const MenuContent = styled.div`
    position: relative;
    flex: 1;
`
