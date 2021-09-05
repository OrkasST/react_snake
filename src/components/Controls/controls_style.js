import styled from "styled-components";

const ControlsWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    background: transparent;
    width: 5rem;
    height: 5rem;  
    display: none;
    @media(max-width: 1000px) {
        display: block;
    }
`

export default ControlsWrapper;