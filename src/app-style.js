import styled from "styled-components";

const Wrapper = styled.div`
    .App {
        text-align: center;
        overflow: hidden;
    }

    .screen {
        width: auto;
        height: auto;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        border: #000 solid 1px;
        background-color: #000;
    }
    ._hidden {
        display: none;
    }
`
export default Wrapper;