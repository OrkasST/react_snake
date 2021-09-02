import './App.css';
import start from './components/scripts/start';

function App() {
  return (
    <div className="App">
      <canvas className='screen' width='200' height='200' onClick={ start } />
    </div>
  );
}

export default App;
