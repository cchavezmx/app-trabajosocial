import './App.scss';
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Home from './pages/Home'
import NavigationBar from './components/NavigationBar'
import Login from './components/Login'

function App() {
  return (
    <Router>
      <Switch>
        <NavigationBar />
        <Home />
        <Login />
      </Switch>
    </Router>
  );
}

export default App;
