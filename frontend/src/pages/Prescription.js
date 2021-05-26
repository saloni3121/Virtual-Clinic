import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { TextareaAutosize } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  add:{
    width: '235px',
    // margin: theme.spacing(0, 10, 0),   
    marginLeft: '90px',
    marginTop: '10px'
  },
  medicineField:{
    // width: '3px',
    position: 'relative',
    marginLeft: '-2px',
    marginBottom: '10px',
  },
  deleteIcon:{
    // marginTop: 
  },
  eachInput:{
    marginTop: '30px'
  },
  instructionField:{
    width: '322px',
    marginLeft: '-2px',
  },
  deleteButton:{
    height: '55px',
    marginLeft: '10px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Prescription() {
  const classes = useStyles();

  const [fields, setFields] = useState([{ 
    value: '' ,
    instruction : ''
  }]);

  function handleChangeValue(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }
  function handleChangeInstruction(i, event) {
    const instructions = [...fields];
    instructions[i].instruction = event.target.value;
    setFields(instructions);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  console.log(fields)
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <Typography component="h1" variant="h5">
          {/* <LocalHospitalIcon/> */}
          Prescription
          {/* <LocalHospitalIcon/> */}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="patientName"
                variant="outlined"
                required
                fullWidth
                id="patientName"
                label="Patient Name"
                // autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="age"
                label="Age"
                name="age"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}sm={6}>
              <TextField
                variant="outlined"
                required
                type="date"
                fullWidth
                id="date"
                value= {new Date()}
                // label="Date"
                name="date"
                autoComplete="date"
              />
            </Grid>
            <Grid item xs={12}sm={6}>
              <TextField
                variant="outlined"
                required
                type="text"
                fullWidth
                id="gender"
                label="Gender"
                // label="Date"
                name="gender"
                autoComplete="gender"
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
            <TextareaAutosize 
                variant="outlined"
                fullWidth
                label="Medicines prescribed"
                aria-label="Medicines prescribed" 
                rowsMin={4} 
                placeholder="Diagnosis" 
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextareaAutosize 
                variant="outlined"
                label="Medicines prescribed"
                fullWidth
                aria-label="Medicines prescribed" 
                rowsMin={4} 
                placeholder="Medicines prescribed" 
            />
            </Grid> */}
           
           <Grid item xs={12}>
             {fields.map((field, idx) => {
            return (
              <div className={classes.eachInput} key={`${field}-${idx}`}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="text"
                  id="medicineName"
                  className={classes.medicineField}
                  label="Enter the name of medicine"
                  value={field.value || ""}
                  onChange={e => handleChangeValue(idx, e)}
                />
                  <TextField
                    variant="outlined"
                    id="Instructions"
                    label="Instructions"
                    type="text"
                    required
                    multiline
                    value={field.instruction || ""}
                    className={classes.instructionField}
                    onChange={e => handleChangeInstruction(idx, e)}
                  />
                {/* <Grid xs={12} sm={6}>

                </Grid> */}
                <Button type="button" style={{backgroundColor: '#f50057', color: '#fff'}} className={classes.deleteButton} onClick={() => handleRemove(idx)}>
                  <DeleteIcon fontSize="medium" className={classes.deleteIcon}/>
                </Button>
              </div>
            );
          })}
            </Grid>

            <Button
              type="button"
              // fullWidth
              variant="contained"
              style={{backgroundColor: '#38A3A5', color: '#fff'}}
              className={classes.add}
              onClick={() => handleAdd()}
            >
              <AddIcon/>Click to add medicine
            </Button>

            </Grid>


          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{backgroundColor: '#22577A', color: '#fff'}}
            className={classes.submit}
          >
            Submit
          </Button>

        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}