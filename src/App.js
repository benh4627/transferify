import './App.css';
import Logo from './components/Logo.js'
import Menu from './navbar2.js';

function App() {
  return (
     <div>
        <div className="App">
          <Logo />
        </div>
        <div>
            <Menu />
        </div>
    </div>
  );
}

export default App;
