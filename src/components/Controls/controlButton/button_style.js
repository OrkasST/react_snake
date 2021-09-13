import styled, { css } from "styled-components";

const Button = styled.button`
    position: absolute;
    padding: 0;
    width: 3.5rem;
    height: 3.5rem;
    ${
        props => props.control && css`
            opacity: 0.6;
        `
    }  
    ${
        props => props.start && css`
            left: 50%;
            top: 5rem;
            transform: translate(-50%);
            border: solid;
            border-radius: 1rem;
            width: 5rem;
            height: 3rem;
            font-size: 1.2rem;
        `
    }
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
            } else if(props.text === 'speedUp') {
                return css`
                    top: -20%;
                    right: -35%;
                    transform: translateX(-50%);
                `
            }
        }
    };

    ${
        props => props.pauseBtn && css`
        right: 9rem;
        top: 2rem;
    `
    }

    ${
        props => props.resumeBtn && css`
        right: 15rem;
        top: 2rem;
    `
    }
`

export default Button;