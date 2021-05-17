import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './pages/Login'
import PatientRegister from './pages/PatientRegister';
import DoctorRegister from './pages/DoctorRegister';
import DoctorHome from './pages/DoctorHome';
import PatientHome from './pages/PatientHome';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* <Route path = "/" /> */}
          <Route exact path = "/login" render={(routeProps)=><Login {...routeProps}/>} />
          <Route exact path = "/register-patient"  render = {(routeProps) => <PatientRegister  {...routeProps}/>}/>
          <Route exact path = "/register-doctor"  render = {(routeProps) => <DoctorRegister  {...routeProps}/>}/>
          <Route exact path = "/doctor-home/:id" render = {(routeProps) => <DoctorHome  {...routeProps}/>} />
          <Route exact path = "/patient-home/:id" render = {(routeProps) => <PatientHome {...routeProps}/>}/>
        </Switch>
    </div>
    </Router>
    
  );
}

export default App;
