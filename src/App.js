import logo from './logo.svg';
import './App.css';
import { Map } from './components/schemMap/map';
import { CanvasMap } from './components/canvasMap/canvasMap';
import { KonvaMap } from './components/KonvaMap/KonvaMap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <KonvaMap />
        {/* <Map /> */}
        {/* <CanvasMap /> */}
      </header>
    </div>
  );
}

export default App;
