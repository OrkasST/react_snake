import styled, { css } from "styled-components";
import{ NavLink } from 'react-router-dom'

const ButtonLink = styled(NavLink)`
    position: absolute;
    width: 3.5rem;
    height: 3.5rem;
    text-decoration: none;
    text-align: center;
    padding-top: 1rem;
    margin: 0;

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
        props => props.menuBtn && css`
            right: 5rem;
            top: 2rem;
            border: solid;
            border-radius: 1rem;
            width: 4rem;
            height: 2rem;
            font-size: 1.2rem;
            padding: 0;
            color: #fff;
	    @media (max-width: 400px) {
	      right: 2rem;
	      top: 1rem;
	      width: 3.5rem;
	      height: 1.5rem;
	    }
        `
    }

    ${
        props => props.gameMenuBtn && css`
            position: relative;
            border: solid #000;
            width: 4rem;
            height: 2rem;
            font-size: 1.2rem;
            padding: 1rem;
            color: #000;
        `
    }
`
export default ButtonLink;
