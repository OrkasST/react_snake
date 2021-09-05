import styled from "styled-components";

const ControlsWrapper = styled.div`
    position: absolute;
    bottom: 4rem;
    left: 50%;
    transform: translate(-50%);
    background: transparent;
    width: 10rem;
    height: 10rem;  
    display: none;
    @media (max-width: 1000px) {
        display: block
    }
`

export default ControlsWrapper;