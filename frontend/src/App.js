import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './pages/Login'
import PatientRegister from './pages/PatientRegister';
import DoctorRegister from './pages/DoctorRegister';
import DoctorHome from './pages/DoctorHome';
import PatientHome from './pages/PatientHome';
import BookAppointment from './pages/BookAppointment';
import SearchBar from './components/SearchBar';
import Meeting from './pages/Meeting'
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* <Route to ='/'>
            <SearchBar/>
          </Route> */}
          <Route exact path = "/" render={(routeProps)=>< Home {...routeProps}/>} />
          <Route exact path = "/login" render={(routeProps)=><Login {...routeProps}/>} />
          <Route exact path = "/register-patient"  render = {(routeProps) => <PatientRegister  {...routeProps}/>}/>
          <Route exact path = "/register-doctor"  render = {(routeProps) => <DoctorRegister  {...routeProps}/>}/>
          <Route exact path = "/doctor-home/:id" render = {(routeProps) => <DoctorHome  {...routeProps}/>} />
          <Route exact path = "/patient-home/:id" render = {(routeProps) => <PatientHome {...routeProps}/>}/>
          <Route exact path = "/book-appointment/:id" render={(routeProps) => <BookAppointment {...routeProps}/>} />
          <Route exact path = "/meeting/:id" render ={(routeProps) => <Meeting {...routeProps} />}/>
        </Switch>
    </div>
    </Router>
    
  );
}

export default App;
