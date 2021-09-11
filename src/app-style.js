import styled from "styled-components";

const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;

    * {
        padding: 0;
        margin: 0;
    }

    .App {
        text-align: center;
        overflow: hidden;
    }

    .screen {
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