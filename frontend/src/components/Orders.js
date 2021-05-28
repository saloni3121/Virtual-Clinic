import React,{useEffect,useState} from 'react';
// import Links from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Title from './Title';
import axios from 'axios';

// Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

// const rows = [
//   createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
//   createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
//   createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
// ];

// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders(props) {

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/doctor-home/${props.id}`)
        .then(res => {
          const appointment = res.data.appointments;
          setAppointments(appointment)
        })
    }, [props.id])

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Appointments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Patient Name</TableCell>
            <TableCell>View Reports</TableCell>
            <TableCell align="right">Prescription</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((app) => (
            <TableRow key={app.id}>
              <TableCell> {new Date(app.date).toLocaleString().slice(0,9)}</TableCell>
              <TableCell>{app.startDate.toString().slice(11,16)}</TableCell>
              <TableCell>{app.patientName}</TableCell>
              {app.url?
                <TableCell>
                    <Link href={`${app.url}`}>
                      <Button style={{backgroundColor: '#22577A', color: '#FFFFFF'}} >
                        View Reports
                      </Button>
                    </Link>
                </TableCell>:
                <TableCell>- </TableCell>}
              {app.prescription.diagnosis?
              <TableCell align="right">
                <Link to ={`/prescription/${app._id}`} styles={{textDecoration:'none'}}>
                  <Button style={{backgroundColor: '#22577A', color: '#FFFFFF'}} >
                    View Prescription
                  </Button>
                </Link>
              </TableCell>:
              <TableCell align="right">
                <Link to ={`/prescription/${app._id}`} styles={{textDecoration:'none'}}>
                  <Button style={{backgroundColor: '#22577A', color: '#FFFFFF'}} >
                    Add Prescription
                  </Button>
                </Link>
              </TableCell>
              }
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className={classes.seeMore}>
        <Links color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Links>
      </div> */}
    </React.Fragment>
  );
}