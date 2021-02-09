import './App.css';
import Logo from './components/Logo.js'
import Menu from './navbar2.js';
import Login from './login.js'; 

function App() {
  return (
     <div>
        <div className="App">
          <Logo />
        </div>
        <div>
            <Menu />
        </div>
        <div>
            <Login />
        </div>
    </div>
  );
}

export default App;
