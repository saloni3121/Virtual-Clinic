import React,{useState, useEffect} from 'react';
import {useAutocomplete} from '@material-ui/lab';
import { Link } from 'react-router-dom';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Alert from '@material-ui/lab/Alert';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import TuneIcon from '@material-ui/icons/Tune';
import '../App.css'

const useStyles = makeStyles((theme) => ({
    label: {
      display: 'block',
    },
    input: {
      width: 200,
    },
    formControl: {
      margin: theme.spacing(3),
    },
    inputInput: {

      paddingLeft: `calc(1em + ${theme.spacing(5)}px)`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '700px',
        '&:focus': {
          width: '700px',
        },
      },
    },
    imagehandle:{
      display: 'inline-block',
      width: '25px',
      height: '25px',
      borderRadius: '20px',
    },
    root: {
      flexGrow: 1,
      backgroundColor: '#fff',
      marginLeft: '200px',
      width: '100%',
    },
    rootcard: {
      width: '300px',
      border: '1px solid #b2b2b2',
      display: 'inline-block',
      marginRight: '20px',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: '#22577A',
    },
    center:{
      marginRight: '40px',
    },
    title:{
      marignTop: '-50px',
      marginBottom: '40px'
    },
    carocontainer:{
      marginTop: '-20px'
    },
    contain:{
        marginTop: '45px',
        marginRight: '20px',
        marginLeft: '20px',
        marginBottom: '20px',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: '#EAE7D6',
      '&:hover': {
        backgroundColor: 'b2b2b2',
      },
      width: '200px',
      padding: '8px',
      [theme.breakpoints.up('sm')]: {
        marginLeft: '78px',
        width: '500px',
      },
    },
    bookbutton:{
      padding: theme.spacing(0.6, 2),
      position: 'relative',
      marginLeft: '20px',
      borderRadius: theme.shape.borderRadius,
      color:'#fff',
      fontSize: '13px',
      '&:hover': {
        backgroundColor: 'b2b2b2',
      },
      width: '200px',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '200px',
        height: '48px',

      },
    },
    searchIcon: {
      marginTop: '-8px',
      marginLeft: '15px',
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color:'#000',
    },
    allcards:{
      display: 'inline-block',
      marginTop: '30px',
      marginBottom: '20px'
    },
    filterIcon:{
      marginRight: '10px',
    },
    inputRoot: {
      color: '#000',
    },
    central:{
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
    checkboxes:{
      left: 0,
      marginLeft: '-50px',
    },
    filterButton:{
      padding: theme.spacing(0.6, 2),
      marginRight: '-70px',
      borderRadius: theme.shape.borderRadius,
      color:'#fff',
      fontSize: '13px',
      '&:hover': {
        backgroundColor: 'b2b2b2',
      },
      width: '100px',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '120px',
        height: '48px',

      },
    },
    listbox2: {
      width: 200,
      marginTop: '267px',
      marginLeft: '-680px',
      padding: 0,
      zIndex: 1,
      position: 'absolute',
      listStyle: 'none',
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
      maxHeight: 200,
      border: '1px solid rgba(0,0,0,.25)',
      
      '& li[data-focus="true"]': {
        backgroundColor: '#4a8df6',
        color: 'white',
        cursor: 'pointer',
      },
      '& li:active': {
        backgroundColor: '#2977f5',
        color: 'white',
      },
    },
    listbox: {
      width: 511,
      marginTop: '212px',
      marginLeft: '-112px',
      padding: 0,
      zIndex: 1,
      position: 'absolute',
      listStyle: 'none',
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
      maxHeight: 200,
      border: '1px solid rgba(0,0,0,.25)',
      
      '& li[data-focus="true"]': {
        backgroundColor: '#4a8df6',
        color: 'white',
        cursor: 'pointer',
      },
      '& li:active': {
        backgroundColor: '#2977f5',
        color: 'white',
        
      },
      

    },
  }));

