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
          <Route path = "/login" render={(routeProps)=><Login {...routeProps}/>} />
            
          {/* </Route> */}
          <Route path = "/register-patient"  render = {(routeProps) => <PatientRegister  {...routeProps}/>}/>

          <Route path = "/register-doctor"  render = {(routeProps) => <DoctorRegister  {...routeProps}/>}/>
            {/* <DoctorRegister/> */}
          {/* </Route> */}
          <Route path = "/doctor-home/:id" render = {(routeProps) => <DoctorHome  {...routeProps}/>} />
            
          <Route path = "/patient-home/:id" render = {(routeProps) => <PatientHome {...routeProps}/>}/>
            

        </Switch>
    </div>
    </Router>
    
  );
}

export default App;
