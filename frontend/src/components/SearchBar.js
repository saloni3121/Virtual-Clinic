import React,{useState, useEffect} from 'react';
// import { fade, makeStyles } from '@material-ui/core/styles';
import {useAutocomplete} from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
// import Toolbar from '@material-ui/core/Toolbar';
// import InputBase from '@material-ui/core/InputBase';
// import SearchIcon from '@material-ui/icons/Search';
// import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import axios from 'axios';
import '../App.css'


const useStyles = makeStyles((theme) => ({
    label: {
      display: 'block',
    },
    input: {
      width: 200,
    },
    imagehandle:{
      display: 'inline-block',
      width: '25px',
      height: '25px',
      borderRadius: '20px',
    },
    listbox: {
      width: 200,
      marginLeft: '665px',
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
        <div {...getRootProps()}>
          <label className={classes.label} {...getInputLabelProps()}>
           Search for doctors
          </label>
          <input className={classes.input} {...getInputProps()} />
        </div>
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
