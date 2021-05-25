import React, {useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      width: '700px',
    },
    contain:{
        marginLeft: '400px',
        marginRight: '400px',
        marginTop: '150px'
    },
  });
  

function PatientHistory(props) {
      

    const classes = useStyles();
    console.log(props)
    // const[data, setData] = useState('');
    const[appointments, setAppointments] = useState([]);
    const patientId = props.match.params.id
    useEffect(()=>{


         function makeRequest() {
            axios.get(`http://localhost:5000/patient/${patientId}`).then ((res)=>{
                const response = res.data;
                // setData(response);
                setAppointments(response.appointments)
            })
        }
    makeRequest();
    });

    console.log(appointments)
    return (
        <div className={classes.contain}>
            <TableContainer >
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell align="left">Doctor Name</StyledTableCell>
                    <StyledTableCell align="center">Date</StyledTableCell>
                    {/* <StyledTableCell align="right">Time</StyledTableCell> */}
                    <StyledTableCell align="right">Presciption</StyledTableCell>
                    {/* <StyledTableCell align="right">Contact</StyledTableCell> */}
                </TableRow>
                </TableHead>
                <TableBody>
                {appointments.map((app) => (
                    <StyledTableRow key={app._id}>
                        {/* <StyledTableCell component="th" scope="row">
                            {app.doctorName}
                        </StyledTableCell> */}
                        <StyledTableCell align="left">{app.doctorName}</StyledTableCell>
                        <StyledTableCell align="center">{new Date(app.date).toLocaleDateString(undefined, {day:'2-digit'}) + '-' + new Date(app.date).toLocaleDateString(undefined, {month:'short'}) + '-' + new Date(app.date).toLocaleDateString(undefined, {year:'numeric'})} </StyledTableCell>
                        {/* <StyledTableCell align="right">{app.doctorName}</StyledTableCell> */}
                        <StyledTableCell align="right" >{app.doctorName}</StyledTableCell>
                        {/* <StyledTableCell align="right">{app.doctorName}</StyledTableCell> */}
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}

export default PatientHistory
