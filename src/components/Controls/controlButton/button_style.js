import styled, { css } from "styled-components";

const Button = styled.button`
    position: absolute;
    padding: 0;
    width: 2rem;
    height: 2rem;   
    ${
        (props) => { 
            if(props.text === 'left') {
                return css`
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%) rotate(45deg);
                `
            } else if(props.text === 'up') {
                return css`
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%) rotate(45deg);
                `
            } else if(props.text === 'right') {
                return css`
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%) rotate(45deg);
                `
            } else if(props.text === 'down') {
                return css`
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%) rotate(45deg);
                `
            }
        }
    };
`

export default Button;