function SearchBar(props) {

console.log(props);
const [allDoctors, setAllDoctors] = useState([]);
let [filteredDoctors, setFilteredDoctors] = useState([]);
const [openFilterDialouge, setOpenFilterDialouge] = useState(false)
let [filterChosen, setFilterChosen] = useState([]);
  
    useEffect(()=>{

        async function getDoctors(){
            await axios.get("http://localhost:5000/doctor").then((res)=>{
                const response = res.data;
                setAllDoctors(response);
            })
        }
        
      getDoctors();

      const doctors = allDoctors.filter(doctor => {
        if (filterChosen.includes(doctor.specialisation)) return true;
      });
      setFilteredDoctors(doctors);
    
    },[filterChosen, allDoctors]);


    const handleBookAppButton = () =>{
      props.history.push('/login')
    }

    const showDoctorProfile = (id) =>{
      props.history.push(`/doctor-profile/${id}`)
    }

    const handleFilter =()=>{
      setOpenFilterDialouge(!openFilterDialouge);
      console.log(openFilterDialouge)
    }
    const classes = useStyles();
    
    const key = 'specialisation';
    const arrayUniqueByKey = [...new Map(allDoctors.map(item =>
      [item[key], item])).values()];
    
    const {
      getRootProps,
      getInputLabelProps,
      getInputProps,
      getListboxProps,
      getOptionProps,
      groupedOptions,
    } = useAutocomplete({
      id: 'use-autocomplete-demo',
      options: allDoctors,
      getOptionLabel: (option) => option.fullName,
    });
    console.log(filterChosen)

    return (
      <>
      
        <div className={classes.central}>

        <Toolbar className={classes.center} {...getRootProps()}>
        <Button className={classes.filterButton}style={{backgroundColor: '#22577A', color: '#FFFFFF'}}  onClick={handleFilter}> <TuneIcon className={classes.filterIcon}/> Filter </Button>
          
                    <div className={classes.search} {...getInputLabelProps()}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                         {...getInputProps()} 
                        placeholder="Search for doctors"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        />
                        
                    </div>
                    
                  {props.isLoggedIn?
                  <>
                    <Link to = {`/book-appointment/${props.id}`} >
                      <Button  style={{backgroundColor: '#22577A', color: '#FFFFFF'}} variant="contained"  className={classes.bookbutton}> Book an Appointment</Button>
                    </Link>
                  </>:
                  <>
                    <Link >
                      <Button  style={{backgroundColor: '#22577A', color: '#FFFFFF'}}  onClick={handleBookAppButton} variant="contained" className={classes.bookbutton}> Book an Appointment</Button>
                    </Link>
                  </>
                  }
                  
                    
                   
                    
        </Toolbar>
        {groupedOptions.length > 0 ? (
          <ul className={classes.listbox} {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>{option.fullName} </li>
            ))}
          </ul>
        ) : null}
        {openFilterDialouge &&
        <>
          <ul className={classes.listbox2}> 
            <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel style={{fontSize: '12px', marginLeft: '-37px', marginBottom: '4px'}} component="legend">Filter by specialisation </FormLabel>
            <FormGroup className={classes.allspec}>
            {arrayUniqueByKey.sort((a, b) => a.specialisation.localeCompare(b.specialisation)).map((option, index) => (
                <FormControlLabel
                className={classes.checkboxes}
                name={option.specialisation}
                key={index}
                    control={<Checkbox 
                      onClick={e => {
                      if(e.target.checked) {
                        setFilterChosen(filterChosen => [...filterChosen, e.target.name]);
                      }else{
                        setFilterChosen(filterChosen.filter(item => item !== e.target.name));
                      }
                    }
                    }
                    />}
                  label= {option.specialisation}
                />
            ))}
            </FormGroup>
            </FormControl>
          </ul>
        </>}
      </div>
      <div className={classes.allcards}>
      {filteredDoctors.map((doc)=> (
        <Card className={classes.rootcard} key={doc._id}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="doctor" className={classes.avatar}>
                          {doc.fullName.charAt(0).toUpperCase()}
                        </Avatar>
                      }
                      className={classes.center}
                      title={doc.fullName}
                      subheader={`Specialized in: ${doc.specialisation}`}
                    />
                    <CardMedia
                      className={classes.media}
                      image={doc.image}
                    />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                      <Button variant="contained" style={{backgroundColor: '#22577A', color: '#fff'}}>Book an appointment</Button>
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
      </div>
      </>
    );
}

export default SearchBar
