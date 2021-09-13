import ButtonLink from "../../../btn-link";
import { MenuContent, MenuLinks, MenuWrapper } from "./menu-style";
import React from 'react';
//import { Route } from 'react-router-dom';

const Menu = () => {
    return (
        <MenuWrapper>
            <MenuLinks>
                <ButtonLink to='/home' gameMenuBtn='true' >Home</ButtonLink>
                <ButtonLink to='/game/menu/upgrade' gameMenuBtn='true' >Upgrade</ButtonLink>
                <ButtonLink to='/game/menu/statistic' gameMenuBtn='true' >Statistic</ButtonLink>
                <ButtonLink to='/game/menu/settings' gameMenuBtn='true' >Settings</ButtonLink>
            </MenuLinks>
            <MenuContent>
            </MenuContent>
        </MenuWrapper>
    )
}

export default Menu;