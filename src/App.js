import { changeDirection } from './components/scripts/controls';
import start from './components/scripts/start';
import Controls from './components/Controls/Controls';
import Wrapper from './app-style';
import Button from './components/Controls/controlButton/button_style';
import React from 'react';

function App() {
  const Cnv = React.createRef();
  const onStartClick = (e) => {
    let viewArea = Cnv.current;
    e.target.classList.add('_hidden');
    start(viewArea);
  }

  return (
    <Wrapper>
      <canvas 
        className='screen _hidden'
        width='200'
        height='200' 
        onKeyDown={ changeDirection } 
        ref={ Cnv }
      />
      <Button start='true' onClick={ onStartClick } >Start</Button>
      <Controls changeDirection={ changeDirection } />
    </Wrapper>
  );
}

export default App;
