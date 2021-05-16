import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './pages/Login'
import PatientRegister from './pages/PatientRegister';
import DoctorRegister from './pages/DoctorRegister';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path = "/login">
            <Login/>
          </Route>
          <Route path = "/register-patient">
            <PatientRegister/>
          </Route>
          <Route path = "/register-doctor">
            <DoctorRegister/>
          </Route>
        </Switch>
    </div>
    </Router>
    
  );
}

export default App;
