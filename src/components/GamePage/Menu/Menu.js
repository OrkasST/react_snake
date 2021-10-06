import ButtonLink from "../../../btn-link";
import { MenuContent, MenuLinks, MenuWrapper } from "./menu-style";
import React from 'react';
import { Route } from 'react-router-dom';
import Settings from "./Settings/Settings";
import Upgrade from "./Upgrade/Upgrade";
import Statistic from "./Statistic/Statistic";

const Menu = (props) => {
    return (
        <MenuWrapper>
            <MenuLinks>
                <ButtonLink to='/home' gameMenuBtn='true' onClick={props.saveGame} >Home</ButtonLink>
                <ButtonLink to='/game/menu/upgrade' gameMenuBtn='true' >Upgrade</ButtonLink>
                <ButtonLink to='/game/menu/statistic' gameMenuBtn='true' >Statistic</ButtonLink>
                <ButtonLink to='/game/menu/settings' gameMenuBtn='true' >Settings</ButtonLink>
                <ButtonLink to='/game' gameMenuBtn='true' >Close</ButtonLink>
            </MenuLinks>
            <MenuContent>
                <Route path='/game/menu/upgrade' render={ () => <Upgrade /> } />
                <Route path='/game/menu/statistic' render={ () => <Statistic state={props.state.statisticPage} dispatch={props.dispatch} /> } />
                <Route path='/game/menu/settings' render={ () => <Settings /> } />
            </MenuContent>
        </MenuWrapper>
    )
}

export default Menu;
