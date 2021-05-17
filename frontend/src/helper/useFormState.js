import React,{useState} from 'React';

export default (initialVal) =>{
    const[type,setType] = useState(initialVal);

    const handleChange = (event) =>{
        setValue(...type , event.target.value);
    }


}