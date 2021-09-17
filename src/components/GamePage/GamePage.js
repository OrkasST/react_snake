import React from 'react';
import Controls from '../Controls/Controls';
import { changeDirection } from '../scripts/controls';
import ButtonLink from '../../btn-link';
import { Route } from 'react-router-dom';
import Menu from './Menu/Menu';
//import Button from '../Controls/controlButton/button_style';
//import { Pause, Resume } from '../scripts/Game';


const GamePage = () => {
    
  
    return(
        <div>
            <ButtonLink to='/game/menu' menuBtn='true' >Menu</ButtonLink>
            <Controls changeDirection={changeDirection} />
            <div>
                <Route path='/game/menu' render={() => <Menu /> } />
            </div>
        </div>
    )
}
 export default GamePage;

//  <Button onClick={ Pause } pauseBtn='true' >Pause</Button>
//             <Button onClick={ Resume } resumeBtn='true' >Resume</Button>
