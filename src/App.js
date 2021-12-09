import Wrapper from './app-style';
import React from 'react';
import GamePage from './components/GamePage/GamePage';
import start from './components/scripts/start';
import { changeDirection } from './components/scripts/controls';
import { Route } from 'react-router-dom';
import ButtonLink from './components/ButtonLink/ButtonLink.style';
import { SAVE } from './components/scripts/Game';

const App = (props) => {
  const Cnv = React.createRef();
  const WorldMap = React.createRef();
  const onStartClick = (e) => {
    let viewArea = Cnv.current;
    let currentMap = WorldMap.current;
    start(viewArea, currentMap, props.state.gameInfo);
  }
  const saveGame = () => {
    Cnv.current.classList.add('_hidden');
    SAVE();
  }

  return (
    <Wrapper>
      <canvas
        className='screen _hidden'
        width='200'
        height='200'
        onKeyDown={changeDirection}
        ref={Cnv}
      ><canvas ref={WorldMap} /></canvas>
      <Route path='/game' render={() => 
        <GamePage className='gameUI' state={props.state} dispatch={props.dispatch} saveGame={saveGame}/>
      } />
      <ButtonLink to='/game' start='true' onClick={onStartClick}  activeClassName='_hidden' >Start</ButtonLink>
      
    </Wrapper>
  );
}

export default App;
//<canvas className='wmap _hidden' ref={WorldMap} />
