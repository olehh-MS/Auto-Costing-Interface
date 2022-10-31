import './App.css';
import CostesTables from './Components/CostesTables';
import RawMaterialsTable from './Components/RawMaterialsTable/RawMaterialsTable';
function App() {
  return (
    <div className="App">
      <div className='navBar'>
        <div className='navBar-Title'>
          Auto-Costing 
        </div>
        <div className='navBar-menu'>
          <ul>
            <li>Costing</li>
            <li>Raw Materials</li>
          </ul>
        </div>
      </div>

      <RawMaterialsTable/>

      <CostesTables/>
    </div>
  );
}

export default App;
