import './App.css';
import { changeDirection } from './components/scripts/controls';
import start from './components/scripts/start';

function App() {
  return (
    <div className="App">
      <canvas 
        className='screen'
        width='200'
        height='200' 
        onClick={ start } 
        onKeyDown={ changeDirection } 
        tabIndex='0' 
      />
    </div>
  );
}

export default App;
