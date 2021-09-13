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
    background: #fff;
`

export const MenuLinks = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    overflow-y: auto;
    flex: 1;
`
export const MenuContent = styled.div`
    position: relative;
    flex: 1;
`