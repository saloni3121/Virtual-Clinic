import React,{useState, useEffect} from 'react';
// import { fade, makeStyles } from '@material-ui/core/styles';
import {useAutocomplete} from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
// import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import axios from 'axios';
import '../App.css'
import { Button, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    label: {
      display: 'block',
    },
    input: {
      width: 200,
    },
    inputInput: {
      // padding: theme.spacing(2, 2, 2, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(5)}px)`,
      transition: theme.transitions.create('width'),
      // width: '700px',
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
    //   marginLeft: '200px',
    //   width: '100%',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: '#000',
      '&:hover': {
        backgroundColor: 'b2b2b2',
      },
      width: '800px',
      padding: '8px',
      [theme.breakpoints.up('sm')]: {
        marginLeft: '400px',
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
      // padding: theme.spacing(0, 2),
      marginTop: '-8px',
      marginLeft: '15px',
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color:'#fec724',
    },
    inputRoot: {
      color: '#fec724',
    },
    center:{
      marginTop: '20px'
    },
    listbox: {
      width: 511,
      marginTop: '-10px',
      marginLeft: '425px',
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

function SearchBar() {
   
const [allDoctors, setAllDoctors] = useState([]);


    useEffect(()=>{

        async function getDoctors(){
            await axios.get("http://localhost:5000/doctor").then((res)=>{
                const response = res.data;
                setAllDoctors(response);
            })
        }
    
        getDoctors();
    
    },[]);

    const classes = useStyles();
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

    return (
        <div>
        {/* <div {...getRootProps()}>
          <label className={classes.label} {...getInputLabelProps()}>
           Search for doctors
          </label>
          <input className={classes.input} {...getInputProps()} />
        </div> */}
        <Toolbar className={classes.center} {...getRootProps()}>
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
                    <Button variant="contained" color="primary" className={classes.bookbutton}> Book an Appointment</Button>
        </Toolbar>
        {groupedOptions.length > 0 ? (
          <ul className={classes.listbox} {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>{option.fullName} <img className={classes.imagehandle}src={option.image} alt="doc pic"/></li>
            ))}
          </ul>
        ) : null}
      </div>
    );
}

export default SearchBar
