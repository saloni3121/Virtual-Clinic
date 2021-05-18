import validator from 'validator';
// import {useState} from 'react';

export function validatePassword(value){
    let errorPassword
    if (validator.isStrongPassword(value, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
        errorPassword = 'Password is strong'
    } else {
        errorPassword = 'Is Not Strong Password'
    }

    return errorPassword
}

export function validateEmail(value){
    // const [emailError, setEmailError] = useState('')
    let error
    if (validator.isEmail(value)) {
        // setEmailError('Valid Email :)')
        error = 'Valid Email :)'
    } else {
        error = 'Enter valid Email!'
    }

    return error;
}
