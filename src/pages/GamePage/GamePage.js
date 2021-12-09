import React from 'react';
import Controls from '../../components/Controls/Controls';
import { changeDirection } from '../../components/scripts/controls';
import ButtonLink from '../../components/ButtonLink/ButtonLink.style';
import { Route } from 'react-router-dom';
import Menu from './Menu/Menu';
//import Button from '../Controls/controlButton/button_style';
//import { Pause, Resume } from '../scripts/Game';


const GamePage = (props) => {
    const stopPlayer = () => {
        changeDirection({code : 'KeyM'});
    }
  
    return(
        <div>
            <ButtonLink to='/game/menu' menuBtn='true' onClick={stopPlayer} >Menu</ButtonLink>
            <Controls changeDirection={changeDirection} />
            <div>
                <Route path='/game/menu' render={() => <Menu state={props.state} dispatch={props.dispatch} saveGame={props.saveGame} /> } />
            </div>
        </div>
    )
}
 export default GamePage;

//  <Button onClick={ Pause } pauseBtn='true' >Pause</Button>
//             <Button onClick={ Resume } resumeBtn='true' >Resume</Button>
