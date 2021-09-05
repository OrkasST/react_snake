import { changeDirection } from './components/scripts/controls';
import start from './components/scripts/start';
import Controls from './components/Controls/Controls';
import Wrapper from './app-style';

function App() {
  return (
    <Wrapper>
      <canvas 
        className='screen'
        width='200'
        height='200' 
        onClick={ start } 
        onKeyDown={ changeDirection } 
        tabIndex='0' 
      />
      <Controls changeDirection={ changeDirection } />
    </Wrapper>
  );
}

export default App;
