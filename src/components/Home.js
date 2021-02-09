import './Home.css';
import Logo from './Logo.js';
import Login from './login.js';

function Home() {
  return (
        <div className="Home center">
          {/*This will be the homepage -- all other components will be on other pages*/}
          <Logo />
          <Login />
    </div>
  );
}

export default Home;
